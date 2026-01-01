package com.example.studentmanagement.controller;

import com.example.studentmanagement.dto.response.AdminDashboardResponse;
import com.example.studentmanagement.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AdminDashboardResponse> getAdminStats() {
        return ResponseEntity.ok(dashboardService.getAdminStats());
    }

    @GetMapping("/teacher/{teacherId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<com.example.studentmanagement.dto.response.TeacherDashboardResponse> getTeacherStats(
            @PathVariable Long teacherId) {
        return ResponseEntity.ok(dashboardService.getTeacherStats(teacherId));
    }
}
