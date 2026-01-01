package com.example.studentmanagement.entity;

import com.example.studentmanagement.entity.enums.ClassStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "classes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    @Column(name = "code", length = 20, nullable = false, unique = true)
    private String code;

    @NotBlank
    @Size(max = 200)
    @Column(name = "name", length = 200, nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    @JsonIgnoreProperties({ "classes", "hibernateLazyInitializer", "handler" })
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    @JsonIgnoreProperties({ "classes", "user", "hibernateLazyInitializer", "handler" })
    private Teacher teacher;

    @Column(name = "max_students")
    @Builder.Default
    private Integer maxStudents = 30;

    @Column(name = "current_students")
    @Builder.Default
    private Integer currentStudents = 0;

    @Size(max = 50)
    @Column(name = "room", length = 50)
    private String room;

    @Size(max = 200)
    @Column(name = "schedule", length = 200)
    private String schedule;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    @Builder.Default
    private ClassStatus status = ClassStatus.OPEN;

    @Column(name = "is_registration_open", nullable = false)
    @Builder.Default
    private Boolean isRegistrationOpen = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "classEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({ "classEntity", "hibernateLazyInitializer", "handler" })
    @Builder.Default
    private List<Enrollment> enrollments = new ArrayList<>();

    @OneToMany(mappedBy = "classEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({ "classEntity", "hibernateLazyInitializer", "handler" })
    @Builder.Default
    private List<Attendance> attendances = new ArrayList<>();
}
