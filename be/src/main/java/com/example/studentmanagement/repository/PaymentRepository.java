package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.Payment;
import com.example.studentmanagement.entity.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByEnrollmentId(Long enrollmentId);

    List<Payment> findByStatus(PaymentStatus status);

    @Query("SELECT p FROM Payment p WHERE p.enrollment.student.id = :studentId")
    List<Payment> findByStudentId(@Param("studentId") Long studentId);

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.enrollment.id = :enrollmentId AND p.status = 'COMPLETED'")
    BigDecimal sumCompletedPaymentsByEnrollmentId(@Param("enrollmentId") Long enrollmentId);

    @Query("SELECT p FROM Payment p WHERE p.transactionId = :transactionId")
    Payment findByTransactionId(@Param("transactionId") String transactionId);
}
