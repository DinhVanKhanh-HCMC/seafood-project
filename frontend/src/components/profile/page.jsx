
import { useState, useEffect } from "react"
import ApiService from "../../services/apis";
import { User, Mail, Phone, Building, Calendar, Edit, Save, X, Camera, Shield, Clock } from 'lucide-react'
import { toast } from "react-toastify"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [avatarFile, setAvatarFile] = useState(null);
  const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [nameAddress, setNameAddress] = useState('');
  const [phoneAddress, setPhoneAddress] = useState('');
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [changePasswordPopupOpen, setChangePasswordPopupOpen] = useState(false);
  const [errors, setErrors] = useState([])
  const [profileData, setProfileData] = useState({
    // name: "Nguyễn Văn An",
    // email: "nguyenvanan@email.com",
    // phone: "0123456789",
    // avatar: "https://seafood-project-1306.s3.ap-southeast-1.amazonaws.com/default-avt.png",
    // dateOfBirth: "1990-05-15",
    // gender: "male",
    // address: "123 Đường ABC, Quận 1, TP.HCM",
    // memberSince: "2022-03-15",
  })
  const [changePasswordData, setChangePasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // gọi API lấy tất cả sản phẩm
        const response = await ApiService.getCurrentUser();
        setProfileData(response.data);

      } catch (err) {
        console.error("Lỗi khi fetch:", err);
      }
    };

    fetchCurrentUser();
  }, []);

  const fetchAddress = async () => {
    try {
      const response = await ApiService.getAddressByUserId(profileData.id);
      setAddresses(response.data);
    } catch (err) {
      console.error("Lỗi khi fetch:", err);
    }
  };

  useEffect(() => {
    if (profileData?.id) {
      fetchAddress();
    }
  }, [profileData]);

  const [addresses, setAddresses] = useState([
    // {
    //   id: 1,
    //   name: "Địa chỉ nhà",
    //   fullName: "Nguyễn Văn An",
    //   phone: "0123456789",
    //   address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
    //   isDefault: true,
    // },
    // {
    //   id: 2,
    //   name: "Địa chỉ công ty",
    //   fullName: "Nguyễn Văn An",
    //   phone: "0123456789",
    //   address: "456 Đường DEF, Phường GHI, Quận 3, TP.HCM",
    //   isDefault: false,
    // },
  ])

  // Load provinces khi component mount
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const provincesData = await ApiService.getAllProvinces();
        setProvinces(provincesData);
      } catch (error) {
        console.error('Error loading provinces:', error);
      }
    };
    loadProvinces();
  }, []);

  // Handle province change
  const handleProvinceChange = async (e) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    setSelectedDistrict('');
    setSelectedWard('');
    setDistricts([]);
    setWards([]);

    if (provinceCode) {
      try {
        const districtsData = await ApiService.getDistrictsByProvince(provinceCode);
        setDistricts(districtsData);
      } catch (error) {
        console.error('Error loading districts:', error);
      }
    }
  };

  // Handle district change
  const handleDistrictChange = async (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
    setSelectedWard('');
    setWards([]);

    if (districtCode) {
      try {
        const wardsData = await ApiService.getWardsByDistrict(districtCode);
        setWards(wardsData);
      } catch (error) {
        console.error('Error loading wards:', error);
      }
    }
  };

  // Handle ward change
  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  // Handle form submit and edit
  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    
    const selectedProvinceObj = provinces.find(p => p.code == selectedProvince);
    const selectedDistrictObj = districts.find(d => d.code == selectedDistrict);
    const selectedWardObj = wards.find(w => w.code == selectedWard);

    const fullAddress = `${streetAddress}, ${selectedWardObj?.name}, ${selectedDistrictObj?.name}, ${selectedProvinceObj?.name}`;
    
    const form = new FormData();
    form.append("userId", profileData.id);
    form.append("address", fullAddress);
    form.append("name", nameAddress);
    form.append("phoneAddress", phoneAddress);
    form.append("isDefault", isDefaultAddress);

    try {
      let response;
      
      if (isEditMode && editingAddress) {
        // Chế độ chỉnh sửa
        response = await ApiService.updateAddress(editingAddress.id, form);
        toast.success(response.message || "Cập nhật địa chỉ thành công");
      } else {
        // Chế độ thêm mới
        response = await ApiService.addAddress(form);
        toast.success(response.message || "Thêm địa chỉ thành công");
      }

      await fetchAddress();
      handleClosePopup();
      
    } catch (error) {
      const { message, errors } = error;
      const errorMsg = error || errors || message ||
        (isEditMode ? "Cập nhật địa chỉ thất bại" : "Thêm địa chỉ thất bại");
      toast.error(errorMsg);
    }
  };
  
  const handleClosePopup = () => {
    setIsAddressPopupOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedWard('');
    setStreetAddress('');
    setNameAddress('');
    setPhoneAddress('');
    setIsDefaultAddress(false);
    setIsEditMode(false);
    setEditingAddress(null);
    setDistricts([]);
    setWards([]);
  };

  const handleAddNewAddress = () => {
    resetForm();
    setIsAddressPopupOpen(true);
  };

  const handleEditAddress = async (address) => {
    setIsEditMode(true);
    setEditingAddress(address);
    
    // Set các giá trị cơ bản
    setNameAddress(address.name || '');
    setPhoneAddress(address.phoneAddress || '');
    setIsDefaultAddress(address.isDefault || false);
    
    try {
      // Parse address để lấy codes
      const addressInfo = await ApiService.parseAddressToCodes(address.address);
      
      console.log('Parsed address info:', addressInfo);
      
      setStreetAddress(addressInfo.street);
      
      // Nếu tìm được province code
      if (addressInfo.provinceCode) {
        setSelectedProvince(addressInfo.provinceCode);
        
        // Load districts cho province này
        const districtsData = await ApiService.getDistrictsByProvince(addressInfo.provinceCode);
        setDistricts(districtsData);
        
        // Nếu tìm được district code
        if (addressInfo.districtCode) {
          setSelectedDistrict(addressInfo.districtCode);
          
          // Load wards cho district này
          const wardsData = await ApiService.getWardsByDistrict(addressInfo.districtCode);
          setWards(wardsData);
          
          // Nếu tìm được ward code
          if (addressInfo.wardCode) {
            setSelectedWard(addressInfo.wardCode);
          }
        }
      } else {
        // Fallback: nếu không parse được, chỉ set street address
        setStreetAddress(address.address);
      }
      
    } catch (error) {
      console.error('Error parsing address:', error);
      // Fallback: chỉ set street address
      setStreetAddress(address.address);
    }
    
    setIsAddressPopupOpen(true);
  };
  
  const handleDeleteAddress =  async (e,address) => {
    e.preventDefault();

    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?");
  
    if (isConfirmed) {
      try {
        const response = await ApiService.deleteAddress(address);
        await fetchAddress();
        toast.success(response.message);
      } catch (error) {
        toast.error(error);
      }
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!changePasswordData.oldPassword) newErrors.oldPassword = "Vui lòng nhập mật khẩu cũ"
    if (!changePasswordData.newPassword) newErrors.newPassword = "Vui lòng nhập mật khẩu mới"
    else if (changePasswordData.newPassword.length < 8) newErrors.newPassword = "Mật khẩu phải có ít nhất 8 ký tự"
    if (!changePasswordData.confirmPassword) newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc"
    else if (changePasswordData.newPassword !== changePasswordData.confirmPassword) newErrors.confirmPassword = "Mật khẩu không khớp"

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    
    setIsLoading(true)
    
    try {
      const response = await ApiService.changePassword(changePasswordData);
      toast.success(response.message)
      setChangePasswordPopupOpen(false)
      setChangePasswordData({oldPassword: "",newPassword: "", confirmPassword: "" })
    } catch(error) {
      const { message, errors } = error;
      const errorMsg = error || errors || message || "Đổi mật khẩu thất bại";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false)
    }
  }

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


  const tabs = [
    { id: "profile", label: "Thông tin cá nhân", icon: "👤" },
    { id: "orders", label: "Đơn hàng", icon: "📦" },
    { id: "auctions", label: "Đấu giá", icon: "🔨" },
    { id: "addresses", label: "Địa chỉ", icon: "📍" },
    { id: "settings", label: "Cài đặt", icon: "⚙️" },
  ]

  const handleProfileUpdate =  async (e) => {

    e.preventDefault();
    // Kiểm tra ràng buộc (validation đơn giản phía client)
    if (!profileData.email || !profileData.fullName) {
      alert("Email và họ tên là bắt buộc.");
      return;
    }

    setIsLoading(true)

    const form = new FormData();

    // Append từng field trùng với tên trong UpdateUserRequest
    form.append("email", profileData.email);
    form.append("fullName", profileData.fullName);
    form.append("dateOfBirth", profileData.dateOfBirth);
    form.append("phone", profileData.phone || "");
    form.append("gender", profileData.gender);
    form.append("address", profileData.address || "");

    if (avatarFile) {
      form.append("avatar", avatarFile); // avatar dùng @RequestParam MultipartFile avatar
    }

    try {
      const response = await ApiService.updateUser(profileData.id,form);
      toast.success("Cập nhật thành công")

      setProfileData(response.data);
      setIsEditing(false);
      setAvatarFile(null);
    } catch (err) {
      toast.error(err)
    }finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordChange = (e) =>{
    const { name, value } = e.target
    setChangePasswordData(prev => ({
      ...prev,
      [name]: value
    }))
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
                <div className="relative">
                  <img
                    src={profileData.avatar || "https://seafood-project-1306.s3.ap-southeast-1.amazonaws.com/default-avt.png"}
                    alt={profileData.fullName}
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                  />
                  {isEditing && (
                    <>
                      <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700" onClick={() => document.getElementById("avatarInput").click()}>
                        <Camera className="h-4 w-4" />
                      </button>
                      <input
                        type="file"
                        id="avatarInput"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setAvatarFile(file);
                            const imageUrl = URL.createObjectURL(file);
                            setProfileData(prev => ({
                              ...prev,
                              avatar: imageUrl, // cập nhật avatar để hiển thị preview
                            }));
                          }
                        }}
                      />
                    </>
                  )}
                </div>
                <h3 className="font-semibold text-neutral-900">{profileData.fullName}</h3>
                <p className="text-sm text-neutral-600">{profileData.email}</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Thành viên từ {new Date(profileData.createdAt).toLocaleDateString("vi-VN")}
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
                          name="fullName"
                          value={profileData.fullName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-neutral-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-neutral-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Số điện thoại</label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-neutral-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Ngày sinh</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={profileData.dateOfBirth}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-neutral-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Giới tính</label>
                        <select
                          value={profileData.gender}
                          name="gender"
                          onChange={handleInputChange}
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
                        name="address"
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-neutral-50"
                      />
                    </div>

                    {isEditing && (
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                        >
                          {isLoading ? "Đang xử lý..." : "Lưu thay đổi"}
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

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900">Sổ địa chỉ</h2>
                    <button 
                      onClick={handleAddNewAddress}
                      className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                    >
                      Thêm địa chỉ mới
                    </button>
                  </div>
                  
                  {/* Popup Thêm Địa Chỉ Mới */}
                  {isAddressPopupOpen && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-xl w-full max-w-md shadow-lg border border-neutral-200">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-neutral-900">Thêm địa chỉ mới</h3>
                            <button 
                              onClick={() => setIsAddressPopupOpen(false)}
                              className="text-neutral-400 hover:text-neutral-600"
                            >
                              ✕
                            </button>
                          </div>
                          
                          <form onSubmit={handleSubmitAddress} className="space-y-4">
                            {/* Tỉnh/Thành phố */}
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Tỉnh/Thành phố *
                              </label>
                              <select
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                                className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                required
                              >
                                <option value="">Chọn tỉnh/thành phố</option>
                                {provinces.map((province) => (
                                  <option key={province.code} value={province.code}>
                                    {province.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Quận/Huyện */}
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Quận/Huyện *
                              </label>
                              <select
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                disabled={!selectedProvince}
                                className={`w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                  !selectedProvince ? 'bg-neutral-100 text-neutral-400' : ''
                                }`}
                                required
                              >
                                <option value="">Chọn quận/huyện</option>
                                {districts.map((district) => (
                                  <option key={district.code} value={district.code}>
                                    {district.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Phường/Xã */}
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Phường/Xã *
                              </label>
                              <select
                                value={selectedWard}
                                onChange={handleWardChange}
                                disabled={!selectedDistrict}
                                className={`w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                  !selectedDistrict ? 'bg-neutral-100 text-neutral-400' : ''
                                }`}
                                required
                              >
                                <option value="">Chọn phường/xã</option>
                                {wards.map((ward) => (
                                  <option key={ward.code} value={ward.code}>
                                    {ward.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Đường/Số nhà */}
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Đường/Số nhà *
                              </label>
                              <input
                                type="text"
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                                className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="Nhập số nhà, tên đường..."
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Tên địa chỉ
                              </label>
                              <input
                                type="text"
                                value={nameAddress}
                                onChange={(e) => setNameAddress(e.target.value)}
                                className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="Nhập tên ghi chú..."
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Số điện thoại
                              </label>
                              <input
                                type="tel"
                                value={phoneAddress}
                                onChange={(e) => setPhoneAddress(e.target.value)}
                                className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="Nhập số điện thoại"
                              />
                            </div>

                            <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg bg-white">
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-neutral-700">
                                  Đặt làm địa chỉ mặc định
                                </label>
                                <p className="text-xs text-neutral-500 mt-1">
                                  Sử dụng địa chỉ này cho các đơn hàng mặc định
                                </p>
                              </div>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() => setIsDefaultAddress(!isDefaultAddress)}
                                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                                    isDefaultAddress ? 'bg-amber-600' : 'bg-neutral-200'
                                  }`}
                                >
                                  <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                      isDefaultAddress ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                  />
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex space-x-3 pt-2">
                              <button
                                type="button"
                                onClick={() => setIsAddressPopupOpen(false)}
                                className="flex-1 border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
                              >
                                Hủy
                              </button>
                              <button
                                type="submit"
                                className="flex-1 bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                              >
                                {isEditMode ? "Cập nhật" : "Thêm địa chỉ"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Danh sách địa chỉ */}
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
                            <p className="text-neutral-900 font-medium">{address.user}</p>
                            <p className="text-neutral-600">{address.phoneAddress}</p>
                            <p className="text-neutral-600">{address.address}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditAddress(address)}
                              className="border border-neutral-300 text-neutral-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
                            >
                              Sửa
                            </button>
                            <button 
                              onClick={(e) => handleDeleteAddress(e,address.id)}
                              className="border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                            >
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
                          <button
                           onClick={() => setChangePasswordPopupOpen(true)}
                           className="border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg font-medium hover:bg-neutral-50 transition-colors">
                            Đổi mật khẩu
                          </button>

                          {/* Popup */}
                          {changePasswordPopupOpen && (
                            <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm bg-black/30 bg-opacity-40 z-50">
                              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
                                {/* Nút đóng */}
                                <button
                                  onClick={() => {
                                    setChangePasswordPopupOpen(false),
                                    setChangePasswordData({oldPassword: "",newPassword: "", confirmPassword: "" })
                                    }}
                                  className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                  ×
                                </button>

                                <form onSubmit={handleChangePassword} className="space-y-4">
                                  <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-neutral-800">
                                      Đổi mật khẩu
                                    </h2>
                                    <p className="text-neutral-600 mt-2">
                                      Vui lòng nhập mật khẩu cũ và mật khẩu mới
                                    </p>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                      Mật khẩu cũ *
                                    </label>
                                    <input
                                      type="password"
                                      name="oldPassword"
                                      value={changePasswordData.oldPassword}
                                      onChange={handlePasswordChange}
                                      className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                      placeholder="Nhập mật khẩu cũ"
                                      required
                                    />
                                    {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>}
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                      Mật khẩu mới *
                                    </label>
                                    <input
                                      type="password"
                                      name="newPassword"
                                      value={changePasswordData.newPassword}
                                      onChange={handlePasswordChange}
                                      className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                      placeholder="Nhập mật khẩu mới"
                                      required
                                    />
                                    {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
                              
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                      Xác nhận mật khẩu *
                                    </label>
                                    <input
                                      type="password"
                                      name="confirmPassword"
                                      value={changePasswordData.confirmPassword}
                                      onChange={handlePasswordChange}
                                      className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                      placeholder="Nhập lại mật khẩu mới"
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                  </div>

                                  <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
                                  </button>
                                </form>
                              </div>
                            </div>
                          )}
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
