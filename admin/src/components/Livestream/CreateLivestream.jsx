import React from 'react'
import { X } from 'lucide-react';

const CreateLivestream = ({openModal,closeModal}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Tạo livestream mới</h3>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
            </button>
        </div>
        
        <div className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
            <input 
                type="text" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập tiêu đề livestream..."
            />
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập mô tả..."
            ></textarea>
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian bắt đầu</label>
            <input 
                type="datetime-local" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            </div>
        </div>
        
        <div className="flex gap-3 mt-6">
            <button 
            onClick={() => {
                closeModal();
                openModal('livestream-view');
            }}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
            Bắt đầu phát trực tiếp
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

export default CreateLivestream
