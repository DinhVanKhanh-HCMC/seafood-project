import { useState } from "react";
import ApiService from "../../services/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await ApiService.logout();
      localStorage.removeItem("token");
      toast.success(response.message);
      setIsProfileOpen(false);
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleToggleProfile = () => {
    console.log("🎯 Button clicked");
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Tiêu đề */}
      <h2 className="text-lg font-semibold text-gray-800">Quản lý hệ thống</h2>

      {/* Ô tìm kiếm + Avatar */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <button
            onClick={handleToggleProfile}
            className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold"
          >
            A
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
              <ul className="py-1">
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}