import { 
  Users, 
  Package, 
  ShoppingCart, 
  Video, 
  Gavel, 
  FileText 
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const menuItems = [
    { icon: Users, label: "Quản lý người dùng", href: "/users" },
    { icon: Package, label: "Quản lý sản phẩm", href: "/products" },
    { icon: ShoppingCart, label: "Quản lý đơn hàng", href: "/orders" },
    { icon: Video, label: "Quản lý livestream", href: "/livestreams" },
    { icon: Gavel, label: "Quản lý đấu giá", href: "/auctions" },
    { icon: FileText, label: "Quản lý bài viết", href: "/posts" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 pb-4">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        <p className="text-sm text-gray-500">Quản lý hệ thống</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 mt-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `w-full flex items-center px-3 py-3 rounded-lg text-left transition-colors duration-200 hover:bg-gray-50 ${
                      isActive ? "font-semibold bg-gray-100 text-blue-600" : "text-gray-700"
                    }`
                  }
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
