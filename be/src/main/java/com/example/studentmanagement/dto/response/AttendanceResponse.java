package com.example.studentmanagement.dto.response;

import com.example.studentmanagement.entity.enums.AttendanceStatus;
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
public class AttendanceResponse {
    private Long id;
    private LocalDate sessionDate;
    private Integer sessionNumber;
    private AttendanceStatus status;
    private String note;
    private LocalDateTime markedAt;
    private Long studentId;
    private String studentCode;
    private String studentName;
    private Long classId;
    private String className;
    private String markedByName;
}
