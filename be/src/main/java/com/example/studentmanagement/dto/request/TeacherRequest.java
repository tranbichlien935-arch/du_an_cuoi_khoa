package com.example.studentmanagement.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherRequest {
    @Size(max = 20)
    private String employeeCode;
    @Size(max = 100)
    private String department;
    @Size(max = 200)
    private String specialization;
    private LocalDate hireDate;
    private String username;
    private String email;
    private String password;
    private String fullName;
    private String phone;
}
