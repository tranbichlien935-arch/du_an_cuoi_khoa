import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBook, FaUsers, FaDollarSign } from 'react-icons/fa';
import Layout from '@components/layout/Layout';
import Loading from '@components/common/Loading';
import courseService from '@services/courseService';
import { toast } from 'react-toastify';

const StudentCourses = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [levelFilter, setLevelFilter] = useState('All');

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        filterCourses();
    }, [searchTerm, levelFilter, courses]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const data = await courseService.getActiveCourses();
            setCourses(data);
            setFilteredCourses(data);
        } catch (error) {
            toast.error('Không thể tải danh sách khóa học');
        } finally {
            setLoading(false);
        }
    };

    const filterCourses = () => {
        let filtered = courses;

        if (searchTerm.trim()) {
            filtered = filtered.filter(course =>
                course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (levelFilter !== 'All') {
            filtered = filtered.filter(course => course.level === levelFilter);
        }

        setFilteredCourses(filtered);
    };

    if (loading) return <Layout><Loading /></Layout>;

    return (
        <Layout>
            <div className="page-header">
                <h1 className="page-title">Tìm Kiếm Khóa Học</h1>
            </div>

            {/* Filters */}
            <div className="card mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm khóa học..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-input pl-10"
                        />
                    </div>
                    <select
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.target.value)}
                        className="form-input"
                    >
                        <option value="All">Tất cả trình độ</option>
                        <option value="BEGINNER">Cơ bản</option>
                        <option value="INTERMEDIATE">Trung cấp</option>
                        <option value="ADVANCED">Nâng cao</option>
                    </select>
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map(course => (
                        <Link
                            key={course.id}
                            to={`/student/courses/${course.id}`}
                            className="card hover:shadow-lg transition-all hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className="badge badge-primary">{course.level}</span>
                                <span className="text-lg font-bold text-primary">
                                    {course.price?.toLocaleString()} VNĐ
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                {course.description || 'Không có mô tả'}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-gray-600 pt-3 border-t">
                                <div className="flex items-center gap-1">
                                    <FaBook className="text-primary" />
                                    <span>{course.duration} giờ</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaUsers className="text-primary" />
                                    <span>{course.totalClasses || 0} lớp</span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500">Không tìm thấy khóa học nào</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default StudentCourses;
