import { Outlet } from "react-router-dom";
import Navigation from "../Sidebar/Navigation";

export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar cố định */}
      <Navigation />

      {/* Nội dung chính */}
      <div className="flex-1 flex flex-col ml-64 bg-gray-50">
        {/* Header */}
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
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Outlet để render các page */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
