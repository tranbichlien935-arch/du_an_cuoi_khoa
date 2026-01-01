package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.Enrollment;
import com.example.studentmanagement.entity.enums.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudentId(Long studentId);

    List<Enrollment> findByClassEntityId(Long classId);

    Optional<Enrollment> findByStudentIdAndClassEntityId(Long studentId, Long classId);

    Boolean existsByStudentIdAndClassEntityId(Long studentId, Long classId);

    List<Enrollment> findByStatus(EnrollmentStatus status);

    @Query("SELECT e FROM Enrollment e WHERE e.student.id = :studentId AND e.status = :status")
    List<Enrollment> findByStudentIdAndStatus(@Param("studentId") Long studentId,
            @Param("status") EnrollmentStatus status);

    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.classEntity.id = :classId AND e.status IN ('PENDING', 'CONFIRMED')")
    Long countActiveEnrollmentsByClassId(@Param("classId") Long classId);
}
