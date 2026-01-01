package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.Course;
import com.example.studentmanagement.entity.enums.CourseLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findByCode(String code);

    Boolean existsByCode(String code);

    List<Course> findByIsActiveTrue();

    List<Course> findByLevel(CourseLevel level);

    List<Course> findByNameContainingIgnoreCase(String name);
}
