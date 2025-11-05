import React, { useState, useEffect } from 'react'
import { X, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ApiService from '../../services/apis';

const CreateAuction = ({ closeModal, openModal }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    productId: '',
    startPrice: '',
    bidStep: '100000',
    startTime: '',
    endTime: ''
  });
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      // Giả sử bạn có API lấy danh sách sản phẩm
      const response = await ApiService.getAllProduct();
      setProducts(response.data || []);
      setFilteredProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Không thể tải danh sách sản phẩm');
    } finally {
      setProductsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setFormData(prev => ({
      ...prev,
      productId: product.id
    }));
    setShowProductDropdown(false);
    setSearchQuery(product.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.productId) {
      alert('Vui lòng chọn sản phẩm');
      return;
    }

    if (!formData.startPrice || !formData.bidStep || !formData.endTime) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      setLoading(true);
      
      const auctionData = {
        productId: formData.productId,
        startTime: formData.startTime,
        startPrice: parseFloat(formData.startPrice),
        bidStep: parseFloat(formData.bidStep),
        endTime: formData.endTime
      };

      const response = await ApiService.createAuction(auctionData);
      
      alert(response.message);
      
      
        navigate(`/auction-view/${response.data.id}`);
      
      
      // Có thể chuyển hướng đến trang chi tiết auction mới tạo
      // navigate(`/admin/auction-view/${response.data.id}`);
      
    } catch (error) {
      console.error('Error creating auction:', error);
      alert(error || 'Tạo phiên đấu giá thất bại');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getCurrentDateTime = () => {
    return new Date().toISOString().slice(0, 16);
  };

// Hàm lấy thời gian tối thiểu cho endTime (ít nhất 1 giờ sau startTime)
  const getMinEndDateTime = () => {
    if (!formData.startTime) return getCurrentDateTime();
    const startTime = new Date(formData.startTime);
    startTime.setHours(startTime.getHours() + 1);
    return startTime.toISOString().slice(0, 16);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Tạo phiên đấu giá mới</h3>
          <button 
            onClick={closeModal || (() => navigate(-1))} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Chọn sản phẩm */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chọn sản phẩm *
            </label>
            <div className="relative">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowProductDropdown(true);
                }}
                onFocus={() => setShowProductDropdown(true)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {showProductDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {productsLoading ? (
                  <div className="p-3 text-center text-gray-500">Đang tải sản phẩm...</div>
                ) : filteredProducts.length === 0 ? (
                  <div className="p-3 text-center text-gray-500">Không tìm thấy sản phẩm</div>
                ) : (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                    >
                      <div className="font-medium text-gray-800">{product.name}</div>
                      <div className="text-sm text-gray-600 truncate">
                        {product.description}
                      </div>
                      <div className="text-sm font-semibold text-green-600">
                        {formatPrice(product.price)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Hiển thị thông tin sản phẩm đã chọn */}
          {selectedProduct && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                {selectedProduct.images && selectedProduct.images.length > 0 && (
                  <img 
                    src={selectedProduct.images[0]} 
                    alt={selectedProduct.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <div className="font-medium text-green-800">{selectedProduct.name}</div>
                  <div className="text-sm text-green-600">
                    Giá gốc: {formatPrice(selectedProduct.price)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Giá khởi điểm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá khởi điểm *
            </label>
            <input 
              type="number" 
              name="startPrice"
              value={formData.startPrice}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="1000000"
              min="0"
              step="1000"
              required
            />
          </div>
          
          {/* Bước giá */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bước giá *
            </label>
            <input 
              type="number" 
              name="bidStep"
              value={formData.bidStep}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="100000"
              min="1000"
              step="1000"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Mỗi lần đấu giá phải tối thiểu {formatPrice(formData.bidStep || 100000)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Thời gian bắt đầu *
            </label>
            <input 
                type="datetime-local" 
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min={getCurrentDateTime()} // Ít nhất là thời gian hiện tại
                required
            />
            <p className="text-xs text-gray-500 mt-1">
                Thời gian bắt đầu phải sau thời gian hiện tại
            </p>
          </div>
          
          {/* Thời gian kết thúc */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thời gian kết thúc *
            </label>
            <input 
              type="datetime-local" 
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min={getMinEndDateTime()}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Thời gian kết thúc phải ít nhất 1 giờ từ bây giờ
            </p>
          </div>

          {/* Nút thêm sản phẩm mới (nếu cần) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                // Mở modal thêm sản phẩm mới
                
                  navigate('/add-product');
              }}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              <Plus size={16} />
              Thêm sản phẩm mới
            </button>
          </div>
        </form>
        
        <div className="flex gap-3 mt-6">
          <button 
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white py-2 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Đang tạo...' : 'Tạo phiên đấu giá'}
          </button>
          <button 
            type="button"
            onClick={closeModal || (() => navigate(-1))}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-colors"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;