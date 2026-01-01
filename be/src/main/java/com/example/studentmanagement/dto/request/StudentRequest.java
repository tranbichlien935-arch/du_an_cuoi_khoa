package com.example.studentmanagement.dto.request;

import com.example.studentmanagement.entity.enums.Gender;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentRequest {
    @Size(max = 20)
    private String studentCode;
    private LocalDate dateOfBirth;
    private Gender gender;
    @Size(max = 500)
    private String address;
    private LocalDate enrollmentDate;
    private String username;
    private String email;
    private String password;
    private String fullName;
    private String phone;
}
