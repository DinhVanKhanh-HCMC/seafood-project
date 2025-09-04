import Navigation from "../header/Navigation"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header luôn nằm trên */}
      <header className="sticky top-0 z-50">
        <Navigation />
      </header>

      {/* Nội dung trang */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer (nếu cần) */}
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        © 2025 SeaFresh. All rights reserved.
      </footer>
    </div>
  )
}

export default Layout
