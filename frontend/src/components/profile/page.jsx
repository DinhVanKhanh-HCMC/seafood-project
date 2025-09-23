
import { useState } from "react"


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    phone: "0123456789",
    avatar: "https://seafood-project-1306.s3.ap-southeast-1.amazonaws.com/default-avt.png",
    dateOfBirth: "1990-05-15",
    gender: "male",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    memberSince: "2022-03-15",
  })

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Địa chỉ nhà",
      fullName: "Nguyễn Văn An",
      phone: "0123456789",
      address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
      isDefault: true,
    },
    {
      id: 2,
      name: "Địa chỉ công ty",
      fullName: "Nguyễn Văn An",
      phone: "0123456789",
      address: "456 Đường DEF, Phường GHI, Quận 3, TP.HCM",
      isDefault: false,
    },
  ])

  const orders = [
    {
      id: "DH001",
      date: "2024-01-15",
      status: "Đã giao",
      total: 2500000,
      items: [
        { name: "Cá Hồi Atlantic 2kg", quantity: 1, price: 1200000 },
        { name: "Tôm Hùm Maine 1kg", quantity: 1, price: 1300000 },
      ],
    },
    {
      id: "DH002",
      date: "2024-01-10",
      status: "Đang vận chuyển",
      total: 1800000,
      items: [{ name: "Cá Ngừ Vây Xanh 1.5kg", quantity: 1, price: 1800000 }],
    },
    {
      id: "DH003",
      date: "2024-01-05",
      status: "Đã hủy",
      total: 950000,
      items: [{ name: "Cua Hoàng Đế 1kg", quantity: 1, price: 950000 }],
    },
  ]

  const auctionHistory = [
    {
      id: "DG001",
      title: "Cá Hồi Atlantic Cao Cấp - 50kg",
      date: "2024-01-12",
      status: "Thắng",
      finalBid: 3750000,
      myBid: 3750000,
      image: "/auction-premium-atlantic-salmon-50lbs.png",
    },
    {
      id: "DG002",
      title: "Tôm Hùm Maine - 24 con",
      date: "2024-01-08",
      status: "Thua",
      finalBid: 2800000,
      myBid: 2700000,
      image: "/auction-maine-lobster-lot-24pieces.png",
    },
    {
      id: "DG003",
      title: "Cá Ngừ Vây Xanh - 20kg",
      date: "2024-01-03",
      status: "Đang đấu giá",
      currentBid: 6300000,
      myBid: 6100000,
      image: "/auction-yellowfin-tuna-steaks-20lbs.png",
    },
  ]

  const watchlist = [
    {
      id: 1,
      name: "Cá Hồi Na Uy Phi Lê",
      price: 599000,
      image: "/fresh-atlantic-salmon-fillet.png",
      inStock: true,
    },
    {
      id: 2,
      name: "Tôm Hùm Canada",
      price: 1299000,
      image: "/fresh-maine-lobster.png",
      inStock: false,
    },
    {
      id: 3,
      name: "Cua Hoàng Đế Alaska",
      price: 2199000,
      image: "/fresh-king-crab-legs.png",
      inStock: true,
    },
  ]

  const tabs = [
    { id: "profile", label: "Thông tin cá nhân", icon: "👤" },
    { id: "orders", label: "Đơn hàng", icon: "📦" },
    { id: "auctions", label: "Đấu giá", icon: "🔨" },
    { id: "watchlist", label: "Yêu thích", icon: "❤️" },
    { id: "addresses", label: "Địa chỉ", icon: "📍" },
    { id: "settings", label: "Cài đặt", icon: "⚙️" },
  ]

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    alert("Cập nhật thông tin thành công!")
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã giao":
      case "Thắng":
        return "bg-green-100 text-green-800"
      case "Đang vận chuyển":
      case "Đang đấu giá":
        return "bg-blue-100 text-blue-800"
      case "Đã hủy":
      case "Thua":
        return "bg-red-100 text-red-800"
      default:
        return "bg-neutral-100 text-neutral-800"
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Tài khoản của tôi</h1>
          <p className="text-neutral-600">Quản lý thông tin cá nhân và hoạt động mua sắm</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-8">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-neutral-200">
                <img
                  src={profileData.avatar || "/placeholder.svg"}
                  alt={profileData.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
                <h3 className="font-semibold text-neutral-900">{profileData.name}</h3>
                <p className="text-sm text-neutral-600">{profileData.email}</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Thành viên từ {new Date(profileData.memberSince).toLocaleDateString("vi-VN")}
                </p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900">Thông tin cá nhân</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                    >
                      {isEditing ? "Hủy" : "Chỉnh sửa"}
                    </button>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Họ và tên</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-neutral-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-neutral-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Số điện thoại</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-neutral-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Ngày sinh</label>
                        <input
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-neutral-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Giới tính</label>
                        <select
                          value={profileData.gender}
                          onChange={(e) => handleInputChange("gender", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-neutral-50"
                        >
                          <option value="male">Nam</option>
                          <option value="female">Nữ</option>
                          <option value="other">Khác</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Địa chỉ</label>
                      <textarea
                        value={profileData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-neutral-50"
                      />
                    </div>

                    {isEditing && (
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                        >
                          Lưu thay đổi
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="border border-neutral-300 text-neutral-700 px-6 py-2 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
                        >
                          Hủy
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Lịch sử đơn hàng</h2>
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-neutral-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-neutral-900">Đơn hàng #{order.id}</h3>
                            <p className="text-sm text-neutral-600">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                            <p className="text-lg font-bold text-neutral-900 mt-1">{order.total.toLocaleString()}₫</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-neutral-700">
                                {item.name} x{item.quantity}
                              </span>
                              <span className="font-medium">{item.price.toLocaleString()}₫</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-3 mt-4">
                          <button className="border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
                            Xem chi tiết
                          </button>
                          {order.status === "Đã giao" && (
                            <button className="border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
                              Mua lại
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Auctions Tab */}
              {activeTab === "auctions" && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Lịch sử đấu giá</h2>
                  <div className="space-y-6">
                    {auctionHistory.map((auction) => (
                      <div key={auction.id} className="border border-neutral-200 rounded-xl p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={auction.image || "/placeholder.svg"}
                            alt={auction.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-neutral-900">{auction.title}</h3>
                                <p className="text-sm text-neutral-600">{auction.date}</p>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(auction.status)}`}
                              >
                                {auction.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-neutral-600">Giá của tôi:</span>
                                <span className="ml-2 font-medium">{auction.myBid.toLocaleString()}₫</span>
                              </div>
                              <div>
                                <span className="text-neutral-600">
                                  {auction.status === "Đang đấu giá" ? "Giá hiện tại:" : "Giá cuối:"}
                                </span>
                                <span className="ml-2 font-medium">
                                  {(auction.finalBid || auction.currentBid).toLocaleString()}₫
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-3 mt-4">
                              <button className="border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
                                Xem chi tiết
                              </button>
                              {auction.status === "Đang đấu giá" && (
                                <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
                                  Đấu giá tiếp
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Watchlist Tab */}
              {activeTab === "watchlist" && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Sản phẩm yêu thích</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {watchlist.map((item) => (
                      <div key={item.id} className="border border-neutral-200 rounded-xl overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-neutral-900 mb-2">{item.name}</h3>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-bold text-amber-600">{item.price.toLocaleString()}₫</span>
                            <span
                              className={`text-sm px-2 py-1 rounded ${
                                item.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.inStock ? "Còn hàng" : "Hết hàng"}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="flex-1 bg-amber-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
                              Mua ngay
                            </button>
                            <button className="px-3 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors">
                              ✕
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900">Sổ địa chỉ</h2>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors">
                      Thêm địa chỉ mới
                    </button>
                  </div>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border border-neutral-200 rounded-xl p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-neutral-900">{address.name}</h3>
                              {address.isDefault && (
                                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                                  Mặc định
                                </span>
                              )}
                            </div>
                            <p className="text-neutral-900 font-medium">{address.fullName}</p>
                            <p className="text-neutral-600">{address.phone}</p>
                            <p className="text-neutral-600">{address.address}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="border border-neutral-300 text-neutral-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
                              Sửa
                            </button>
                            <button className="border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Cài đặt tài khoản</h2>
                  <div className="space-y-8">
                    {/* Security Settings */}
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Bảo mật</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-neutral-900">Đổi mật khẩu</h4>
                            <p className="text-sm text-neutral-600">Cập nhật mật khẩu để bảo mật tài khoản</p>
                          </div>
                          <button className="border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg font-medium hover:bg-neutral-50 transition-colors">
                            Đổi mật khẩu
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-neutral-900">Xác thực 2 bước</h4>
                            <p className="text-sm text-neutral-600">Tăng cường bảo mật với xác thực 2 bước</p>
                          </div>
                          <button className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors">
                            Kích hoạt
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Notification Settings */}
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Thông báo</h3>
                      <div className="space-y-4">
                        {[
                          {
                            id: "email",
                            label: "Thông báo qua Email",
                            description: "Nhận thông báo về đơn hàng và khuyến mãi",
                          },
                          {
                            id: "sms",
                            label: "Thông báo qua SMS",
                            description: "Nhận tin nhắn về trạng thái đơn hàng",
                          },
                          { id: "push", label: "Thông báo đẩy", description: "Nhận thông báo trên ứng dụng di động" },
                          {
                            id: "auction",
                            label: "Thông báo đấu giá",
                            description: "Nhận thông báo về các phiên đấu giá",
                          },
                        ].map((setting) => (
                          <div
                            key={setting.id}
                            className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                          >
                            <div>
                              <h4 className="font-medium text-neutral-900">{setting.label}</h4>
                              <p className="text-sm text-neutral-600">{setting.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Account Actions */}
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Tài khoản</h3>
                      <div className="space-y-4">
                        <button className="w-full flex items-center justify-between p-4 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors">
                          <span>Tải xuống dữ liệu cá nhân</span>
                          <span>→</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-4 border border-red-300 rounded-lg text-red-700 hover:bg-red-50 transition-colors">
                          <span>Xóa tài khoản</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
