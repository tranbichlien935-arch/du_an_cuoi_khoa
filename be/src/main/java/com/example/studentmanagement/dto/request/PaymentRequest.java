package com.example.studentmanagement.dto.request;

import com.example.studentmanagement.entity.enums.PaymentMethod;
import com.example.studentmanagement.entity.enums.PaymentStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {
    @NotNull(message = "Enrollment ID is required")
    private Long enrollmentId;

    @NotNull(message = "Amount is required")
    @Positive
    private BigDecimal amount;

    private PaymentMethod paymentMethod;
    private PaymentStatus status;
    @Size(max = 100)
    private String transactionId;
    @Size(max = 500)
    private String note;
}
