package com.example.studentmanagement.config;

import com.example.studentmanagement.entity.Role;
import com.example.studentmanagement.entity.User;
import com.example.studentmanagement.entity.enums.RoleName;
import com.example.studentmanagement.repository.RoleRepository;
import com.example.studentmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        initRoles();
        initAdminUser();
    }

    private void initRoles() {
        if (roleRepository.count() == 0) {
            logger.info("Initializing roles...");

            Role adminRole = Role.builder()
                    .name(RoleName.ROLE_ADMIN)
                    .description("Administrator with full access")
                    .build();
            roleRepository.save(adminRole);

            Role teacherRole = Role.builder()
                    .name(RoleName.ROLE_TEACHER)
                    .description("Teacher with course management access")
                    .build();
            roleRepository.save(teacherRole);

            Role studentRole = Role.builder()
                    .name(RoleName.ROLE_STUDENT)
                    .description("Student with limited access")
                    .build();
            roleRepository.save(studentRole);

            logger.info("Roles initialized successfully!");
        }
    }

    private void initAdminUser() {
        if (!userRepository.existsByUsername("admin")) {
            logger.info("Creating default admin user...");

            Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Admin role not found"));

            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);

            User admin = User.builder()
                    .username("admin")
                    .email("admin@example.com")
                    .password(passwordEncoder.encode("admin123"))
                    .fullName("System Administrator")
                    .isActive(true)
                    .roles(roles)
                    .build();

            userRepository.save(admin);
            logger.info("Admin user created - username: admin, password: admin123");
        }
    }
}
