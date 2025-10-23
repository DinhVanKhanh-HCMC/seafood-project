// pages/PaymentSuccess.jsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../../services/apis";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        toast.error("Không tìm thấy thông tin thanh toán");
        navigate("/");
        return;
      }

      try {
        // Gọi API verify payment với Stripe
        const response = await ApiService.verifyStripePayment(sessionId);
        
        if (response.data.success) {
          
          // Clear cart
          localStorage.removeItem("cart");
          
          // Chuyển đến trang order success với thông tin order
          navigate("/order-success", {
            state: {
              orderId: response.data.orderId,
              orderNumber: response.data.orderNumber
            }
          });
        } else {
          toast.error("Thanh toán thất bại: " + response.message);
          navigate("/payment-failed");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("Lỗi xác thực thanh toán");
        navigate("/payment-failed");
      }
    };

    verifyPayment();
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Đang xác thực thanh toán...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;