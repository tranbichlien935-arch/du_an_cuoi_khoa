package com.example.studentmanagement.dto.response;

import com.example.studentmanagement.entity.enums.PaymentMethod;
import com.example.studentmanagement.entity.enums.PaymentStatus;
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
public class PaymentResponse {
    private Long id;
    private BigDecimal amount;
    private LocalDateTime paymentDate;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;
    private String transactionId;
    private String note;
    private Long enrollmentId;
    private Long studentId;
    private String studentName;
    private String className;
    private String createdByName;
}
