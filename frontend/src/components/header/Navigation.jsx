
import { Children, useState, useEffect } from "react"
import { NavLink, Link } from "react-router-dom";
import AuthModal from "../auth/AuthModal";
import ApiService from "../../services/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authEvents } from "../../utils/authEvents";
import { useCart } from '../../contexts/CartContext';
import { Search } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [isUserChecked, setIsUserChecked] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()
  const { cartItems } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [productsLoading, setProductsLoading] = useState(true);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Tính tổng số lượng sản phẩm
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Khi component mount, kiểm tra token
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      ApiService.getCurrentUser()
        .then((res) => {
          setUser({
            name: res.data.fullName,
            avatar: res.data.avatar || "https://seafood-project-1306.s3.ap-southeast-1.amazonaws.com/default-avt.png"
          })
        })
        .catch(() => {
          localStorage.removeItem("token")
          setUser(null)
        })
        .finally(() => {
        setIsUserChecked(true);   
      });
    } else {
      setIsUserChecked(true); 
    }
  }, [])

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      // Giả sử bạn có API lấy danh sách sản phẩm
      const response = await ApiService.getAllProduct();
      setProducts(response.data || []);
      setFilteredProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Không thể tải danh sách sản phẩm');
    } finally {
      setProductsLoading(false);
    }
  };

  const handleProductSelect = (id) => {
    navigate(`/product-detail/${id}`)
    setShowProductDropdown(false)
  };

  useEffect(() => {
    // Lắng nghe event mở modal
    const handleOpenModal = () => setIsAuthModalOpen(true);
    
    authEvents.onOpen(handleOpenModal);
    
    return () => authEvents.offOpen(handleOpenModal);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleLogout = async () =>{
    try {
      const response = await ApiService.logout()
      localStorage.removeItem("token")
      toast.success(response.message)
      setUser(null)
      setIsProfileOpen(false)
      navigate("/")
    } catch (error) {
      toast.success(error)
    }
  } 

  const navItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Giới thiệu", href: "/about" },
    { name: "Sản phẩm", href: "/products", Children: ["/product-detail/:id"] },
    { name: "Tin tức", href: "/news", Children: ["/news-detail/:id"] },
    // { name: "Livestream", href: "/livestreaming" }, 
    { name: "Đấu giá", href: "/auction" },
    { name: "Liên hệ", href: "/contact" },
  ]

  return (
    <>
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-amber-600">SeaFresh</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `relative text-gray-700 px-3 text-sm font-medium transition-colors duration-200
                     hover:text-amber-600
                     ${isActive ? "text-amber-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-amber-600" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Search, Cart and Sign In */}
          <div className="hidden md:flex items-start gap-4 relative">
            <div className="relative w-64">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowProductDropdown(true);
                }}
                onFocus={() => setShowProductDropdown(true)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {showProductDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {/* Nút đóng */}
                <button
                  onClick={() => setShowProductDropdown(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl leading-none"
                >
                  X
                </button>

                {productsLoading ? (
                  <div className="p-3 text-center text-gray-500">Đang tải sản phẩm...</div>
                ) : filteredProducts.length === 0 ? (
                  <div className="p-3 text-center text-gray-500">Không tìm thấy sản phẩm</div>
                ) : (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product.id)}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                    >
                      <div className="font-medium text-gray-800">{product.name}</div>
                      <div className="text-sm text-gray-600 truncate">
                        {product.description}
                      </div>
                      <div className="text-sm font-semibold text-green-600">
                        {formatPrice(product.price)}
                      </div>
                      {product.inAuction && (<div className="text-sm font-semibold text-orange-600">
                        Sản phẩm đấu giá
                      </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
                />
              </svg>
              
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs 
                                flex items-center justify-center min-w-[18px] h-5 px-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <div>
                <button 
                  className="w-10 h-10 rounded-full overflow-hidden border border-gray-300" 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover" 
                  />
                </button>

                {/* Popup menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">Thông tin cá nhân</p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <Link
                          onClick={() => setIsProfileOpen(!isProfileOpen)}
                          to="/profile" 
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Hồ sơ cá nhân
                        </Link>
                      </li>
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
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)} 
                className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
              >
                Đăng nhập
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-amber-600 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-amber-600 block px-3 py-2 text-base font-medium"
                >
                  {item.name}
                </a>
              ))}
              <a href="/cart" className="text-gray-700 hover:text-amber-600 block px-3 py-2 text-base font-medium">
                Giỏ hàng
              </a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-amber-600 text-white w-full px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>

    <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} 
      onLoginSuccess={(userData) => {
      setUser(userData)
      console.log(userData)     // Lưu user vào state
      setIsAuthModalOpen(false)
      window.dispatchEvent(new CustomEvent('authLoginSuccess'));
    }} />
    </>
  )
}

export default Navigation
