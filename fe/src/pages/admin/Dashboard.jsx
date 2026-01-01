import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaChalkboardTeacher, FaBook, FaGraduationCap, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Layout from '@components/layout/Layout';
import Loading from '@components/common/Loading';
import ErrorMessage from '@components/common/ErrorMessage';
import dashboardService from '@services/dashboardService';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const data = await dashboardService.getAdminStats();
            setStats(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Không thể tải dữ liệu');
            toast.error('Không thể tải dữ liệu dashboard');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Layout><Loading /></Layout>;
    if (error) return <Layout><ErrorMessage message={error} onRetry={fetchStats} /></Layout>;

    return (
        <Layout>
            <div className="page-header">
                <h1 className="page-title">Dashboard Quản Trị</h1>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Students */}
                <div className="stat-card border-l-primary">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Tổng Học Viên</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                {stats?.totalStudents || 0}
                            </h3>
                            <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                                <FaArrowUp /> +{stats?.newStudentsThisMonth || 0} tháng này
                            </p>
                        </div>
                        <div className="bg-primary-light rounded-full p-3">
                            <FaGraduationCap className="text-2xl text-primary-dark" />
                        </div>
                    </div>
                </div>

                {/* Total Teachers */}
                <div className="stat-card border-l-success">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Tổng Giáo Viên</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                {stats?.totalTeachers || 0}
                            </h3>
                            <p className="text-gray-500 text-sm mt-2">Đang hoạt động</p>
                        </div>
                        <div className="bg-green-100 rounded-full p-3">
                            <FaChalkboardTeacher className="text-2xl text-green-700" />
                        </div>
                    </div>
                </div>

                {/* Total Courses */}
                <div className="stat-card border-l-warning">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Tổng Khóa Học</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                {stats?.totalCourses || 0}
                            </h3>
                            <p className="text-gray-500 text-sm mt-2">{stats?.activeCourses || 0} đang mở</p>
                        </div>
                        <div className="bg-yellow-100 rounded-full p-3">
                            <FaBook className="text-2xl text-yellow-700" />
                        </div>
                    </div>
                </div>

                {/* Total Classes */}
                <div className="stat-card border-l-info">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Tổng Lớp Học</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                {stats?.totalClasses || 0}
                            </h3>
                            <p className="text-gray-500 text-sm mt-2">{stats?.activeClasses || 0} đang mở</p>
                        </div>
                        <div className="bg-blue-100 rounded-full p-3">
                            <FaUsers className="text-2xl text-blue-700" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Enrollments */}
                <div className="card">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Đăng Ký Gần Đây</h2>
                        <Link to="/admin/users" className="text-primary hover:text-primary-dark text-sm font-medium">
                            Xem tất cả →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {stats?.recentEnrollments?.slice(0, 5).map((enrollment, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                                        {enrollment.studentName?.[0]}
                                    </div>
                                    <div>
                                        <p className="font-medium">{enrollment.studentName}</p>
                                        <p className="text-sm text-gray-600">{enrollment.courseName}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">{enrollment.date}</span>
                            </div>
                        )) || <p className="text-gray-500 text-center py-4">Chưa có dữ liệu</p>}
                    </div>
                </div>

                {/* Classes Near Capacity */}
                <div className="card">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Lớp Sắp Đầy</h2>
                        <Link to="/admin/classes" className="text-primary hover:text-primary-dark text-sm font-medium">
                            Xem tất cả →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {stats?.classesNearCapacity?.slice(0, 5).map((classItem, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-md">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-medium">{classItem.className}</p>
                                        <p className="text-sm text-gray-600">{classItem.courseName}</p>
                                    </div>
                                    <span className="badge badge-warning">
                                        {classItem.currentStudents}/{classItem.maxStudents}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-warning h-2 rounded-full"
                                        style={{ width: `${(classItem.currentStudents / classItem.maxStudents) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )) || <p className="text-gray-500 text-center py-4">Chưa có dữ liệu</p>}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
                <Link to="/admin/courses" className="card hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary-light rounded-full p-4">
                            <FaBook className="text-2xl text-primary-dark" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Quản Lý Khóa Học</h3>
                            <p className="text-gray-600 text-sm">Thêm, sửa, xóa khóa học</p>
                        </div>
                    </div>
                </Link>

                <Link to="/admin/classes" className="card hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="bg-green-100 rounded-full p-4">
                            <FaUsers className="text-2xl text-green-700" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Quản Lý Lớp Học</h3>
                            <p className="text-gray-600 text-sm">Tạo lớp, gán giáo viên</p>
                        </div>
                    </div>
                </Link>

                <Link to="/admin/users" className="card hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="bg-yellow-100 rounded-full p-4">
                            <FaChalkboardTeacher className="text-2xl text-yellow-700" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Quản Lý Người Dùng</h3>
                            <p className="text-gray-600 text-sm">Thêm, sửa người dùng</p>
                        </div>
                    </div>
                </Link>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
