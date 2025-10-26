import { NavLink, useLocation } from "react-router-dom"
import { 
  Users, 
  Package, 
  ShoppingCart, 
  Video, 
  Gavel, 
  FileText,
  X 
} from "lucide-react"

function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  
  const navigation = [
    { name: "Quản lý người dùng", href: "/users", icon: Users, children: ["/add-user"] },
    { name: "Quản lý sản phẩm", href: "/products", icon: Package, children: ["/add-product"] },
    { name: "Quản lý đơn hàng", href: "/orders", icon: ShoppingCart, children: ["/orders/:id"] },
    { name: "Quản lý livestream", href: "/livestreams", icon: Video, children: ["/create-livestream"] },
    { name: "Quản lý đấu giá", href: "/auctions", icon: Gavel, children: ["/create-auction"] },
    { name: "Quản lý bài viết", href: "/posts", icon: FileText },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={onClose}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => {
                    const childActive = item.children?.some(child => 
                      location.pathname.startsWith(child.replace(/\/:[^/]+$/, ''))
                    ) || false
                    return `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive || childActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }}
                  onClick={() => {
                    if (window.innerWidth < 1024) { // lg breakpoint
                      onClose()
                    }
                  }}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Sidebar