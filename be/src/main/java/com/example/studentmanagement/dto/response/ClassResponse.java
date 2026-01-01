package com.example.studentmanagement.dto.response;

import com.example.studentmanagement.entity.enums.ClassStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassResponse {
    private Long id;
    private String code;
    private String name;
    private Integer maxStudents;
    private Integer currentStudents;
    private String room;
    private String schedule;
    private LocalDate startDate;
    private LocalDate endDate;
    private ClassStatus status;
    private Boolean isRegistrationOpen;
    private LocalDateTime createdAt;
    private Long courseId;
    private String courseName;
    private String courseCode;
    private Long teacherId;
    private String teacherName;
    private String teacherEmployeeCode;
}
