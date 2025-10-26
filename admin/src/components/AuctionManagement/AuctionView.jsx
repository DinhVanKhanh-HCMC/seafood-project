import React,{useState,useEffect} from 'react'
import { 
  Users, Package, ShoppingCart, Video, Gavel, 
  FileText, Plus, Edit, Trash2, Eye, Search,
  Filter, Save, X, Play, Pause, Camera,
  MessageSquare, Heart, Share, Gift
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuctionView = ({closeModal}) => {
    const [auctionTime, setAuctionTime] = useState(300);
    const navigate = useNavigate()

    const [auctionBids, setAuctionBids] = useState([
        { id: 1, user: 'Nguyễn Đê La Thành', amount: '28.000.000', time: '14:10' },
        { id: 2, user: 'Trần E', amount: '28.500.000', time: '14:12' },
        { id: 3, user: 'Lê F', amount: '29.000.000', time: '14:15' },
      ]);
    
    useEffect(() => {
        if (auctionTime > 0) {
            const timer = setInterval(() => {
            setAuctionTime(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [auctionTime]);
    
    const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
    };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl h-5/6 flex">
        <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Phiên đấu giá: iPhone 15 Pro Max</h3>
            <button onClick={() => navigate("/auctions")} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
            </button>
            </div>
            
            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
            <div className="text-center text-gray-500">
                <Package size={64} className="mx-auto mb-2" />
                <p>Hình ảnh sản phẩm</p>
            </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Giá hiện tại</h4>
                <p className="text-3xl font-bold text-green-600">29.000.000đ</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Thời gian còn lại</h4>
                <p className="text-3xl font-bold text-red-600">{formatTime(auctionTime)}</p>
            </div>
            </div>
            
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Đặt giá mới</label>
                <div className="flex gap-2">
                <input 
                    type="number" 
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="29.100.000"
                    min="29100000"
                />
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg">
                    Đặt giá
                </button>
                </div>
            </div>
            
            <div className="flex gap-3">
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                Kết thúc đấu giá
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                Gia hạn thời gian
                </button>
            </div>
            </div>
        </div>
        
        <div className="w-80 border-l bg-gray-50 p-6">
            <h4 className="font-bold text-lg mb-4">Lịch sử đặt giá</h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
            {auctionBids.map((bid) => (
                <div key={bid.id} className="bg-white p-3 rounded-lg border">
                <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-blue-600">{bid.user}</span>
                    <span className="text-xs text-gray-500">{bid.time}</span>
                </div>
                <p className="font-bold text-green-600">{bid.amount}đ</p>
                </div>
            ))}
            </div>
            
            <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h5 className="font-medium text-yellow-800 mb-1">Thông tin đấu giá</h5>
            <p className="text-sm text-yellow-700">Số lượng: 1</p>
            <p className="text-sm text-yellow-700">Bước giá: 100.000đ</p>
            <p className="text-sm text-yellow-700">Người tham gia: {auctionBids.length}</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AuctionView
