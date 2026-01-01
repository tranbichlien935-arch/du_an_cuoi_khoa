// Mock dashboard data for testing without backend
export const mockDashboardData = {
    admin: {
        totalStudents: 156,
        newStudentsThisMonth: 12,
        totalTeachers: 24,
        totalCourses: 18,
        activeCourses: 15,
        totalClasses: 32,
        activeClasses: 28,
        recentEnrollments: [
            {
                id: 1,
                studentName: 'Nguyễn Văn A',
                courseName: 'Tiếng Anh Giao Tiếp',
                date: '2 giờ trước',
            },
            {
                id: 2,
                studentName: 'Trần Thị B',
                courseName: 'IELTS Cơ Bản',
                date: '5 giờ trước',
            },
            {
                id: 3,
                studentName: 'Lê Văn C',
                courseName: 'TOEIC 450+',
                date: '1 ngày trước',
            },
            {
                id: 4,
                studentName: 'Phạm Thị D',
                courseName: 'Tiếng Anh Thiếu Nhi',
                date: '1 ngày trước',
            },
            {
                id: 5,
                studentName: 'Hoàng Văn E',
                courseName: 'Business English',
                date: '2 ngày trước',
            },
        ],
        classesNearCapacity: [
            {
                id: 1,
                className: 'IELTS-CB01',
                courseName: 'IELTS Cơ Bản',
                currentStudents: 28,
                maxStudents: 30,
            },
            {
                id: 2,
                className: 'TOEIC-01',
                courseName: 'TOEIC 450+',
                currentStudents: 19,
                maxStudents: 20,
            },
            {
                id: 3,
                className: 'GD-TN-02',
                courseName: 'Giao Tiếp Tiếng Anh',
                currentStudents: 23,
                maxStudents: 25,
            },
        ],
    },
    teacher: {
        totalClasses: 4,
        totalStudents: 87,
        sessionsThisWeek: 8,
        todaySchedule: [
            {
                className: 'IELTS-CB01',
                courseName: 'IELTS Cơ Bản',
                time: '09:00 - 11:00',
                room: 'Phòng A301',
            },
            {
                className: 'TOEIC-01',
                courseName: 'TOEIC 450+',
                time: '14:00 - 16:00',
                room: 'Phòng B102',
            },
        ],
    },
    student: {
        enrolledCourses: 3,
        completedCourses: 1,
        upcomingSessions: 5,
        averageGrade: 8.2,
    },
};

// Mock dashboard service
export const mockDashboardService = {
    getAdminStats: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockDashboardData.admin;
    },

    getTeacherStats: async (teacherId) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockDashboardData.teacher;
    },

    getStudentStats: async (studentId) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockDashboardData.student;
    },

    getRecentEnrollments: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockDashboardData.admin.recentEnrollments;
    },

    getRevenueData: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
            monthly: [
                { month: 'T1', revenue: 45000000 },
                { month: 'T2', revenue: 52000000 },
                { month: 'T3', revenue: 48000000 },
                { month: 'T4', revenue: 61000000 },
                { month: 'T5', revenue: 58000000 },
                { month: 'T6', revenue: 67000000 },
            ],
        };
    },
};
