import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../services/apis";
import AuthModal from "../auth/AuthModal";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(true);
  const [addressLoading, setAddressLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const loadUserCart = async () => {
    try {
      const response = await ApiService.getCart();
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error("Lỗi tải giỏ hàng:", error);
      toast.error("Không thể tải giỏ hàng từ server");
    } finally {
      setCartLoading(false);
    }
  };

  const loadUserAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const addressResponse = await ApiService.getAddressUserLogin();
        setAddresses(addressResponse.data || []);
        
        // Chọn địa chỉ mặc định
        const defaultAddress = addressResponse.data.find(addr => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress.id);
        }
      }
    } catch (error) {
      console.error("Lỗi tải địa chỉ:", error);
    } finally {
      setAddressLoading(false);
    }
  };

  const loadLocalCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    setCartLoading(false);
    setAddressLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const initCart = async () => {
      if (token) {
        try {
          await ApiService.verifyToken();
          await Promise.all([loadUserCart(), loadUserAddresses()]);
        } catch (err) {
          console.warn("Token không hợp lệ → dùng giỏ hàng local");
          loadLocalCart();
        }
      } else {
        loadLocalCart();
      }
      setLoading(false);
    };

    initCart();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 0) return; 
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await ApiService.verifyToken();
        if (newQuantity === 0) {
          await ApiService.deleteCartItem(productId);
          toast.info("Đã xóa sản phẩm khỏi giỏ hàng");
        } else {
          await ApiService.updateCartItem(productId, newQuantity);
          toast.success("Cập nhật giỏ hàng thành công");
        }

        const updatedCart = await ApiService.getCart();
        setCartItems(updatedCart.data.items || []);
      } else {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find((item) => item.productId === productId);
        if (!existing) return;

        if (newQuantity === 0) {
          cart = cart.filter((item) => item.productId !== productId);
          toast.info("Đã xóa sản phẩm khỏi giỏ hàng");
        } else {
          existing.quantity = newQuantity;
          toast.success("Cập nhật giỏ hàng thành công");
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setCartItems(cart);
      }
    } catch (error) {
      console.error(error);
      toast.error("Không thể cập nhật giỏ hàng");
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Vui lòng đăng nhập để tiến hành thanh toán");
      navigate("/login");
      return;
    }

    if (addresses.length === 0) {
      toast.error("Vui lòng thêm địa chỉ giao hàng trước khi thanh toán");
      return;
    }

    if (!selectedAddress) {
      toast.error("Vui lòng chọn địa chỉ giao hàng");
      return;
    }

    try {
      const orderData = {
        addressId: selectedAddress,
        paymentMethod: paymentMethod,
        note: ""
      };

      const response = await ApiService.createOrder(orderData);
      toast.success("Đặt hàng thành công!");
      
      // Clear giỏ hàng sau khi đặt hàng thành công
      if (token) {
        // Clear cart từ server
        await ApiService.clearCart();
      } else {
        // Clear cart local
        localStorage.removeItem("cart");
      }
      setCartItems([]);
      
      // Chuyển đến trang thành công
      navigate("/order-success", { 
        state: { 
          orderId: response.data.id,
          orderNumber: response.data.orderNumber 
        }
      });
      
    } catch (error) {
      const errorMsg = error.message || "Đặt hàng thất bại";
      toast.error(errorMsg);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const continueShopping = () => {
    navigate("/products");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Giỏ hàng của bạn</h1>
          <p className="text-gray-600">Xem lại và chỉnh sửa đơn hàng trước khi thanh toán</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Giỏ hàng trống</h3>
            <p className="text-gray-500 mb-6">Thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm</p>
            <Link
              to="/products"
              className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items & Checkout Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Sản phẩm ({cartItems.length})</h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="p-6 flex items-center gap-4">
                      <img
                        src={item.images[0] || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {item.weight} • Xuất xứ: {item.origin}
                        </p>
                        <p className="text-lg font-bold text-amber-600">{formatPrice(item.price)}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => updateQuantity(item.productId, 0)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Địa chỉ giao hàng - Chỉ hiện khi đã đăng nhập */}
              {localStorage.getItem("token") && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Địa chỉ giao hàng</h2>
                  
                  {addressLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600 mx-auto"></div>
                      <p className="mt-2 text-gray-600">Đang tải địa chỉ...</p>
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500 mb-4">Bạn chưa có địa chỉ nào</p>
                      <Link
                        to="/profile?tab=addresses"
                        className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                      >
                        Thêm địa chỉ mới
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {addresses.map((address) => (
                        <div key={address.id} className="flex items-start gap-3">
                          <input
                            type="radio"
                            id={`address-${address.id}`}
                            name="address"
                            value={address.id}
                            checked={selectedAddress === address.id}
                            onChange={(e) => setSelectedAddress(e.target.value)}
                            className="mt-1 text-amber-600 focus:ring-amber-500"
                          />
                          <label htmlFor={`address-${address.id}`} className="flex-1 cursor-pointer">
                            <div className={`border rounded-lg p-4 ${selectedAddress === address.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-gray-900">{address.name}</span>
                                {address.isDefault && (
                                  <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                                    Mặc định
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600">{address.phone}</p>
                              <p className="text-gray-600">{address.address}</p>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Phương thức thanh toán - Chỉ hiện khi đã đăng nhập */}
              {localStorage.getItem("token") && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        id="cash"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 text-amber-600 focus:ring-amber-500"
                      />
                      <label htmlFor="cash" className="flex-1 cursor-pointer">
                        <div className={`border rounded-lg p-4 ${paymentMethod === "cash" ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-6 bg-green-100 rounded flex items-center justify-center">
                              <span className="text-green-800 text-sm font-bold">COD</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-900">Thanh toán khi nhận hàng</span>
                              <p className="text-sm text-gray-600">Trả tiền mặt khi nhận được hàng</p>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        id="card"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 text-amber-600 focus:ring-amber-500"
                      />
                      <label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className={`border rounded-lg p-4 ${paymentMethod === "card" ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center">
                              <span className="text-blue-800 text-sm font-bold">VN</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-900">Thẻ tín dụng/ghi nợ</span>
                              <p className="text-sm text-gray-600">Thanh toán an toàn qua cổng VNPay</p>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>

                {/* Danh sách sản phẩm */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3">
                      <img
                        src={item.images[0] || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-amber-600">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="font-medium">Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Thuế VAT (10%)</span>
                    <span className="font-medium">{formatPrice(getTotalPrice() * 0.1)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Tổng cộng</span>
                      <span className="text-lg font-bold text-amber-600">
                        {formatPrice(getTotalPrice() * 1.1)}
                      </span>
                    </div>
                  </div>
                </div>

                {localStorage.getItem("token") ? (
                  <button
                    onClick={handleCheckout}
                    disabled={addresses.length === 0 || !selectedAddress}
                    className={`w-full py-3 rounded-lg font-medium transition-colors mb-3 ${
                      addresses.length === 0 || !selectedAddress
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-amber-600 text-white hover:bg-amber-700"
                    }`}
                  >
                    {paymentMethod === "cash" ? "Xác nhận đặt hàng" : "Tiến hành thanh toán"}
                  </button>
                ) : (
                  <div>
                  <button
                    onClick={() => setIsAuthModalOpen(true)} 
                    className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors mb-3"
                  >
                    Đăng nhập để thanh toán
                  </button>
                  <AuthModal 
                    isOpen={isAuthModalOpen} 
                    onClose={() => setIsAuthModalOpen(false)} 
                    onLoginSuccess={(userData) => {
                      setUser(userData);
                      setIsAuthModalOpen(false);
                      // Load lại giỏ hàng và địa chỉ
                      loadUserCart();
                      loadUserAddresses();
                    }} 
                  />
                  </div>
                )}

                <button
                  onClick={continueShopping}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Tiếp tục mua sắm
                </button>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Chính sách giao hàng</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Giao hàng miễn phí cho đơn từ 500k
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Giao hàng trong 2-4 giờ
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Đảm bảo tươi sống 100%
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;