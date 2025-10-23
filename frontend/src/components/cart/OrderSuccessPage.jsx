import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, orderNumber } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      toast.error("Thông tin đơn hàng không hợp lệ");
      navigate("/");
    }
  }, [orderId, navigate]);

  if (!orderId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Icon thành công */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Thông báo */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Đặt hàng thành công!</h1>
          <p className="text-lg text-gray-600 mb-2">
            Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý.
          </p>
          <p className="text-gray-500 mb-8">
            Mã đơn hàng: <span className="font-semibold text-amber-600">{orderNumber}</span>
          </p>

          {/* Thông tin chi tiết */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md mx-auto mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Thông tin đơn hàng</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Trạng thái:</span>
                <span className="font-medium text-amber-600">Đang chờ xác nhận</span>
              </div>
              <div className="flex justify-between">
                <span>Dự kiến giao hàng:</span>
                <span className="font-medium">2-4 giờ tới</span>
              </div>
              <div className="flex justify-between">
                <span>Phương thức thanh toán:</span>
                <span className="font-medium">Thanh toán khi nhận hàng</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/orders"
              className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
            >
              Theo dõi đơn hàng
            </Link>
            <Link
              to="/products"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>

          {/* Thông tin hỗ trợ */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">Cần hỗ trợ?</h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Hotline: 1900 1234</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email: support@freshfood.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;