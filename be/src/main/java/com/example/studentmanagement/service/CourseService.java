package com.example.studentmanagement.service;

import com.example.studentmanagement.dto.request.CourseRequest;
import com.example.studentmanagement.dto.response.CourseResponse;
import com.example.studentmanagement.entity.Course;
import com.example.studentmanagement.entity.enums.CourseLevel;
import com.example.studentmanagement.exception.DuplicateResourceException;
import com.example.studentmanagement.exception.ResourceNotFoundException;
import com.example.studentmanagement.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<CourseResponse> getActiveCourses() {
        return courseRepository.findByIsActiveTrue().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id));
        return mapToResponse(course);
    }

    public CourseResponse getCourseByCode(String code) {
        Course course = courseRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "code", code));
        return mapToResponse(course);
    }

    @Transactional
    public CourseResponse createCourse(CourseRequest request) {
        if (courseRepository.existsByCode(request.getCode())) {
            throw new DuplicateResourceException("Course", "code", request.getCode());
        }
        Course course = Course.builder()
                .code(request.getCode())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .duration(request.getDuration())
                .level(request.getLevel())
                .thumbnailUrl(request.getThumbnailUrl())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .build();
        course = courseRepository.save(course);
        return mapToResponse(course);
    }

    @Transactional
    public CourseResponse updateCourse(Long id, CourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id));
        if (request.getName() != null)
            course.setName(request.getName());
        if (request.getDescription() != null)
            course.setDescription(request.getDescription());
        if (request.getPrice() != null)
            course.setPrice(request.getPrice());
        if (request.getDuration() != null)
            course.setDuration(request.getDuration());
        if (request.getLevel() != null)
            course.setLevel(request.getLevel());
        if (request.getThumbnailUrl() != null)
            course.setThumbnailUrl(request.getThumbnailUrl());
        if (request.getIsActive() != null)
            course.setIsActive(request.getIsActive());
        course = courseRepository.save(course);
        return mapToResponse(course);
    }

    @Transactional
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id));
        courseRepository.delete(course);
    }

    public List<CourseResponse> getCoursesByLevel(CourseLevel level) {
        return courseRepository.findByLevel(level).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<CourseResponse> searchCourses(String name) {
        return courseRepository.findByNameContainingIgnoreCase(name).stream().map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private CourseResponse mapToResponse(Course course) {
        return CourseResponse.builder()
                .id(course.getId())
                .code(course.getCode())
                .name(course.getName())
                .description(course.getDescription())
                .price(course.getPrice())
                .duration(course.getDuration())
                .level(course.getLevel())
                .thumbnailUrl(course.getThumbnailUrl())
                .isActive(course.getIsActive())
                .createdAt(course.getCreatedAt())
                .updatedAt(course.getUpdatedAt())
                .totalClasses(0) // TODO: Calculate this separately if needed
                .build();
    }
}
