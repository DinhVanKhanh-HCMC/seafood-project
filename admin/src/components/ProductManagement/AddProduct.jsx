import React from 'react'
import { 
  Users, Package, ShoppingCart, Video, Gavel, 
  FileText, Plus, Edit, Trash2, Eye, Search,
  Filter, Save, X, Play, Pause, Camera,
  MessageSquare, Heart, Share, Gift
} from 'lucide-react';

const AddProduct = ({closeModal}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-5/6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Thêm sản phẩm mới</h3>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
            </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
            <input 
                type="text" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập tên sản phẩm..."
            />
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Điện thoại</option>
                <option>Laptop</option>
                <option>Tablet</option>
                <option>Phụ kiện</option>
            </select>
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán</label>
            <input 
                type="number" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
            />
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
            <input 
                type="number" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
            />
            </div>
            
            <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập mô tả sản phẩm..."
            ></textarea>
            </div>
            
            <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Package size={48} className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500">Kéo thả hình ảnh hoặc nhấn để chọn</p>
            </div>
            </div>
        </div>
        
        <div className="flex gap-3 mt-6">
            <button 
            onClick={closeModal}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
            >
            Thêm sản phẩm
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

export default AddProduct
