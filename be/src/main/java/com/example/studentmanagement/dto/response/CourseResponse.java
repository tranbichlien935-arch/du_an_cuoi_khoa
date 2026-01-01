package com.example.studentmanagement.dto.response;

import com.example.studentmanagement.entity.enums.CourseLevel;
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
public class CourseResponse {
    private Long id;
    private String code;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer duration;
    private CourseLevel level;
    private String thumbnailUrl;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer totalClasses;
}
