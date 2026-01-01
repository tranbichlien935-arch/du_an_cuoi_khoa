import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import Layout from '@components/layout/Layout';
import Loading from '@components/common/Loading';
import Modal from '@components/common/Modal';
import courseService from '@services/courseService';
import { toast } from 'react-toastify';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        price: '',
        duration: '',
        level: 'BEGINNER',
        isActive: true,
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        filterCourses();
    }, [searchTerm, courses]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const data = await courseService.getAllCourses();
            setCourses(data);
            setFilteredCourses(data);
        } catch (error) {
            toast.error('Không thể tải danh sách khóa học');
        } finally {
            setLoading(false);
        }
    };

    const filterCourses = () => {
        if (!searchTerm.trim()) {
            setFilteredCourses(courses);
            return;
        }
        const filtered = courses.filter(course =>
            course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.code?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCourses(filtered);
    };

    const handleOpenModal = (course = null) => {
        if (course) {
            setEditingCourse(course);
            setFormData(course);
        } else {
            setEditingCourse(null);
            setFormData({
                name: '',
                code: '',
                description: '',
                price: '',
                duration: '',
                level: 'BEGINNER',
                isActive: true,
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCourse(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCourse) {
                await courseService.updateCourse(editingCourse.id, formData);
                toast.success('Cập nhật khóa học thành công!');
            } else {
                await courseService.createCourse(formData);
                toast.success('Thêm khóa học thành công!');
            }
            handleCloseModal();
            fetchCourses();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Thao tác thất bại!');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
            try {
                await courseService.deleteCourse(id);
                toast.success('Xóa khóa học thành công!');
                fetchCourses();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Xóa thất bại!');
            }
        }
    };

    if (loading) return <Layout><Loading /></Layout>;

    return (
        <Layout>
            <div className="page-header">
                <h1 className="page-title">Quản Lý Khóa Học</h1>
                <button onClick={() => handleOpenModal()} className="btn btn-primary">
                    <FaPlus /> Thêm Khóa Học
                </button>
            </div>

            {/* Search */}
            <div className="card mb-6">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên hoặc mã khóa học..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-input pl-10"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã</th>
                            <th>Tên Khóa Học</th>
                            <th>Trình Độ</th>
                            <th>Giá (VNĐ)</th>
                            <th>Thời Lượng</th>
                            <th>Trạng Thái</th>
                            <th className="text-center">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map(course => (
                                <tr key={course.id}>
                                    <td className="font-mono text-sm">{course.code}</td>
                                    <td className="font-medium">{course.name}</td>
                                    <td>
                                        <span className="badge badge-info">{course.level}</span>
                                    </td>
                                    <td>{course.price?.toLocaleString()}</td>
                                    <td>{course.duration} giờ</td>
                                    <td>
                                        <span className={`badge ${course.isActive ? 'badge-success' : 'badge-danger'}`}>
                                            {course.isActive ? 'Hoạt động' : 'Ngừng'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleOpenModal(course)}
                                                className="btn btn-sm btn-primary"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(course.id)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-gray-500">
                                    Không tìm thấy khóa học nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingCourse ? 'Chỉnh Sửa Khóa Học' : 'Thêm Khóa Học Mới'}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="form-label">Mã khóa học <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">Tên khóa học <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label">Mô tả</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="form-input"
                            rows="3"
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="form-label">Giá (VNĐ) <span className="text-danger">*</span></label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="form-input"
                                min="0"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">Thời lượng (giờ) <span className="text-danger">*</span></label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="form-input"
                                min="1"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">Trình độ <span className="text-danger">*</span></label>
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="form-input"
                                required
                            >
                                <option value="BEGINNER">Cơ bản</option>
                                <option value="INTERMEDIATE">Trung cấp</option>
                                <option value="ADVANCED">Nâng cao</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="form-label">Trạng thái</label>
                        <select
                            name="isActive"
                            value={formData.isActive}
                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.value === 'true' }))}
                            className="form-input"
                        >
                            <option value="true">Hoạt động</option>
                            <option value="false">Ngừng hoạt động</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={handleCloseModal} className="btn btn-secondary">
                            Hủy
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {editingCourse ? 'Cập Nhật' : 'Thêm Mới'}
                        </button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};

export default Courses;
