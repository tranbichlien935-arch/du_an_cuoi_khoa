import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaEye, FaEyeSlash, FaUserTag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import authService from '@services/authService';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'ROLE_STUDENT',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        // Username
        if (!formData.username.trim()) {
            newErrors.username = 'Vui lòng nhập tên đăng nhập';
        } else if (formData.username.length < 4) {
            newErrors.username = 'Tên đăng nhập phải có ít nhất 4 ký tự';
        }

        // Password
        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        // Confirm Password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu không khớp';
        }

        // First Name
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Vui lòng nhập họ';
        }

        // Last Name
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Vui lòng nhập tên';
        }

        // Email
        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        // Phone (optional but validate if provided)
        if (formData.phone && !/^[0-9]{10,11}$/.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại phải có 10-11 chữ số';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const { confirmPassword, ...registerData } = formData;
            await authService.register(registerData);
            toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-primary py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-lg shadow-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <img src="/logo.png" alt="Wise Key Logo" className="h-16 w-16 object-contain" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Đăng Ký Tài Khoản</h2>
                        <p className="text-gray-600 mt-2 font-semibold">Wise Key</p>
                        <p className="text-gray-500 text-sm">Hệ Thống Quản Lý Trung Tâm Ngoại Ngữ</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="form-label">
                                <FaUser className="inline mr-2" />
                                Tên đăng nhập <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`form-input ${errors.username ? 'form-input-error' : ''}`}
                                placeholder="Nhập tên đăng nhập"
                            />
                            {errors.username && <span className="form-error">{errors.username}</span>}
                        </div>

                        {/* Name Fields */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">
                                    Họ <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`form-input ${errors.firstName ? 'form-input-error' : ''}`}
                                    placeholder="Nhập họ"
                                />
                                {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                            </div>
                            <div>
                                <label className="form-label">
                                    Tên <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`form-input ${errors.lastName ? 'form-input-error' : ''}`}
                                    placeholder="Nhập tên"
                                />
                                {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                            </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">
                                    <FaEnvelope className="inline mr-2" />
                                    Email <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                                    placeholder="example@email.com"
                                />
                                {errors.email && <span className="form-error">{errors.email}</span>}
                            </div>
                            <div>
                                <label className="form-label">
                                    <FaPhone className="inline mr-2" />
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                                    placeholder="0123456789"
                                />
                                {errors.phone && <span className="form-error">{errors.phone}</span>}
                            </div>
                        </div>

                        {/* Password Fields */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">
                                    <FaLock className="inline mr-2" />
                                    Mật khẩu <span className="text-danger">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`form-input pr-10 ${errors.password ? 'form-input-error' : ''}`}
                                        placeholder="Nhập mật khẩu"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && <span className="form-error">{errors.password}</span>}
                            </div>
                            <div>
                                <label className="form-label">
                                    <FaLock className="inline mr-2" />
                                    Xác nhận mật khẩu <span className="text-danger">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`form-input pr-10 ${errors.confirmPassword ? 'form-input-error' : ''}`}
                                        placeholder="Nhập lại mật khẩu"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="form-label">
                                <FaUserTag className="inline mr-2" />
                                Vai trò <span className="text-danger">*</span>
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="form-input"
                            >
                                <option value="ROLE_STUDENT">Học viên</option>
                                <option value="ROLE_TEACHER">Giáo viên</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">* Tài khoản Admin chỉ được tạo bởi quản trị viên</p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn btn-primary py-3 text-lg"
                        >
                            {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Đã có tài khoản?{' '}
                            <Link to="/login" className="text-primary hover:text-primary-dark font-semibold">
                                Đăng nhập ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
