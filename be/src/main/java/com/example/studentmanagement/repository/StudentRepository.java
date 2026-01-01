package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByStudentCode(String studentCode);

    Optional<Student> findByUserId(Long userId);

    Boolean existsByStudentCode(String studentCode);

    @Query("SELECT s FROM Student s WHERE s.user.fullName LIKE %:name%")
    List<Student> findByNameContaining(@Param("name") String name);

    @Query("SELECT s FROM Student s WHERE s.user.email = :email")
    Optional<Student> findByEmail(@Param("email") String email);

    @Query("SELECT s FROM Student s JOIN s.enrollments e WHERE e.classEntity.id = :classId")
    List<Student> findByClassId(@Param("classId") Long classId);
}
