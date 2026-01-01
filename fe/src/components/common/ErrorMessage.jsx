import { FaExclamationCircle } from 'react-icons/fa';

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
            <FaExclamationCircle className="text-5xl text-danger" />
            <p className="text-danger text-lg font-medium">{message || 'Đã xảy ra lỗi!'}</p>
            {onRetry && (
                <button onClick={onRetry} className="btn btn-primary">
                    Thử lại
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
