import React from 'react'
import { X } from 'lucide-react'

const AddUser = ({closeModal}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Thêm người dùng mới</h3>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
            </button>
        </div>
        
        <div className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
            <input 
                type="text" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập họ tên..."
            />
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
                type="email" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập email..."
            />
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input 
                type="tel" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập số điện thoại..."
            />
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Khách hàng</option>
                <option>Người bán</option>
                <option>Quản trị viên</option>
            </select>
            </div>
        </div>
        
        <div className="flex gap-3 mt-6">
            <button 
            onClick={closeModal}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
            >
            Thêm người dùng
            </button>
            <button 
            onClick={closeModal}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg"
            >
            Hủy
            </button>
        </div>
        </div>
    </div>
  )
}

export default AddUser
