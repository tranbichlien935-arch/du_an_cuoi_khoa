import api from './api';
import { mockDashboardService } from './mockDashboard';

const DASHBOARD_ENDPOINT = '/dashboard';
const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

export const dashboardService = {
    // Get admin dashboard statistics
    getAdminStats: async () => {
        if (USE_MOCK) {
            return await mockDashboardService.getAdminStats();
        }
        const response = await api.get(`${DASHBOARD_ENDPOINT}/admin`);
        return response.data;
    },

    // Get teacher dashboard data
    getTeacherStats: async (teacherId) => {
        if (USE_MOCK) {
            return await mockDashboardService.getTeacherStats(teacherId);
        }
        const response = await api.get(`${DASHBOARD_ENDPOINT}/teacher/${teacherId}`);
        return response.data;
    },

    // Get student dashboard data
    getStudentStats: async (studentId) => {
        if (USE_MOCK) {
            return await mockDashboardService.getStudentStats(studentId);
        }
        const response = await api.get(`${DASHBOARD_ENDPOINT}/student/${studentId}`);
        return response.data;
    },

    // Get revenue data
    getRevenueData: async (period) => {
        if (USE_MOCK) {
            return await mockDashboardService.getRevenueData();
        }
        const response = await api.get(`${DASHBOARD_ENDPOINT}/revenue`, {
            params: { period },
        });
        return response.data;
    },

    // Get recent enrollments
    getRecentEnrollments: async (limit = 10) => {
        if (USE_MOCK) {
            return await mockDashboardService.getRecentEnrollments();
        }
        const response = await api.get(`${DASHBOARD_ENDPOINT}/recent-enrollments`, {
            params: { limit },
        });
        return response.data;
    },

    // Get classes near capacity
    getClassesNearCapacity: async () => {
        if (USE_MOCK) {
            return mockDashboardService.getAdminStats().then(data => data.classesNearCapacity);
        }
        const response = await api.get(`${DASHBOARD_ENDPOINT}/classes-near-capacity`);
        return response.data;
    },
};

export default dashboardService;
