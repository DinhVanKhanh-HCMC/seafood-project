import React,{useState, useEffect} from "react";
import { Plus, Eye, Edit, Trash2, Gavel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/apis";
import { toast } from "react-toastify";

const AuctionsTab = () => {
  const [auctions, setAuctions] = useState([
      // { id: 1, item: 'iPhone 15 Pro Max', currentBid: '28.000.000', timeLeft: '2h 30m', status: 'Đang đấu giá' },
      // { id: 2, item: 'MacBook Pro M3', currentBid: '45.000.000', timeLeft: 'Đã kết thúc', status: 'Đã kết thúc' },
  ]);

  useEffect(() => {
      const loadAuctions = async () => {
        try {
          const auctionData = await ApiService.getAllAuction();
  
          // Gọi thêm chi tiết sản phẩm cho từng phiên đấu giá
          
  
          setAuctions(auctionData.data);
        } catch (error) {
          toast.error(error);
        }
      };
  
      loadAuctions();
    }, []);

  function formatDateTimeVN(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  const navigate = useNavigate();
  return (
    <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Quản lý đấu giá</h2>
                <button 
                  onClick={() => navigate("/create-auction")}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Gavel size={20} /> Tạo phiên đấu giá
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">STT</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Sản phẩm</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Giá hiện tại</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Bắt đầu</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Kết thúc</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Trạng thái</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {auctions.map((auction, index) => (
                      <tr key={auction.id}>
                        <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{auction.productName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{auction.currentPrice}đ</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatDateTimeVN(auction.startTime)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatDateTimeVN(auction.endTime)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            auction.status === 'Đang đấu giá' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {auction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => navigate(`/auction-view/${auction.id}`)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Eye size={16} />
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

export default AuctionsTab;
