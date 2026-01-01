import api from './api';

const GRADE_ENDPOINT = '/grades';

export const gradeService = {
    // Get all grades
    getAllGrades: async () => {
        const response = await api.get(GRADE_ENDPOINT);
        return response.data;
    },

    // Enter/update grade
    saveGrade: async (gradeData) => {
        const response = await api.post(GRADE_ENDPOINT, gradeData);
        return response.data;
    },

    // Update grade
    updateGrade: async (id, gradeData) => {
        const response = await api.put(`${GRADE_ENDPOINT}/${id}`, gradeData);
        return response.data;
    },

    // Get grades by class
    getGradesByClass: async (classId) => {
        const response = await api.get(`${GRADE_ENDPOINT}/class/${classId}`);
        return response.data;
    },

    // Get grades by student
    getGradesByStudent: async (studentId) => {
        const response = await api.get(`${GRADE_ENDPOINT}/student/${studentId}`);
        return response.data;
    },

    // Get grade for specific student in class
    getStudentGrade: async (studentId, classId) => {
        const response = await api.get(`${GRADE_ENDPOINT}/student/${studentId}/class/${classId}`);
        return response.data;
    },

    // Delete grade
    deleteGrade: async (id) => {
        const response = await api.delete(`${GRADE_ENDPOINT}/${id}`);
        return response.data;
    },
};

export default gradeService;
