package com.example.studentmanagement.controller;

import com.example.studentmanagement.dto.request.GradeRequest;
import com.example.studentmanagement.dto.response.GradeResponse;
import com.example.studentmanagement.service.GradeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/grades")
@RequiredArgsConstructor
public class GradeController {

    private final GradeService gradeService;

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    public ResponseEntity<List<GradeResponse>> getGradesByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(gradeService.getGradesByStudentId(studentId));
    }

    @GetMapping("/class/{classId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<List<GradeResponse>> getGradesByClassId(@PathVariable Long classId) {
        return ResponseEntity.ok(gradeService.getGradesByClassId(classId));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<GradeResponse> createOrUpdateGrade(@Valid @RequestBody GradeRequest request) {
        return ResponseEntity.ok(gradeService.createOrUpdateGrade(request));
    }
}
