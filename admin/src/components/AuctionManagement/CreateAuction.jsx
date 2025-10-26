import React from 'react'
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateAuction = ({closeModal,openModal}) => {

  const navigate = useNavigate()
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Tạo phiên đấu giá mới</h3>
            <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
            </button>
        </div>
        
        <div className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
            <input 
                type="text" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập tên sản phẩm..."
            />
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá khởi điểm</label>
            <input 
                type="number" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0"
            />
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian kết thúc</label>
            <input 
                type="datetime-local" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bước giá</label>
            <input 
                type="number" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="100000"
            />
            </div>
        </div>
        
        <div className="flex gap-3 mt-6">
            <button 
            onClick={() => {
                navigate("/auction-view")
            }}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg"
            >
            Tạo phiên đấu giá
            </button>
            <button 
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg"
            >
            Hủy
            </button>
        </div>
        </div>
    </div>
  )
}

export default CreateAuction
