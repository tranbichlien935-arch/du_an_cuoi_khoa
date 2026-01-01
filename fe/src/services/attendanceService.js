import api from './api';

const ATTENDANCE_ENDPOINT = '/attendance';

export const attendanceService = {
    // Get all attendance records
    getAllAttendance: async () => {
        const response = await api.get(ATTENDANCE_ENDPOINT);
        return response.data;
    },

    // Take attendance for a class session
    takeAttendance: async (attendanceData) => {
        const response = await api.post(ATTENDANCE_ENDPOINT, attendanceData);
        return response.data;
    },

    // Update attendance record
    updateAttendance: async (id, attendanceData) => {
        const response = await api.put(`${ATTENDANCE_ENDPOINT}/${id}`, attendanceData);
        return response.data;
    },

    // Get attendance by class
    getAttendanceByClass: async (classId) => {
        const response = await api.get(`${ATTENDANCE_ENDPOINT}/class/${classId}`);
        return response.data;
    },

    // Get attendance by student
    getAttendanceByStudent: async (studentId) => {
        const response = await api.get(`${ATTENDANCE_ENDPOINT}/student/${studentId}`);
        return response.data;
    },

    // Get attendance for specific date
    getAttendanceByDate: async (classId, date) => {
        const response = await api.get(`${ATTENDANCE_ENDPOINT}/class/${classId}/date/${date}`);
        return response.data;
    },

    // Get attendance summary for student
    getAttendanceSummary: async (studentId, classId) => {
        const response = await api.get(`${ATTENDANCE_ENDPOINT}/summary`, {
            params: { studentId, classId },
        });
        return response.data;
    },
};

export default attendanceService;
