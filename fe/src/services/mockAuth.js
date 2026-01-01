// Mock users data for testing without backend
export const mockUsers = [
    {
        id: 1,
        username: 'admin',
        password: 'admin123',
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
        password: 'teacher123',
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
        password: 'student123',
        firstName: 'Trần',
        lastName: 'Học Viên',
        email: 'student@wisekey.com',
        phone: '0123456780',
        role: 'ROLE_STUDENT',
        status: 'Active',
    },
];

// Mock authentication service
export const mockAuthService = {
    login: async (username, password) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Find user
        const user = mockUsers.find(
            u => u.username === username && u.password === password
        );

        if (!user) {
            throw {
                response: {
                    data: {
                        message: 'Tên đăng nhập hoặc mật khẩu không đúng!',
                    },
                },
            };
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        // Generate fake token
        const token = 'mock_token_' + Date.now();

        return {
            accessToken: token,
            user: userWithoutPassword,
        };
    },

    register: async (userData) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check if username already exists
        const exists = mockUsers.find(u => u.username === userData.username);
        if (exists) {
            throw {
                response: {
                    data: {
                        message: 'Tên đăng nhập đã tồn tại!',
                    },
                },
            };
        }

        // Create new user (in real app, this would save to backend)
        const newUser = {
            id: mockUsers.length + 1,
            ...userData,
            status: 'Active',
        };

        mockUsers.push(newUser);

        return {
            message: 'Đăng ký thành công!',
        };
    },
};
