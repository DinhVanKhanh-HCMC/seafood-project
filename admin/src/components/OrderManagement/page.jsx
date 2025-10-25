import React, { useState, useEffect } from "react";
import { Plus, Eye, Edit, Trash2, Filter } from "lucide-react";
import ApiService from "../../services/apis";
import { toast } from "react-toastify";

const OrdersTab = ({ openModal }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [editingOrder, setEditingOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const statusOptions = [
    { value: "ALL", label: "Tất cả trạng thái" },
    { value: "PENDING", label: "Đang chờ xác nhận" },
    { value: "CONFIRMED", label: "Đã xác nhận" },
    { value: "PAID", label: "Đã thanh toán" },
    { value: "SHIPPING", label: "Đang giao hàng" },
    { value: "COMPLETED", label: "Đã hoàn thành" },
    { value: "CANCELLED", label: "Đã hủy" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getAllOrder();
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (err) {
        console.error("Lỗi khi fetch:", err);
      }
    };
    fetchData();
  }, []);

  // Lọc đơn hàng theo trạng thái
  useEffect(() => {
    if (statusFilter === "ALL") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => order.status === statusFilter);
      setFilteredOrders(filtered);
    }
  }, [statusFilter, orders]);

  const getStatusColor = (status) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-blue-100 text-blue-800",
      PAID: "bg-green-100 text-green-800",
      SHIPPING: "bg-purple-100 text-purple-800",
      COMPLETED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status) => {
    const texts = {
      PENDING: "Đang chờ xác nhận",
      CONFIRMED: "Đã xác nhận",
      PAID: "Đã thanh toán",
      SHIPPING: "Đang giao hàng",
      COMPLETED: "Đã hoàn thành",
      CANCELLED: "Đã hủy",
    };
    return texts[status] || status;
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Hàm mở modal sửa trạng thái
  const handleEditStatus = (order) => {
    setEditingOrder(order);
    setNewStatus(order.status);
  };

  // Hàm cập nhật trạng thái
  const handleUpdateStatus = async () => {
    if (!editingOrder || !newStatus) return;

    try {
      // Gọi API cập nhật trạng thái
      const response = await ApiService.updateStatusOrder(editingOrder.id, newStatus);
      
      // Cập nhật state local
      const updatedOrders = orders.map(order =>
        order.id === editingOrder.id ? { ...order, status: newStatus } : order
      );
      
      setOrders(updatedOrders);
      setEditingOrder(null);
      setNewStatus("");
      toast.success(response.message);
      
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error(error);
    }
  };

  // Hàm xóa đơn hàng
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      return;
    }

    try {
      // Gọi API xóa đơn hàng
      await ApiService.deleteOrder(orderId);
      
      // Cập nhật state local
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      
      alert("Xóa đơn hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      alert("Xóa đơn hàng thất bại!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header với nút thêm và bộ lọc */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h2>
        <button 
          onClick={() => openModal('add-order')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} /> Thêm đơn hàng
        </button>
      </div>

      {/* Bộ lọc trạng thái */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Filter size={18} />
            <span className="font-medium">Lọc theo trạng thái:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">
            Hiển thị {filteredOrders.length} đơn hàng
          </span>
        </div>
      </div>
      
      {/* Bảng đơn hàng */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Mã đơn</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Khách hàng</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tổng tiền</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Trạng thái</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Ngày đặt</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.orderNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.customer || "Khách vãng lai"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatPrice(order.totalPrice)}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditStatus(order)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Sửa trạng thái"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteOrder(order.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Xóa đơn hàng"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Không có đơn hàng nào phù hợp với bộ lọc
          </div>
        )}
      </div>

      {/* Modal sửa trạng thái */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Cập nhật trạng thái đơn hàng</h3>
            <p className="text-sm text-gray-600 mb-2">
              Mã đơn: <span className="font-medium">{editingOrder.orderNumber}</span>
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái mới
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.filter(opt => opt.value !== "ALL").map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setEditingOrder(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTab;