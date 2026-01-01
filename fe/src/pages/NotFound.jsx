import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <h2 className="text-3xl font-bold text-gray-800 mt-4">Không tìm thấy trang</h2>
                <p className="text-gray-600 mt-2 mb-8">Trang bạn đang tìm kiếm không tồn tại.</p>
                <Link to="/" className="btn btn-primary">
                    <FaHome /> Về trang chủ
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
