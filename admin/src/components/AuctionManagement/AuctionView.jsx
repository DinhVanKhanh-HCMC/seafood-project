import React,{useState,useEffect} from 'react'
import { 
  Users, Package, ShoppingCart, Video, Gavel, 
  FileText, Plus, Edit, Trash2, Eye, Search,
  Filter, Save, X, Play, Pause, Camera,
  MessageSquare, Heart, Share, Gift
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminAuctionWebSocketService from '../../services/AdminAuctionWebSocketService';
import ApiService from '../../services/apis';
import { toast } from 'react-toastify';

const AuctionView = ({closeModal}) => {
    const { id } = useParams();
    const [auctionTime, setAuctionTime] = useState(0);
    const navigate = useNavigate();
    const [auction, setAuction] = useState(null);
    const [auctionBids, setAuctionBids] = useState([]);
    const [bidAmount, setBidAmount] = useState('');
    const [loading, setLoading] = useState(true);

    // const [auctionBids, setAuctionBids] = useState([
    //     { id: 1, user: 'Nguyễn Đê La Thành', amount: '28.000.000', time: '14:10' },
    //     { id: 2, user: 'Trần E', amount: '28.500.000', time: '14:12' },
    //     { id: 3, user: 'Lê F', amount: '29.000.000', time: '14:15' },
    //   ]);
    
    // useEffect(() => {
    //     if (auctionTime > 0) {
    //         const timer = setInterval(() => {
    //         setAuctionTime(prev => prev - 1);
    //         }, 1000);
    //         return () => clearInterval(timer);
    //     }
    // }, [auctionTime]);

    // useEffect(() => {
    //     if (id) {
    //         setupWebSocket();
    //         fetchAuctionDetail();
    //     }

    //     return () => {
    //         AdminAuctionWebSocketService.disconnect();
    //     };
    // }, [id]);

    useEffect(() => {
        let mounted = true;

        const init = async () => {
            await fetchAuctionDetail();

            if (mounted && id) {
                AdminAuctionWebSocketService.connect(id);
                setupWebSocketListeners();
            }
        };

        init();

        return () => {
            mounted = false;
            AdminAuctionWebSocketService.disconnect();
        };
    }, [id]);

    const setupWebSocketListeners = () => {
        AdminAuctionWebSocketService.onMessage('newBid', (message) => {
            console.log('New bid received:', message);
            const newBid = {
                id: message.bid.id || Date.now().toString(),
                userId: message.bid.userId,
                userName: message.bid.userName,
                amount: message.bid.amount, // giữ nguyên số, format ở chỗ hiển thị
                bidTime: message.bid.bidTime
            };
            setAuctionBids(prev => [newBid, ...prev]);
            setAuction(prev => ({
                ...prev,
                currentPrice: message.currentPrice,
                participantCount: message.participantCount
            }));
        });

        AdminAuctionWebSocketService.onMessage('auctionEnded', (message) => {
            toast.success(`🎉 Đấu giá đã kết thúc! Người thắng: ${message.winnerName} với giá ${formatPrice(message.finalPrice)}`);
            setAuction(prev => ({
                ...prev,
                status: 'COMPLETED',
                winnerName: message.winnerName
            }));
            setAuctionTime(-2);
        });

        AdminAuctionWebSocketService.onMessage('timeExtended', (message) => {
            toast.success(`⏰ Đã gia hạn thời gian thêm ${message.additionalMinutes} phút`);
            setAuctionTime(prev => prev + (message.additionalMinutes * 60));
        });

        AdminAuctionWebSocketService.onMessage('joinedAuction', (message) => {
            console.log('Admin successfully joined auction:', message.auctionId);
        });

        AdminAuctionWebSocketService.onMessage('error', (message) => {
            toast.error(`Lỗi: ${message.message}`);
        });
    };



    const fetchAuctionDetail = async () => {
        try {
            setLoading(true);
            const response = await ApiService.getAuctionById(id);
            const auctionData = response.data;

            const sortedBids = (auctionData.bids || []).sort(
            (a, b) => new Date(b.bidTime) - new Date(a.bidTime)
            );

            setAuction(auctionData);
            setAuctionBids(sortedBids || []);

            // ✅ Kiểm tra trạng thái trước khi tính thời gian
            if (auctionData.status === "COMPLETED") {
            setAuctionTime(-2); // Đã kết thúc
            return;
            }

            if (auctionData.startTime && auctionData.endTime) {
            const startTime = new Date(auctionData.startTime).getTime();
            const endTime = new Date(auctionData.endTime).getTime();
            const now = new Date().getTime();

            if (now < startTime) {
                setAuctionTime(-1); // Chưa bắt đầu
            } else if (now >= endTime) {
                setAuctionTime(-2); // Đã kết thúc (quá hạn)
            } else {
                // Đang diễn ra, tính thời gian còn lại
                const timeLeft = Math.floor((endTime - now) / 1000);
                setAuctionTime(timeLeft);
            }
            }
        } catch (error) {
            console.error('Error fetching auction:', error);
            toast.error('Không thể tải thông tin đấu giá');
        } finally {
            setLoading(false);
        }
    };


    const handleEndAuction = async () => {
        if (!window.confirm('Bạn có chắc chắn muốn kết thúc đấu giá này?')) {
            return;
        }

        try {
            // Gọi API kết thúc đấu giá
            await ApiService.endAuction(id);
            // WebSocket sẽ nhận message 'auctionEnded' và cập nhật UI
            setAuctionTime(-2)
        } catch (error) {
            console.error('Error ending auction:', error);
            toast.error(error.message || 'Kết thúc đấu giá thất bại');
        }
    };

    const handleExtendTime = async () => {
        const additionalMinutes = 10; // Gia hạn 10 phút
        if (!window.confirm(`Bạn có muốn gia hạn đấu giá thêm ${additionalMinutes} phút?`)) {
            return;
        }

        try {
            // Gửi message qua WebSocket để gia hạn
            AdminAuctionWebSocketService.extendTime(id, additionalMinutes);
        } catch (error) {
            console.error('Error extending time:', error);
            toast.error('Gia hạn thời gian thất bại');
        }
    };

    const handlePlaceBid = async (e) => {
        e.preventDefault();
        if (!bidAmount) {
            toast.error('Vui lòng nhập số tiền đấu giá');
            return;
        }

        try {
            const bidData = {
                amount: parseFloat(bidAmount),
                userId: 'admin', // ID của admin
                userName: 'Quản trị viên'
            };

            await ApiService.placeBid(id, bidData);
            setBidAmount('');
        } catch (error) {
            console.error('Error placing bid:', error);
            toast.error(error.message || 'Đấu giá thất bại');
        }
    };

    const formatTime = (seconds) => {
        if (seconds <= 0) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    // Timer countdown
    useEffect(() => {
        if (auctionTime > 0) {
            const timer = setInterval(() => {
                setAuctionTime(prev => Math.max(0, prev - 1));
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [auctionTime]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8">
                    <div className="text-center">Đang tải...</div>
                </div>
            </div>
        );
    }

    if (!auction) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8">
                    <div className="text-center">Không tìm thấy đấu giá</div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl h-5/6 flex">
                <div className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold">Phiên đấu giá: {auction.productName}</h3>
                        <button 
                            onClick={closeModal || (() => navigate("/auctions"))} 
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    
                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                        {auction.productImage ? (
                            <img 
                                src={auction.productImage} 
                                alt={auction.productName}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ) : (
                            <div className="text-center text-gray-500">
                                <Package size={64} className="mx-auto mb-2" />
                                <p>Hình ảnh sản phẩm</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold text-lg mb-2">Giá hiện tại</h4>
                            <p className="text-3xl font-bold text-green-600">
                                {formatPrice(auction.currentPrice)}
                            </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold text-lg mb-2">Thời gian còn lại</h4>
                            <p className="text-3xl font-bold text-red-600">
                                {auctionTime === -1
                                    ? "Chưa bắt đầu"
                                    : auctionTime === -2 
                                    ? "Đã kết thúc" 
                                    : formatTime(auctionTime)}
                                </p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Đặt giá mới (Admin)
                            </label>
                            <div className="flex gap-2">
                                <input 
                                    type="number" 
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                                    placeholder={formatPrice(auction.currentPrice + (auction.bidStep || 100000))}
                                    min={auction.currentPrice + (auction.bidStep || 100000)}
                                />
                                <button 
                                    onClick={handlePlaceBid}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg
                                    disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    disabled={auctionTime === 0 || auctionTime === -1 || auctionTime === -2}
                                >
                                    Đặt giá
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                            <button 
                                onClick={handleEndAuction}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg 
                                disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={auctionTime === 0 || auctionTime === -1 || auctionTime === -2}
                            >
                                Kết thúc đấu giá
                            </button>
                            <button 
                                onClick={handleExtendTime}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg
                                disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={auctionTime === 0 || auctionTime === -1 || auctionTime === -2}
                            >
                                Gia hạn thời gian (+10 phút)
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="w-80 border-l bg-gray-50 p-6">
                    <h4 className="font-bold text-lg mb-4">Lịch sử đặt giá</h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {auctionBids.map((bid, index) => (
                            <div key={bid.id || index} className="bg-white p-3 rounded-lg border">
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`font-medium ${
                                        bid.userName === 'Quản trị viên' ? 'text-purple-600' : 'text-blue-600'
                                    }`}>
                                        {bid.userName}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(bid.bidTime).toLocaleTimeString('vi-VN', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <p className="font-bold text-green-600">{formatPrice(bid.amount)}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h5 className="font-medium text-yellow-800 mb-1">Thông tin đấu giá</h5>
                        <p className="text-sm text-yellow-700">Số lượng: 1</p>
                        <p className="text-sm text-yellow-700">Bước giá: {formatPrice(auction.bidStep || 100000)}</p>
                        <p className="text-sm text-yellow-700">Lượt đấu: {auction.participantCount || auctionBids.length}</p>
                        <p className="text-sm text-yellow-700">Trạng thái: {auction.status}</p>
                        <p className="text-sm text-yellow-700">Người thắng: {auction.winnerName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuctionView
