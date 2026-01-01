// Mock courses, classes, users, and other data
export const mockCourses = [
    {
        id: 1,
        code: 'IELTS-CB',
        name: 'IELTS Cơ Bản',
        description: 'Khóa học IELTS dành cho người mới bắt đầu, mục tiêu đạt 5.0-6.0',
        price: 5000000,
        duration: 120,
        level: 'Cơ bản',
        status: 'Active',
        totalClasses: 3,
    },
    {
        id: 2,
        code: 'TOEIC-450',
        name: 'TOEIC 450+',
        description: 'Luyện thi TOEIC mục tiêu 450-550 điểm',
        price: 4500000,
        duration: 100,
        level: 'Cơ bản',
        status: 'Active',
        totalClasses: 2,
    },
    {
        id: 3,
        code: 'ENG-CONV',
        name: 'Tiếng Anh Giao Tiếp',
        description: 'Giao tiếp tiếng Anh trong cuộc sống hàng ngày',
        price: 3500000,
        duration: 80,
        level: 'Trung cấp',
        status: 'Active',
        totalClasses: 4,
    },
    {
        id: 4,
        code: 'IELTS-NC',
        name: 'IELTS Nâng Cao',
        description: 'Khóa học IELTS nâng cao, mục tiêu 7.0+',
        price: 7000000,
        duration: 150,
        level: 'Nâng cao',
        status: 'Active',
        totalClasses: 2,
    },
    {
        id: 5,
        code: 'BIZ-ENG',
        name: 'Business English',
        description: 'Tiếng Anh thương mại cho doanh nhân',
        price: 6000000,
        duration: 100,
        level: 'Nâng cao',
        status: 'Active',
        totalClasses: 1,
    },
];

export const mockClasses = [
    {
        id: 1,
        name: 'IELTS-CB01',
        courseId: 1,
        courseName: 'IELTS Cơ Bản',
        teacherId: 2,
        teacherName: 'Nguyễn Giáo Viên',
        maxStudents: 30,
        currentStudents: 28,
        schedule: 'Thứ 2, 4, 6 - 18:00-20:00',
        startDate: '2024-01-15',
        endDate: '2024-04-15',
        status: 'Open',
    },
    {
        id: 2,
        name: 'TOEIC-01',
        courseId: 2,
        courseName: 'TOEIC 450+',
        teacherId: 2,
        teacherName: 'Nguyễn Giáo Viên',
        maxStudents: 20,
        currentStudents: 19,
        schedule: 'Thứ 3, 5, 7 - 19:00-21:00',
        startDate: '2024-02-01',
        endDate: '2024-04-30',
        status: 'Open',
    },
    {
        id: 3,
        name: 'GD-TN-01',
        courseId: 3,
        courseName: 'Tiếng Anh Giao Tiếp',
        teacherId: 2,
        teacherName: 'Nguyễn Giáo Viên',
        maxStudents: 25,
        currentStudents: 15,
        schedule: 'Thứ 2, 4 - 17:30-19:30',
        startDate: '2024-01-20',
        endDate: '2024-03-20',
        status: 'Open',
    },
    {
        id: 4,
        name: 'IELTS-NC01',
        courseId: 4,
        courseName: 'IELTS Nâng Cao',
        teacherId: 2,
        teacherName: 'Nguyễn Giáo Viên',
        maxStudents: 25,
        currentStudents: 12,
        schedule: 'Thứ 3, 5 - 18:30-20:30',
        startDate: '2024-02-15',
        endDate: '2024-06-15',
        status: 'Open',
    },
];

export const mockUsers = [
    {
        id: 1,
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@wisekey.com',
        phone: '0123456789',
        role: 'ROLE_ADMIN',
        status: 'Active',
    },
    {
        id: 2,
        username: 'teacher',
        firstName: 'Nguyễn',
        lastName: 'Giáo Viên',
        email: 'teacher@wisekey.com',
        phone: '0987654321',
        role: 'ROLE_TEACHER',
        status: 'Active',
    },
    {
        id: 3,
        username: 'student',
        firstName: 'Trần',
        lastName: 'Học Viên',
        email: 'student@wisekey.com',
        phone: '0123456780',
        role: 'ROLE_STUDENT',
        status: 'Active',
    },
    {
        id: 4,
        username: 'teacher2',
        firstName: 'Lê',
        lastName: 'Văn Giáo Viên',
        email: 'teacher2@wisekey.com',
        phone: '0912345678',
        role: 'ROLE_TEACHER',
        status: 'Active',
    },
    {
        id: 5,
        username: 'student2',
        firstName: 'Phạm',
        lastName: 'Thị Học Sinh',
        email: 'student2@wisekey.com',
        phone: '0909123456',
        role: 'ROLE_STUDENT',
        status: 'Active',
    },
];

