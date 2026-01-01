import api from './api';
import { mockDataService } from './mockData';

const USER_ENDPOINT = '/users';
const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

export const userService = {
    // Get all users
    getAllUsers: async () => {
        if (USE_MOCK) return await mockDataService.getAllUsers();
        const response = await api.get(USER_ENDPOINT);
        return response.data;
    },

    // Get user by ID
    getUserById: async (id) => {
        if (USE_MOCK) return await mockDataService.getUserById(id);
        const response = await api.get(`${USER_ENDPOINT}/${id}`);
        return response.data;
    },

    // Create new user
    createUser: async (userData) => {
        if (USE_MOCK) return await mockDataService.createUser(userData);
        const response = await api.post(USER_ENDPOINT, userData);
        return response.data;
    },

    // Update user
    updateUser: async (id, userData) => {
        if (USE_MOCK) return await mockDataService.updateUser(id, userData);
        const response = await api.put(`${USER_ENDPOINT}/${id}`, userData);
        return response.data;
    },

    // Delete user
    deleteUser: async (id) => {
        if (USE_MOCK) return await mockDataService.deleteUser(id);
        const response = await api.delete(`${USER_ENDPOINT}/${id}`);
        return response.data;
    },

    // Search users
    searchUsers: async (query) => {
        const response = await api.get(`${USER_ENDPOINT}/search`, {
            params: { q: query },
        });
        return response.data;
    },

    // Filter users by role
    getUsersByRole: async (role) => {
        if (USE_MOCK) return await mockDataService.getUsersByRole(role);
        const response = await api.get(`${USER_ENDPOINT}/role/${role}`);
        return response.data;
    },

    // Activate user
    activateUser: async (id) => {
        if (USE_MOCK) return await mockDataService.activateUser(id);
        const response = await api.put(`${USER_ENDPOINT}/${id}/activate`);
        return response.data;
    },

    // Deactivate user
    deactivateUser: async (id) => {
        if (USE_MOCK) return await mockDataService.deactivateUser(id);
        const response = await api.put(`${USER_ENDPOINT}/${id}/deactivate`);
        return response.data;
    },

    // Reset password
    resetPassword: async (id) => {
        if (USE_MOCK) return await mockDataService.resetPassword(id);
        const response = await api.put(`${USER_ENDPOINT}/${id}/reset-password`);
        return response.data;
    },

    // Change password
    changePassword: async (oldPassword, newPassword) => {
        const response = await api.put(`${USER_ENDPOINT}/change-password`, {
            oldPassword,
            newPassword,
        });
        return response.data;
    },

    // Update profile
    updateProfile: async (userData) => {
        const response = await api.put(`${USER_ENDPOINT}/profile`, userData);
        return response.data;
    },

    // Get current user profile
    getProfile: async () => {
        const response = await api.get(`${USER_ENDPOINT}/profile`);
        return response.data;
    },
};

export default userService;
