package com.example.studentmanagement.dto.request;

import com.example.studentmanagement.entity.enums.AttendanceStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRequest {
    @NotNull(message = "Class ID is required")
    private Long classId;

    @NotNull(message = "Student ID is required")
    private Long studentId;

    @NotNull(message = "Session date is required")
    private LocalDate sessionDate;

    private Integer sessionNumber;

    @NotNull(message = "Status is required")
    private AttendanceStatus status;

    @Size(max = 255)
    private String note;
}
