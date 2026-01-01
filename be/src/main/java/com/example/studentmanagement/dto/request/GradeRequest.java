package com.example.studentmanagement.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GradeRequest {
    @NotNull(message = "Enrollment ID is required")
    private Long enrollmentId;

    @DecimalMin(value = "0.0")
    @DecimalMax(value = "10.0")
    private BigDecimal attendanceScore;

    @DecimalMin(value = "0.0")
    @DecimalMax(value = "10.0")
    private BigDecimal midtermScore;

    @DecimalMin(value = "0.0")
    @DecimalMax(value = "10.0")
    private BigDecimal finalScore;

    private String comment;
}
