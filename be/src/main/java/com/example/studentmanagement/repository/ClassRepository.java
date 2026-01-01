package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.ClassEntity;
import com.example.studentmanagement.entity.enums.ClassStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassRepository extends JpaRepository<ClassEntity, Long> {
    Optional<ClassEntity> findByCode(String code);

    Boolean existsByCode(String code);

    List<ClassEntity> findByCourseId(Long courseId);

    List<ClassEntity> findByTeacherId(Long teacherId);

    List<ClassEntity> findByStatus(ClassStatus status);

    List<ClassEntity> findByIsRegistrationOpenTrue();

    @Query("SELECT c FROM ClassEntity c WHERE c.currentStudents < c.maxStudents AND c.isRegistrationOpen = true")
    List<ClassEntity> findAvailableClasses();

    @Query("SELECT c FROM ClassEntity c WHERE c.name LIKE %:name%")
    List<ClassEntity> findByNameContaining(@Param("name") String name);
}
