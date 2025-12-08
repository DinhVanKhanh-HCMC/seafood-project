import React, { useState, useEffect } from "react";
import { 
  Plus, Edit, Trash2, Eye 
} from 'lucide-react';
import ApiService from "../../services/apis";
import { toast } from "react-toastify"

const UsersPage = () => {
  const [users, setUsers] = useState([
    // { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', role: 'Khách hàng', status: 'Hoạt động' },
    // { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', role: 'Người bán', status: 'Hoạt động' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getAllUsers();
        setUsers(response.data);
      } catch (err) {
        console.error("Lỗi khi fetch:", err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      return;
    }

    try {
      // Gọi API xóa đơn hàng
      await ApiService.deleteUserById(id);
      
      // Cập nhật state local
      const updateUsers = users.filter(user => user.id !== id);
      setUsers(updateUsers);
      
      toast.success("Xóa người dùng thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      toast.error("Xóa đơn hàng thất bại!");
    }
  };


  
  // State quản lý modal cục bộ
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  
  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleCloseModal = () => {
    setShowAddUserModal(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h2>
        {/* <button 
          onClick={handleAddUser}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} /> Thêm người dùng
        </button> */}
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">STT</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tên</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Số điện thoại</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Ngày sinh</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Vai trò</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user.id} className="align-middle">
                {/* STT */}
                <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>

                {/* Avatar + Tên */}
                <td className="px-4 py-3 text-sm text-gray-900 flex items-center gap-3">
                  <img 
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span>{user.fullName}</span>
                </td>

                {/* Email */}
                <td className="px-4 py-3 text-sm text-gray-900">{user.email}</td>

                {/* Phone */}
                <td className="px-4 py-3 text-sm text-gray-900">{user.phone || "-"}</td>

                {/* Date of Birth */}
                <td className="px-4 py-3 text-sm text-gray-900">
                  {user.dateOfBirth || "-"}
                </td>

                {/* Role */}
                <td className="px-4 py-3 text-sm text-gray-900">
                  {user.role}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-800 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Modal thêm user - có thể thay bằng component riêng */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Thêm người dùng mới</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Form thêm user ở đây */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên người dùng</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên người dùng"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="customer">Khách hàng</option>
                  <option value="seller">Người bán</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;