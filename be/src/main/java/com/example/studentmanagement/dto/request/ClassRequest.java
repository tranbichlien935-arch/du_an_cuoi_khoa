package com.example.studentmanagement.dto.request;

import com.example.studentmanagement.entity.enums.ClassStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassRequest {
    @NotBlank(message = "Class code is required")
    @Size(max = 20)
    private String code;

    @NotBlank(message = "Class name is required")
    @Size(max = 200)
    private String name;

    @NotNull(message = "Course ID is required")
    private Long courseId;

    private Long teacherId;
    private Integer maxStudents;
    @Size(max = 50)
    private String room;
    @Size(max = 200)
    private String schedule;
    private LocalDate startDate;
    private LocalDate endDate;
    private ClassStatus status;
    private Boolean isRegistrationOpen;
}
