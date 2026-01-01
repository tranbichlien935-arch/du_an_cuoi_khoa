package com.example.studentmanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GradeResponse {
    private Long id;
    private BigDecimal attendanceScore;
    private BigDecimal midtermScore;
    private BigDecimal finalScore;
    private BigDecimal totalScore;
    private String comment;
    private LocalDateTime gradedAt;
    private LocalDateTime updatedAt;
    private Long enrollmentId;
    private Long studentId;
    private String studentCode;
    private String studentName;
    private Long classId;
    private String className;
    private String gradedByName;
}
