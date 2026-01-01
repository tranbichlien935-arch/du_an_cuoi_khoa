import api from './api';
import { mockDataService } from './mockData';

const COURSE_ENDPOINT = '/courses';
const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

export const courseService = {
    // Get all courses
    getAllCourses: async () => {
        if (USE_MOCK) return await mockDataService.getAllCourses();
        const response = await api.get(COURSE_ENDPOINT);
        return response.data;
    },

    // Get active courses (for students)
    getActiveCourses: async () => {
        const response = await api.get(`${COURSE_ENDPOINT}/active`);
        return response.data;
    },

    // Get course by ID
    getCourseById: async (id) => {
        if (USE_MOCK) return await mockDataService.getCourseById(id);
        const response = await api.get(`${COURSE_ENDPOINT}/${id}`);
        return response.data;
    },

    // Create course
    createCourse: async (courseData) => {
        if (USE_MOCK) return await mockDataService.createCourse(courseData);
        const response = await api.post(COURSE_ENDPOINT, courseData);
        return response.data;
    },

    // Update course
    updateCourse: async (id, courseData) => {
        if (USE_MOCK) return await mockDataService.updateCourse(id, courseData);
        const response = await api.put(`${COURSE_ENDPOINT}/${id}`, courseData);
        return response.data;
    },

    // Delete course (soft delete)
    deleteCourse: async (id) => {
        if (USE_MOCK) return await mockDataService.deleteCourse(id);
        const response = await api.delete(`${COURSE_ENDPOINT}/${id}`);
        return response.data;
    },

    // Search courses
    searchCourses: async (query) => {
        const response = await api.get(`${COURSE_ENDPOINT}/search`, {
            params: { q: query },
        });
        return response.data;
    },

    // Filter courses
    filterCourses: async (filters) => {
        const response = await api.get(`${COURSE_ENDPOINT}/filter`, {
            params: filters,
        });
        return response.data;
    },
};

export default courseService;
