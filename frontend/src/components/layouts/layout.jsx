import Navigation from "../header/Navigation"
import { Outlet } from "react-router-dom"
import ScrollToTop from "./ScrollToTop"
import Footer from "../footer/Footer"

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header luôn nằm trên */}
      <header className="sticky top-0 z-50">
        <Navigation />
      </header>

      <ScrollToTop/>


      {/* Nội dung trang */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer (nếu cần) */}
      <footer className="bg-gray-100 text-left py-4 text-sm text-gray-500">
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout
