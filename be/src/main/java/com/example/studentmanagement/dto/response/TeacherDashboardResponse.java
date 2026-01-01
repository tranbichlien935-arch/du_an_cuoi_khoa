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
public class TeacherDashboardResponse {
    private Integer totalClasses;
    private Integer activeClasses;
    private Integer totalStudents;
    private Integer upcomingClasses;
    private List<ClassSummary> myClasses;
    private List<StudentSummary> recentStudents;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ClassSummary {
        private Long id;
        private String className;
        private String courseName;
        private Integer enrolledStudents;
        private Integer maxStudents;
        private String schedule;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class StudentSummary {
        private Long id;
        private String studentName;
        private String className;
        private String enrollmentDate;
    }
}
