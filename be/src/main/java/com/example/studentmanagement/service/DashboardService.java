package com.example.studentmanagement.service;

import com.example.studentmanagement.dto.response.AdminDashboardResponse;
import com.example.studentmanagement.entity.ClassEntity;
import com.example.studentmanagement.entity.Enrollment;
import com.example.studentmanagement.entity.enums.ClassStatus;
import com.example.studentmanagement.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

        private final StudentRepository studentRepository;
        private final TeacherRepository teacherRepository;
        private final CourseRepository courseRepository;
        private final ClassRepository classRepository;
        private final EnrollmentRepository enrollmentRepository;

        @Transactional(readOnly = true)
        public AdminDashboardResponse getAdminStats() {
                // Get total counts
                long totalStudents = studentRepository.count();
                long totalTeachers = teacherRepository.count();
                long totalCourses = courseRepository.count();
                long totalClasses = classRepository.count();

                // Get active counts (courses with isActive = true, classes with status = Open)
                long activeCourses = courseRepository.findAll().stream()
                                .filter(course -> course.getIsActive() != null && course.getIsActive())
                                .count();
                long activeClasses = classRepository.findByStatus(ClassStatus.OPEN).size();

                // Get new students this month
                LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0)
                                .withSecond(0);
                long newStudentsThisMonth = studentRepository.findAll().stream()
                                .filter(student -> student.getCreatedAt() != null
                                                && student.getCreatedAt().isAfter(startOfMonth))
                                .count();

                // Get recent enrollments (last 10) - sorted by enrollmentDate
                List<Enrollment> allEnrollments = enrollmentRepository.findAll();
                List<AdminDashboardResponse.EnrollmentSummary> enrollmentSummaries = allEnrollments.stream()
                                .sorted(Comparator.comparing(Enrollment::getEnrollmentDate,
                                                Comparator.nullsLast(Comparator.reverseOrder())))
                                .limit(10)
                                .map(enrollment -> AdminDashboardResponse.EnrollmentSummary.builder()
                                                .id(enrollment.getId())
                                                .studentName(enrollment.getStudent() != null
                                                                && enrollment.getStudent().getUser() != null
                                                                                ? enrollment.getStudent().getUser()
                                                                                                .getFullName()
                                                                                : "Unknown")
                                                .courseName(enrollment.getClassEntity() != null
                                                                && enrollment.getClassEntity().getCourse() != null
                                                                                ? enrollment.getClassEntity()
                                                                                                .getCourse().getName()
                                                                                : "Unknown")
                                                .date(formatTimeAgo(enrollment.getEnrollmentDate()))
                                                .build())
                                .collect(Collectors.toList());

                // Get classes near capacity (>= 80% full)
                List<ClassEntity> allClasses = classRepository.findAll();
                List<AdminDashboardResponse.ClassCapacitySummary> classesNearCapacity = allClasses.stream()
                                .filter(classEntity -> {
                                        int currentStudents = classEntity.getEnrollments() != null
                                                        ? classEntity.getEnrollments().size()
                                                        : 0;
                                        int maxStudents = classEntity.getMaxStudents();
                                        return maxStudents > 0 && ((double) currentStudents / maxStudents) >= 0.8;
                                })
                                .map(classEntity -> {
                                        int currentStudents = classEntity.getEnrollments() != null
                                                        ? classEntity.getEnrollments().size()
                                                        : 0;
                                        return AdminDashboardResponse.ClassCapacitySummary.builder()
                                                        .id(classEntity.getId())
                                                        .className(classEntity.getName())
                                                        .courseName(classEntity.getCourse() != null
                                                                        ? classEntity.getCourse().getName()
                                                                        : "Unknown")
                                                        .currentStudents(currentStudents)
                                                        .maxStudents(classEntity.getMaxStudents())
                                                        .build();
                                })
                                .collect(Collectors.toList());

                return AdminDashboardResponse.builder()
                                .totalStudents((int) totalStudents)
                                .newStudentsThisMonth((int) newStudentsThisMonth)
                                .totalTeachers((int) totalTeachers)
                                .totalCourses((int) totalCourses)
                                .activeCourses((int) activeCourses)
                                .totalClasses((int) totalClasses)
                                .activeClasses((int) activeClasses)
                                .recentEnrollments(enrollmentSummaries)
                                .classesNearCapacity(classesNearCapacity)
                                .build();
        }

        @Transactional(readOnly = true)
        public com.example.studentmanagement.dto.response.TeacherDashboardResponse getTeacherStats(Long teacherId) {
                List<ClassEntity> teacherClasses = classRepository.findAll().stream()
                                .filter(c -> c.getTeacher() != null && c.getTeacher().getId().equals(teacherId))
                                .collect(Collectors.toList());

                int totalClasses = teacherClasses.size();
                int activeClasses = (int) teacherClasses.stream()
                                .filter(c -> c.getStatus() == com.example.studentmanagement.entity.enums.ClassStatus.OPEN)
                                .count();
                int totalStudents = teacherClasses.stream()
                                .mapToInt(c -> c.getEnrollments() != null ? c.getEnrollments().size() : 0)
                                .sum();
                int upcomingClasses = activeClasses;

                List<com.example.studentmanagement.dto.response.TeacherDashboardResponse.ClassSummary> myClasses = teacherClasses
                                .stream()
                                .limit(10)
                                .map(classEntity -> com.example.studentmanagement.dto.response.TeacherDashboardResponse.ClassSummary
                                                .builder()
                                                .id(classEntity.getId())
                                                .className(classEntity.getName())
                                                .courseName(classEntity.getCourse() != null
                                                                ? classEntity.getCourse().getName()
                                                                : "Unknown")
                                                .enrolledStudents(classEntity.getEnrollments() != null
                                                                ? classEntity.getEnrollments().size()
                                                                : 0)
                                                .maxStudents(classEntity.getMaxStudents())
                                                .schedule(classEntity.getSchedule() != null ? classEntity.getSchedule()
                                                                : "Chưa có lịch")
                                                .build())
                                .collect(Collectors.toList());

                List<com.example.studentmanagement.dto.response.TeacherDashboardResponse.StudentSummary> recentStudents = teacherClasses
                                .stream()
                                .flatMap(c -> c.getEnrollments() != null ? c.getEnrollments().stream()
                                                : java.util.stream.Stream.empty())
                                .sorted(Comparator.comparing(Enrollment::getEnrollmentDate,
                                                Comparator.nullsLast(Comparator.reverseOrder())))
                                .limit(10)
                                .map(enrollment -> com.example.studentmanagement.dto.response.TeacherDashboardResponse.StudentSummary
                                                .builder()
                                                .id(enrollment.getStudent() != null ? enrollment.getStudent().getId()
                                                                : null)
                                                .studentName(enrollment.getStudent() != null
                                                                && enrollment.getStudent().getUser() != null
                                                                                ? enrollment.getStudent().getUser()
                                                                                                .getFullName()
                                                                                : "Unknown")
                                                .className(enrollment.getClassEntity() != null
                                                                ? enrollment.getClassEntity().getName()
                                                                : "Unknown")
                                                .enrollmentDate(formatTimeAgo(enrollment.getEnrollmentDate()))
                                                .build())
                                .collect(Collectors.toList());

                return com.example.studentmanagement.dto.response.TeacherDashboardResponse.builder()
                                .totalClasses(totalClasses)
                                .activeClasses(activeClasses)
                                .totalStudents(totalStudents)
                                .upcomingClasses(upcomingClasses)
                                .myClasses(myClasses)
                                .recentStudents(recentStudents)
                                .build();
        }

        private String formatTimeAgo(LocalDateTime dateTime) {
                if (dateTime == null) {
                        return "Unknown";
                }

                LocalDateTime now = LocalDateTime.now();
                long minutes = ChronoUnit.MINUTES.between(dateTime, now);
                long hours = ChronoUnit.HOURS.between(dateTime, now);
                long days = ChronoUnit.DAYS.between(dateTime, now);

                if (minutes < 60) {
                        return minutes + " phút trước";
                } else if (hours < 24) {
                        return hours + " giờ trước";
                } else if (days == 1) {
                        return "1 ngày trước";
                } else {
                        return days + " ngày trước";
                }
        }
}
