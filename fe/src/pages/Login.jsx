import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { FaGraduationCap, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
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
        if (!formData.username.trim()) {
            newErrors.username = 'Vui lòng nhập tên đăng nhập';
        }
        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
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
            const data = await login(formData.username, formData.password);
            toast.success('Đăng nhập thành công!');

            // Redirect based on role
            if (data.user.role === 'ROLE_ADMIN') {
                navigate('/admin/dashboard');
            } else if (data.user.role === 'ROLE_TEACHER') {
                navigate('/teacher/dashboard');
            } else if (data.user.role === 'ROLE_STUDENT') {
                navigate('/student/courses');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-primary py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-lg shadow-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <img src="/logo.png" alt="Wise Key Logo" className="h-20 w-20 object-contain" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Đăng Nhập</h2>
                        <p className="text-gray-600 mt-2 font-semibold">Wise Key</p>
                        <p className="text-gray-500 text-sm">Hệ Thống Quản Lý Trung Tâm Ngoại Ngữ</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label className="form-label">
                                <FaUser className="inline mr-2" />
                                Tên đăng nhập
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

                        {/* Password */}
                        <div>
                            <label className="form-label">
                                <FaLock className="inline mr-2" />
                                Mật khẩu
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn btn-primary py-3 text-lg"
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                        </button>
                    </form>

                    {/* Demo Accounts Info */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                        <p className="text-xs text-blue-800 font-semibold mb-2">Tài khoản demo:</p>
                        <div className="text-xs text-blue-700 space-y-1">
                            <p>Admin: admin / admin123</p>
                            <p>Teacher: teacher / teacher123</p>
                            <p>Student: student / student123</p>
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Chưa có tài khoản?{' '}
                            <Link to="/register" className="text-primary hover:text-primary-dark font-semibold">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
