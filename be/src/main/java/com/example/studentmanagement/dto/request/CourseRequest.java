package com.example.studentmanagement.dto.request;

import com.example.studentmanagement.entity.enums.CourseLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseRequest {
    @NotBlank(message = "Course code is required")
    @Size(max = 20)
    private String code;

    @NotBlank(message = "Course name is required")
    @Size(max = 200)
    private String name;

    private String description;
    private BigDecimal price;
    private Integer duration;
    private CourseLevel level;
    @Size(max = 500)
    private String thumbnailUrl;
    private Boolean isActive;
}
