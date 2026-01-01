const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="container mx-auto px-4 py-6">
                <div className="text-center">
                    <p className="text-sm">
                        © {currentYear} Wise Key - Hệ Thống Quản Lý Trung Tâm Ngoại Ngữ. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Được xây dựng với React + Vite
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
