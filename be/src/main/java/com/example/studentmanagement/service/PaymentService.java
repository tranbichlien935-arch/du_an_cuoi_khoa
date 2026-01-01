package com.example.studentmanagement.service;

import com.example.studentmanagement.dto.request.PaymentRequest;
import com.example.studentmanagement.dto.response.PaymentResponse;
import com.example.studentmanagement.entity.Enrollment;
import com.example.studentmanagement.entity.Payment;
import com.example.studentmanagement.entity.User;
import com.example.studentmanagement.entity.enums.PaymentStatus;
import com.example.studentmanagement.exception.ResourceNotFoundException;
import com.example.studentmanagement.repository.EnrollmentRepository;
import com.example.studentmanagement.repository.PaymentRepository;
import com.example.studentmanagement.repository.UserRepository;
import com.example.studentmanagement.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;

    public List<PaymentResponse> getPaymentsByEnrollmentId(Long enrollmentId) {
        return paymentRepository.findByEnrollmentId(enrollmentId).stream().map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<PaymentResponse> getPaymentsByStudentId(Long studentId) {
        return paymentRepository.findByStudentId(studentId).stream().map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public PaymentResponse createPayment(PaymentRequest request) {
        Enrollment enrollment = enrollmentRepository.findById(request.getEnrollmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment", "id", request.getEnrollmentId()));

        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User createdBy = userRepository.findById(userDetails.getId()).orElse(null);

        Payment payment = Payment.builder()
                .enrollment(enrollment)
                .amount(request.getAmount())
                .paymentDate(LocalDateTime.now())
                .paymentMethod(request.getPaymentMethod())
                .status(request.getStatus() != null ? request.getStatus() : PaymentStatus.PENDING)
                .transactionId(request.getTransactionId())
                .note(request.getNote())
                .createdBy(createdBy)
                .build();
        payment = paymentRepository.save(payment);
        return mapToResponse(payment);
    }

    @Transactional
    public PaymentResponse updatePaymentStatus(Long id, PaymentStatus status) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment", "id", id));
        payment.setStatus(status);
        payment = paymentRepository.save(payment);
        return mapToResponse(payment);
    }

    private PaymentResponse mapToResponse(Payment payment) {
        Enrollment e = payment.getEnrollment();
        return PaymentResponse.builder()
                .id(payment.getId())
                .amount(payment.getAmount())
                .paymentDate(payment.getPaymentDate())
                .paymentMethod(payment.getPaymentMethod())
                .status(payment.getStatus())
                .transactionId(payment.getTransactionId())
                .note(payment.getNote())
                .enrollmentId(e.getId())
                .studentId(e.getStudent() != null ? e.getStudent().getId() : null)
                .studentName(e.getStudent() != null ? e.getStudent().getUser().getFullName() : null)
                .className(e.getClassEntity() != null ? e.getClassEntity().getName() : null)
                .createdByName(payment.getCreatedBy() != null ? payment.getCreatedBy().getFullName() : null)
                .build();
    }
}