// Mock service implementations
export const mockDataService = {
    // Courses
    getAllCourses: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return [...mockCourses];
    },

    getCourseById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCourses.find(c => c.id === parseInt(id));
    },

    createCourse: async (courseData) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const newCourse = {
            id: mockCourses.length + 1,
            ...courseData,
            totalClasses: 0,
        };
        mockCourses.push(newCourse);
        return newCourse;
    },

    updateCourse: async (id, courseData) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = mockCourses.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            mockCourses[index] = { ...mockCourses[index], ...courseData };
            return mockCourses[index];
        }
        throw new Error('Course not found');
    },

    deleteCourse: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = mockCourses.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            mockCourses.splice(index, 1);
            return { message: 'Deleted successfully' };
        }
        throw new Error('Course not found');
    },

    // Classes
    getAllClasses: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return [...mockClasses];
    },

    getClassById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockClasses.find(c => c.id === parseInt(id));
    },

    getClassesByCourse: async (courseId) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockClasses.filter(c => c.courseId === parseInt(courseId));
    },

    getClassesByTeacher: async (teacherId) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockClasses.filter(c => c.teacherId === parseInt(teacherId));
    },

    createClass: async (classData) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const course = mockCourses.find(c => c.id === parseInt(classData.courseId));
        const teacher = mockUsers.find(u => u.id === parseInt(classData.teacherId));
        const newClass = {
            id: mockClasses.length + 1,
            ...classData,
            courseName: course?.name || '',
            teacherName: teacher ? `${teacher.firstName} ${teacher.lastName}` : '',
            currentStudents: 0,
        };
        mockClasses.push(newClass);
        return newClass;
    },

    updateClass: async (id, classData) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = mockClasses.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            mockClasses[index] = { ...mockClasses[index], ...classData };
            return mockClasses[index];
        }
        throw new Error('Class not found');
    },

    deleteClass: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = mockClasses.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            mockClasses.splice(index, 1);
            return { message: 'Deleted successfully' };
        }
        throw new Error('Class not found');
    },

    getStudentsInClass: async (classId) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        // Return mock students
        return mockUsers.filter(u => u.role === 'ROLE_STUDENT').slice(0, 3);
    },

    // Users
    getAllUsers: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return [...mockUsers];
    },

    getUserById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockUsers.find(u => u.id === parseInt(id));
    },

    getUsersByRole: async (role) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockUsers.filter(u => u.role === role);
    },

    createUser: async (userData) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const newUser = {
            id: mockUsers.length + 1,
            ...userData,
        };
        mockUsers.push(newUser);
        return newUser;
    },

    updateUser: async (id, userData) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = mockUsers.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            mockUsers[index] = { ...mockUsers[index], ...userData };
            return mockUsers[index];
        }
        throw new Error('User not found');
    },

    deleteUser: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = mockUsers.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            mockUsers.splice(index, 1);
            return { message: 'Deleted successfully' };
        }
        throw new Error('User not found');
    },

    activateUser: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const user = mockUsers.find(u => u.id === parseInt(id));
        if (user) {
            user.status = 'Active';
            return user;
        }
        throw new Error('User not found');
    },

    deactivateUser: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const user = mockUsers.find(u => u.id === parseInt(id));
        if (user) {
            user.status = 'Inactive';
            return user;
        }
        throw new Error('User not found');
    },

    resetPassword: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { message: 'Password reset successfully', newPassword: 'newpass123' };
    },

    updateProfile: async (id, profileData) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = mockUsers.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            mockUsers[index] = { ...mockUsers[index], ...profileData };
            return mockUsers[index];
        }
        throw new Error('User not found');
    },
};
