import React, { useState, useRef} from 'react';
import { 
  Users, Package, ShoppingCart, Video, Gavel, 
  FileText, Plus, Edit, Trash2, Eye, Search,
  Filter, Save, X, Play, Pause, Camera,
  MessageSquare, Heart, Share, Gift
} from 'lucide-react';
import UsersTab from './UserManagement/page';
import ProductsTab from './ProductManagement/page';
import OrdersTab from './OrderManagement/page';
import LivestreamsTab from './Livestream/page';
import AuctionsTab from './AuctionManagement/page';
import PostsTab from './PostManagement/page';
import CreateLivestream from './Livestream/createlivestream';
import LivestreamView from './Livestream/LivestreamView';
import CreateAuction from './AuctionManagement/CreateAuction';
import AuctionView from './AuctionManagement/AuctionView';
import AddUser from './UserManagement/AddUser';
import AddProduct from './ProductManagement/AddProduct';
import {toast} from "react-toastify"
import ApiService from '../services/apis';
import { useNavigate } from 'react-router-dom';




const AdminInterface = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const videoRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate();

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  const tabItems = [
    { id: 'users', label: 'Quản lý người dùng', icon: Users },
    { id: 'products', label: 'Quản lý sản phẩm', icon: Package },
    { id: 'orders', label: 'Quản lý đơn hàng', icon: ShoppingCart },
    { id: 'livestreams', label: 'Quản lý livestream', icon: Video },
    { id: 'auctions', label: 'Quản lý đấu giá', icon: Gavel },
    { id: 'posts', label: 'Quản lý bài viết', icon: FileText },
  ];

  const renderTabContent = () => {
    if (activeTab === 'users') {
      return (
        <UsersTab openModal={openModal} />
      );
    }
    if (activeTab === 'products') {
      return (
        <ProductsTab openModal={openModal}/>
      );
    }
    if (activeTab === 'orders') {
      return (
        <OrdersTab openModal={openModal}/>
      );
    }
    if (activeTab === 'livestreams') {
      return (
        <LivestreamsTab openModal={openModal}/>
      );
    }
    if (activeTab === 'auctions') {
      return (
        <AuctionsTab openModal={openModal}/>
      );
    }
    if (activeTab === 'posts') {
      return (
        <PostsTab openModal={openModal}/>
      );
    }

    return <div>Chức năng đang phát triển...</div>;
  };

  const handleLogout = async () =>{
    try {
      const response = await ApiService.logout()
      localStorage.removeItem("token")
      toast.success(response.message)
      setIsProfileOpen(false)
      navigate("/login")
    } catch (error) {
      toast.error(error)
    }
  }

  const renderModal = () => {
    if (!showModal) return null;

    if (modalType === 'create-livestream') {
      return (
        <CreateLivestream openModal={openModal} closeModal={closeModal}/>
      );
    }

    if (modalType === 'livestream-view') {
      return (
        <LivestreamView closeModal={closeModal}/> 
      );
    }

    if (modalType === 'create-auction') {
      return (
       <CreateAuction openModal={openModal} closeModal={closeModal}/>
      );
    }

    if (modalType === 'auction-view') {
      return (
        <AuctionView closeModal={closeModal}/>
      );
    }

    if (modalType === 'add-user') {
      return (
        <AddUser closeModal={closeModal}/>
      );
    }

    if (modalType === 'add-product') {
      return (
        <AddProduct closeModal={closeModal}/>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
              <span className="text-gray-500">|</span>
              <span className="text-gray-600">Quản lý hệ thống</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              <div className='relative'>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    A
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                      <ul className="py-1">
                        <li>
                          <button 
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                            onClick={handleLogout}
                          >
                            Đăng xuất
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
              </div>
                            
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {tabItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {renderTabContent()}
        </main>
      </div>

      {renderModal()}
    </div>
  );
};

export default AdminInterface;