import React,{useState} from "react";
import {Plus, Eye, Edit, Trash2 } from "lucide-react";

const OrdersTab = ({openModal }) => {
  const [orders] = useState([
      { id: 1, customer: 'Nguyễn Văn A', total: '29.990.000', status: 'Đã giao', date: '2024-03-15' },
      { id: 2, customer: 'Trần Thị B', total: '25.990.000', status: 'Đang xử lý', date: '2024-03-16' },
    ]);
  return (
    <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h2>
            <button 
              onClick={() => openModal('add-order')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={20} /> Thêm đơn hàng
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Khách hàng</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tổng tiền</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Ngày đặt</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.total}đ</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'Đã giao' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  );
};

export default OrdersTab;
