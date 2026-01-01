# Student Management System - Backend API

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- MySQL 8.0+

### Database Setup
```sql
CREATE DATABASE wk;
```

### Run Application
```bash
cd be
mvn spring-boot:run
```

### Default Admin Account
- **Username**: admin
- **Password**: admin123

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Register |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout |

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Create student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |

### Teachers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/teachers` | Get all teachers |
| GET | `/api/teachers/{id}` | Get teacher by ID |
| POST | `/api/teachers` | Create teacher |
| PUT | `/api/teachers/{id}` | Update teacher |
| DELETE | `/api/teachers/{id}` | Delete teacher |

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/active` | Get active courses |
| POST | `/api/courses` | Create course |
| PUT | `/api/courses/{id}` | Update course |
| DELETE | `/api/courses/{id}` | Delete course |

### Classes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/classes` | Get all classes |
| GET | `/api/classes/available` | Get available classes |
| POST | `/api/classes` | Create class |
| PUT | `/api/classes/{id}` | Update class |
| DELETE | `/api/classes/{id}` | Delete class |

### Enrollments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enrollments` | Get all enrollments |
| POST | `/api/enrollments` | Create enrollment |
| PATCH | `/api/enrollments/{id}/status` | Update status |

### Attendance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/attendance/class/{classId}` | Get by class |
| POST | `/api/attendance` | Mark attendance |

### Grades
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/grades/student/{id}` | Get by student |
| POST | `/api/grades` | Create/Update grade |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payments/student/{id}` | Get by student |
| POST | `/api/payments` | Create payment |

## 🔐 Authorization

| Role | Access |
|------|--------|
| ADMIN | Full access |
| TEACHER | Course, Class, Student management |
| STUDENT | View courses, enrollments, grades |

## 📁 Project Structure

```
be/
├── src/main/java/com/example/studentmanagement/
│   ├── config/          # Security, CORS, Data initialization
│   ├── controller/      # REST Controllers
│   ├── dto/             # Request/Response DTOs
│   ├── entity/          # JPA Entities
│   ├── exception/       # Custom exceptions
│   ├── repository/      # JPA Repositories
│   ├── security/        # JWT, UserDetails
│   └── service/         # Business logic
└── src/main/resources/
    └── application.properties
```
