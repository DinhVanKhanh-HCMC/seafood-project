import React,{useState} from 'react'
import { 
  Users, Package, ShoppingCart, Video, Gavel, 
  FileText, Plus, Edit, Trash2, Eye, Search,
  Filter, Save, X, Play, Pause, Camera,
  MessageSquare, Heart, Share, Gift
} from 'lucide-react';


 
 

const LivestreamView = ({closeModal}) => {
    const [chatMessages, setChatMessages] = useState([
        { id: 1, user: 'Nguyễn A', message: 'Sản phẩm này có bảo hành không?', time: '14:15' },
        { id: 2, user: 'Trần B', message: 'Giá tốt quá!', time: '14:16' },
        { id: 3, user: 'Lê C', message: 'Còn hàng không shop?', time: '14:17' },
      ]);
    
    const [newMessage, setNewMessage] = useState('');
    
    const [livestreamActive, setLivestreamActive] = useState(false);
    const [livestreamViews, setLivestreamViews] = useState(0);

    const startLivestream = () => {
        setLivestreamActive(true);
        setLivestreamViews(Math.floor(Math.random() * 1000) + 500);
    };

    const stopLivestream = () => {
        setLivestreamActive(false);
        setLivestreamViews(0);
    };

    const sendMessage = () => {
        if (newMessage.trim()) {
        const newMsg = {
            id: chatMessages.length + 1,
            user: 'Admin',
            message: newMessage,
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages([...chatMessages, newMsg]);
        setNewMessage('');
        }
    };
  return (
    
    <div className="fixed inset-0 bg-black z-50">
        <div className="h-full flex">
        <div className="flex-1 relative">
            <div className="absolute top-4 left-4 z-10 flex gap-4">
            <button 
                onClick={closeModal}
                className="bg-black bg-opacity-50 text-white p-2 rounded-lg hover:bg-opacity-70"
            >
                <X size={24} />
            </button>
            
            <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span>ĐANG PHÁT TRỰC TIẾP</span>
            </div>
            
            <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                <span>{livestreamViews.toLocaleString()} người xem</span>
            </div>
            </div>

            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
                <Camera size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl">Livestream Video Feed</p>
                <p className="text-gray-400">Camera sẽ hiển thị ở đây</p>
            </div>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button 
                onClick={livestreamActive ? stopLivestream : startLivestream}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                livestreamActive 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
            >
                {livestreamActive ? <Pause size={20} /> : <Play size={20} />}
                {livestreamActive ? 'Dừng phát' : 'Bắt đầu phát'}
            </button>
            </div>
        </div>

        <div className="w-80 bg-white flex flex-col">
            <div className="p-4 border-b">
            <h3 className="font-bold text-lg">Chat trực tiếp</h3>
            <p className="text-sm text-gray-600">{chatMessages.length} tin nhắn</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
                <div key={msg.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-sm text-blue-600">{msg.user}</span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                </div>
                <p className="text-sm text-gray-800">{msg.message}</p>
                </div>
            ))}
            </div>
            
            <div className="p-4 border-t">
            <div className="flex gap-2">
                <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button 
                onClick={sendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                Gửi
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default LivestreamView
