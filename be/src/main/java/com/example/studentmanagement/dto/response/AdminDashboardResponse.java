package com.example.studentmanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardResponse {
    private Integer totalStudents;
    private Integer newStudentsThisMonth;
    private Integer totalTeachers;
    private Integer totalCourses;
    private Integer activeCourses;
    private Integer totalClasses;
    private Integer activeClasses;
    private List<EnrollmentSummary> recentEnrollments;
    private List<ClassCapacitySummary> classesNearCapacity;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EnrollmentSummary {
        private Long id;
        private String studentName;
        private String courseName;
        private String date;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ClassCapacitySummary {
        private Long id;
        private String className;
        private String courseName;
        private Integer currentStudents;
        private Integer maxStudents;
    }
}
