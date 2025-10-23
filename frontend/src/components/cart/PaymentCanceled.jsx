// pages/PaymentCanceled.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentCanceled = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Quay lại trang giỏ hàng sau 2 giây
    setTimeout(() => {
      navigate("/cart");
    }, 2000);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán đã bị hủy</h1>
        <p className="text-gray-600">Đang chuyển hướng về giỏ hàng...</p>
      </div>
    </div>
  );
};

export default PaymentCanceled;