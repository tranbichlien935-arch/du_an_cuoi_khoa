package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
    Optional<Grade> findByEnrollmentId(Long enrollmentId);

    @Query("SELECT g FROM Grade g WHERE g.enrollment.student.id = :studentId")
    List<Grade> findByStudentId(@Param("studentId") Long studentId);

    @Query("SELECT g FROM Grade g WHERE g.enrollment.classEntity.id = :classId")
    List<Grade> findByClassId(@Param("classId") Long classId);

    @Query("SELECT AVG(g.totalScore) FROM Grade g WHERE g.enrollment.classEntity.id = :classId")
    Double findAverageScoreByClassId(@Param("classId") Long classId);

    @Query("SELECT g FROM Grade g WHERE g.gradedBy.id = :teacherId")
    List<Grade> findByGradedById(@Param("teacherId") Long teacherId);
}
