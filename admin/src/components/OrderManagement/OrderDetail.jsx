import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Printer, Mail } from "lucide-react";
import ApiService from "../../services/apis";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const statusOptions = [
    { value: "PENDING", label: "Đang chờ xác nhận", color: "bg-yellow-100 text-yellow-800" },
    { value: "CONFIRMED", label: "Đã xác nhận", color: "bg-blue-100 text-blue-800" },
    { value: "PAID", label: "Đã thanh toán", color: "bg-green-100 text-green-800" },
    { value: "SHIPPING", label: "Đang giao hàng", color: "bg-purple-100 text-purple-800" },
    { value: "COMPLETED", label: "Đã hoàn thành", color: "bg-green-100 text-green-800" },
    { value: "CANCELLED", label: "Đã hủy", color: "bg-red-100 text-red-800" },
  ];

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      // Giả sử bạn có API lấy chi tiết đơn hàng
      const response = await ApiService.getOrderDetail(id);
      setOrder(response.data);
      setNewStatus(response.data.status);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
      toast.error("Không thể tải thông tin đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await ApiService.updateStatusOrder(id, newStatus);
      setOrder(prev => ({ ...prev, status: newStatus }));
      setEditingStatus(false);
      toast.success(response.message);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error(error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusInfo = (status) => {
    return statusOptions.find(opt => opt.value === status) || statusOptions[0];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Đang tải thông tin đơn hàng...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">Không tìm thấy đơn hàng</div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Quay lại
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Chi tiết đơn hàng</h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Printer size={18} />
            In hóa đơn
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Mail size={18} />
            Gửi email
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thông tin chính */}
        <div className="lg:col-span-2 space-y-6">
          {/* Thông tin đơn hàng */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Thông tin đơn hàng</h3>
              <div className="flex items-center gap-3">
                {!editingStatus ? (
                  <>
                    <span className={`px-3 py-1 text-sm rounded-full ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                    <button
                      onClick={() => setEditingStatus(true)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleUpdateStatus}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      Lưu
                    </button>
                    <button
                      onClick={() => {
                        setEditingStatus(false);
                        setNewStatus(order.status);
                      }}
                      className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                    >
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Mã đơn hàng:</span>
                <p className="font-semibold">{order.orderNumber}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Ngày đặt:</span>
                <p>{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Phương thức thanh toán:</span>
                <p>{order.paymentMethod || "Chưa xác định"}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Phí vận chuyển:</span>
                <p>{formatPrice(order.shippingFee || 0)}</p>
              </div>
            </div>
          </div>

          {/* Sản phẩm trong đơn hàng */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Sản phẩm</h3>
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                  <img 
                    src={item.image || "/api/placeholder/80/80"} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.weight}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.price)}</p>
                    <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                    <p className="font-medium text-gray-800">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Tổng cộng */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Tổng cộng:</span>
                <span>{formatPrice(order.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Thông tin khách hàng & vận chuyển */}
        <div className="space-y-6">
          {/* Thông tin khách hàng */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Thông tin khách hàng</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-600">Họ tên:</span>
                <p>{order.customer || "Khách vãng lai"}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Email:</span>
                <p>{order.emailCustomer || "Chưa có"}</p>
              </div>
              
            </div>
          </div>

          {/* Thông tin giao hàng */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Địa chỉ giao hàng</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-600">Địa chỉ:</span>
                <p className="whitespace-pre-line">{order.address}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Số điện thoại:</span>
                <p>{order.phoneNumber}</p>
              </div>
              {order.note && (
                <div>
                  <span className="font-medium text-gray-600">Ghi chú:</span>
                  <p className="text-gray-600 italic">{order.note}</p>
                </div>
              )}
            </div>
          </div>

          {/* Lịch sử trạng thái */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Lịch sử trạng thái</h3>
            <div className="space-y-3 text-sm">
              {/* Giả sử bạn có history trong order */}
              {order.statusHistory?.map((history, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{getStatusInfo(history.status).label}</span>
                  <span className="text-gray-500 text-xs">
                    {formatDate(history.timestamp)}
                  </span>
                </div>
              )) || (
                <div className="text-gray-500 text-center py-2">
                  Chưa có lịch sử trạng thái
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;