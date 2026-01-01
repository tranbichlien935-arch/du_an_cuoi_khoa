const Loading = ({ message = 'Đang tải...' }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
            <div className="spinner"></div>
            <p className="text-gray-600">{message}</p>
        </div>
    );
};

export default Loading;
