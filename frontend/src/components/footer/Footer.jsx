// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
        {/* Cột 1: Thông tin công ty */}
        <div>
          <h2 className="text-lg font-semibold text-amber-600 mb-4">SEAFRESH</h2>
          <p className="text-sm mb-4">
            Sea Fresh mang bữa ăn hạnh phúc đến với mọi nhà!
          </p>
          <p className="flex items-start gap-2 text-sm mb-2">
            <span className="text-amber-600">📍</span>
            Hòa Hiệp - Nguyễn Huân - Đầm Dơi - Cà Mau <br />
            CN1: 51/74 Phạm Hùng - Phường 04 - Quận 08 - TPHCM
          </p>
          <p className="flex items-center gap-2 text-sm mb-2">
            <span className="text-amber-600">📞</span>
            0932.85.85.33 - 0904.86.32.46
          </p>
          <p className="flex items-center gap-2 text-sm">
            <span className="text-amber-600">✉️</span>
            cskh.seafresh@gmail.com
          </p>
        </div>

        {/* Cột 2: Hải sản cao cấp */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Hải Sản Cao Cấp</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:text-amber-600">Cua</Link></li>
            <li><Link to="#" className="hover:text-amber-600">Tôm</Link></li>
            <li><Link to="#" className="hover:text-amber-600">Cá</Link></li>
            <li><Link to="#" className="hover:text-amber-600">Mực</Link></li>
            <li><Link to="#" className="hover:text-amber-600">Nghêu - Sò - Ốc</Link></li>
          </ul>
        </div>

        {/* Cột 3: Liên kết */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Liên kết</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-amber-600">Trang chủ</Link></li>
            <li><Link to="/products" className="hover:text-amber-600">Hải Sản Cao Cấp</Link></li>
            <li><Link to="/clean-food" className="hover:text-amber-600">Thực Phẩm Sạch</Link></li>
            <li><Link to="/specialties" className="hover:text-amber-600">Đặc Sản</Link></li>
            <li><Link to="/about" className="hover:text-amber-600">Giới Thiệu</Link></li>
            <li><Link to="/contact" className="hover:text-amber-600">Liên Hệ</Link></li>
            <li><Link to="/news" className="hover:text-amber-600">Tin Tức</Link></li>
            <li><Link to="/landing" className="hover:text-amber-600">Landing Page</Link></li>
          </ul>
        </div>

        {/* Cột 4: Chính sách */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Chính sách</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/policy/privacy" className="hover:text-amber-600">Chính sách bảo mật</Link></li>
            <li><Link to="/policy/returns" className="hover:text-amber-600">Chính sách đổi trả hàng</Link></li>
            <li><Link to="/policy/order" className="hover:text-amber-600">Hướng dẫn đặt hàng</Link></li>
            <li><Link to="/stores" className="hover:text-amber-600">Hệ thống cửa hàng</Link></li>
            <li><Link to="/policy/collaborator" className="hover:text-amber-600">Chính sách cộng tác viên</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-50 border-t border-gray-200 py-4">
        <p className="text-center text-sm text-gray-500">
          Copyright © 2025 <span className="font-semibold">Sea Fresh</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
