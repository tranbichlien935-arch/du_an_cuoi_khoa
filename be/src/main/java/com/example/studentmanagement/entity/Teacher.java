package com.example.studentmanagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "teachers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Teacher extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonIgnoreProperties({ "teacher", "student", "password", "hibernateLazyInitializer", "handler" })
    private User user;

    @NotBlank
    @Size(max = 20)
    @Column(name = "employee_code", length = 20, nullable = false, unique = true)
    private String employeeCode;

    @Size(max = 100)
    @Column(name = "department", length = 100)
    private String department;

    @Size(max = 200)
    @Column(name = "specialization", length = 200)
    private String specialization;

    @Column(name = "hire_date")
    private LocalDate hireDate;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({ "teacher", "hibernateLazyInitializer", "handler" })
    @Builder.Default
    private List<ClassEntity> classes = new ArrayList<>();
}
