import api from './api';
import { mockDataService } from './mockData';

const CLASS_ENDPOINT = '/classes';
const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

export const classService = {
    // Get all classes
    getAllClasses: async () => {
        if (USE_MOCK) return await mockDataService.getAllClasses();
        const response = await api.get(CLASS_ENDPOINT);
        return response.data;
    },

    // Get class by ID
    getClassById: async (id) => {
        if (USE_MOCK) return await mockDataService.getClassById(id);
        const response = await api.get(`${CLASS_ENDPOINT}/${id}`);
        return response.data;
    },

    // Create class
    createClass: async (classData) => {
        if (USE_MOCK) return await mockDataService.createClass(classData);
        const response = await api.post(CLASS_ENDPOINT, classData);
        return response.data;
    },

    // Update class
    updateClass: async (id, classData) => {
        if (USE_MOCK) return await mockDataService.updateClass(id, classData);
        const response = await api.put(`${CLASS_ENDPOINT}/${id}`, classData);
        return response.data;
    },

    // Delete class
    deleteClass: async (id) => {
        if (USE_MOCK) return await mockDataService.deleteClass(id);
        const response = await api.delete(`${CLASS_ENDPOINT}/${id}`);
        return response.data;
    },

    // Get classes by course
    getClassesByCourse: async (courseId) => {
        if (USE_MOCK) return await mockDataService.getClassesByCourse(courseId);
        const response = await api.get(`${CLASS_ENDPOINT}/course/${courseId}`);
        return response.data;
    },

    // Get classes by teacher
    getClassesByTeacher: async (teacherId) => {
        if (USE_MOCK) return await mockDataService.getClassesByTeacher(teacherId);
        const response = await api.get(`${CLASS_ENDPOINT}/teacher/${teacherId}`);
        return response.data;
    },

    // Get students in class
    getStudentsInClass: async (classId) => {
        if (USE_MOCK) return await mockDataService.getStudentsInClass(classId);
        const response = await api.get(`${CLASS_ENDPOINT}/${classId}/students`);
        return response.data;
    },

    // Assign teacher to class
    assignTeacher: async (classId, teacherId) => {
        const response = await api.put(`${CLASS_ENDPOINT}/${classId}/teacher`, {
            teacherId,
        });
        return response.data;
    },

    // Open/close enrollment
    toggleEnrollment: async (classId, isOpen) => {
        const response = await api.put(`${CLASS_ENDPOINT}/${classId}/enrollment`, {
            isOpen,
        });
        return response.data;
    },

    // Check if class is full
    isClassFull: async (classId) => {
        const response = await api.get(`${CLASS_ENDPOINT}/${classId}/is-full`);
        return response.data;
    },

    // Get available classes (not full, enrollment open)
    getAvailableClasses: async () => {
        const response = await api.get(`${CLASS_ENDPOINT}/available`);
        return response.data;
    },
};

export default classService;
