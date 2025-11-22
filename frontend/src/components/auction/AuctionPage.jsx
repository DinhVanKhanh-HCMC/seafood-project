"use client"

import { useEffect, useState } from "react"
import AuctionList from "./AuctionList"
import AuctionDetail from "./AuctionDetail"
import ApiService from "../../services/apis"
import { toast } from "react-toastify"

export default function AuctionPage() {
  const [selectedAuction, setSelectedAuction] = useState(null)
  const [auctions, setAuctions] = useState([])
  const [loading, setLoading] = useState(true)

  // 🧩 Load dữ liệu từ API
  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const auctionData = await ApiService.getAllAuction();

        // Gọi thêm chi tiết sản phẩm cho từng phiên đấu giá
        const fullData = await Promise.all(
          auctionData?.data.map(async (auction) => {
            const product = await ApiService.getProductById(auction.productId);

            return {
              id: auction.id,
              title: product.data.name,
              productId: product.data.id,
              currentBid: auction.currentPrice,
              minBid: auction.currentPrice + (auction.bidStep || 0),
              bidStep: auction.bidStep,
              bidCount: auction.participantCount || (auction.bids?.length || 0),
              endTime: new Date(auction.endTime),
              timeLeft: calculateTimeLeft(auction.endTime),
              image: product.data.images?.[0] || `${import.meta.env.BASE_URL}assets/no-image.jpg`,
              seller: "Quản trị viên",
              winnerName: auction.winnerName || "Đang cập nhật",
              location: product.data.origin || "Không rõ",
              weight: product.data.weight || "Không rõ",
              grade: product.data.inAuction ? "Đang đấu giá" : "Hàng bán lẻ",
              status: auction.status === "ACTIVE" ? "live" : auction.status === "PENDING" ? "upcoming" : "ended",
              description: product.data.description || "Không có mô tả.",
              bidHistory:
                (auction.bids
                  ?.filter(b => b.bidTime || b.createdAt)
                  .map((b) => ({
                    bidder: b.userId || "Ẩn danh",
                    amount: b.amount,
                    time: b.bidTime || b.createdAt,
                  }))
                  .sort((a, b) => new Date(b.time) - new Date(a.time))
                ) || [],
              category: product.data.categoryName || "Chưa phân loại",
              freshness: product.data.inStock ? "Còn hàng" : "Hết hàng",
              origin: product.data.origin,
            };
          })
        );

        setAuctions(fullData);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAuctions();
  }, []);

  const calculateTimeLeft = (endTime) => {
    const diff = new Date(endTime) - new Date();
    if (diff <= 0) return "Đã kết thúc";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handlePlaceBid = (auctionId, bidAmount) => {
    setAuctions(prevAuctions => 
      prevAuctions.map(auction => {
        if (auction.id === auctionId) {
          const updatedAuction = {
            ...auction,
            currentBid: bidAmount,
            bidCount: auction.bidCount + 1,
            bidHistory: [
              { bidder: "Bạn", amount: bidAmount, time: "Vừa xong" },
              ...auction.bidHistory
            ]
          }
          if (selectedAuction && selectedAuction.id === auctionId) {
            setSelectedAuction(updatedAuction)
          }
          return updatedAuction
        }
        return auction
      })
    )
    return true
  }

  const handleSelectAuction = (auction) => {
    setSelectedAuction(auction)
  }

  const handleBackToList = () => {
    setSelectedAuction(null)
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-gray-500">Đang tải dữ liệu...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {selectedAuction ? (
        <AuctionDetail 
          auction={selectedAuction}
          onBack={handleBackToList}
          onPlaceBid={handlePlaceBid}
        />
      ) : (
        <AuctionList 
          auctions={auctions}
          onSelectAuction={handleSelectAuction}
        />
      )}

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-100/30 to-transparent rounded-full transform rotate-12"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-cyan-100/30 to-transparent rounded-full transform -rotate-12"></div>
      </div>
    </div>
  )
}
