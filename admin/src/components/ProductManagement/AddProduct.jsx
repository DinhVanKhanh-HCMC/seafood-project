import React, { useEffect, useState, useRef } from "react";
import {
  Package,
  X,
  Upload
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApiService from "../../services/apis";
import { toast } from "react-toastify"

const AddProduct = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit'); // Lấy ID từ query parameter
  
  const isEditMode = !!editId;

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    originalPrice: "",
    weight: "",
    origin: "",
    inStock: true,
    inAuction: false,
    description: "",
  });
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [existingImages, setExistingImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Fetch API danh mục
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getAllCategory();
        setCategories(response.data);
      } catch (err) {
        console.error("Lỗi khi fetch:", err);
      }
    };
    fetchData();
  }, []);

  // 🔹 Nếu là edit mode, load dữ liệu sản phẩm
  useEffect(() => {
    if (isEditMode && editId) {
        const fetchProductData = async () => {
        try {
            setIsLoading(true);
            const response = await ApiService.getProductById(editId);
            const product = response.data;
            
            setFormData({
            name: product.name || "",
            categoryId: product.categoryId || "",
            price: product.price || "",
            originalPrice: product.originalPrice || "",
            weight: product.weight || "",
            origin: product.origin || "",
            inStock: product.inStock !== undefined ? product.inStock : true,
            inAuction: product.inAuction || false,
            description: product.description || "",
            });

            // Set ảnh hiện có (mảng string URLs)
            if (product.images && product.images.length > 0) {
                setExistingImages(product.images);
            }
        } catch (error) {
            console.error("Lỗi khi fetch sản phẩm:", error);
            toast.error("Không thể tải thông tin sản phẩm");
        } finally {
            setIsLoading(false);
        }
        };
        
        fetchProductData();
    }
  }, [isEditMode, editId]);

  // 🔹 Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Vui lòng nhập tên sản phẩm");
      return;
    }
    
    if (!formData.categoryId) {
      toast.error("Vui lòng chọn danh mục");
      return;
    }
    
    if (!formData.price || formData.price <= 0) {
      toast.error("Vui lòng nhập giá bán hợp lệ");
      return;
    }

    if (!isEditMode && images.length === 0) {
      toast.error("Vui lòng chọn ít nhất một ảnh");
      return;
    }
    
    try {
        setIsLoading(true);
        const formDataToSend = new FormData();
        
        // Thêm các trường dữ liệu từ formData
        Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
        });
        
        // Thêm các file ảnh mới
        images.forEach((image) => {
        formDataToSend.append('images', image.file);
        });

        // Nếu là edit mode, thêm oldImages
        if (isEditMode) {
        existingImages.forEach(imageUrl => {
            formDataToSend.append('oldImages', imageUrl);
        });
        }
        
        // Gọi API
        if (isEditMode) {
        await ApiService.updateProduct(editId, formDataToSend);
        toast.success("Cập nhật sản phẩm thành công!");
        } else {
        await ApiService.addProduct(formDataToSend);
        toast.success("Thêm sản phẩm thành công!");
        }
        
        navigate("/products");
        
    } catch (error) {
        console.error("Lỗi:", error);
        toast.error(error.message || "Có lỗi xảy ra!");
    } finally {
        setIsLoading(false);
    }
    };

  // Hàm xử lý khi chọn file
  const handleFileSelect = (files) => {
    const validFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );
    
    const newImages = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file: file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    
    setImages(prev => [...prev, ...newImages]);
  };

  // Xử lý khi click vào vùng upload
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Xử lý khi chọn file từ input
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
    // Reset input để có thể chọn lại file cùng tên
    e.target.value = '';
  };

  // Xử lý kéo thả
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  // Xóa ảnh mới
  const removeImage = (id) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  };

    // Hàm xóa ảnh hiện có từ server
    const removeExistingImage = (imageUrl) => {
        setExistingImages(prev => prev.filter(img => img !== imageUrl));
    };

  // Cleanup URLs khi component unmount
  useEffect(() => {
    return () => {
      images.forEach(image => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);

  if (isLoading && isEditMode) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <div className="text-center">Đang tải thông tin sản phẩm...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-5/6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{isEditMode ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h3>
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Tên sản phẩm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tên sản phẩm..."
              required
            />
          </div>

          {/* Danh mục */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Giá bán */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="0"
              required
            />
          </div>

          {/* Giá gốc */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá gốc</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="0"
            />
          </div>

          {/* Cân nặng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cân nặng</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="500g, 1kg..."
            />
          </div>

          {/* Xuất xứ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Xuất xứ</label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Cà Mau, Phú Quốc..."
            />
          </div>

          {/* Công tắc "Còn hàng" */}
          <div className="flex items-center gap-2 mt-2">
            <label className="text-sm font-medium text-gray-700">Còn hàng</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-all"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
            </label>
          </div>

          {/* Công tắc "Đấu giá" */}
          <div className="flex items-center gap-2 mt-2">
            <label className="text-sm font-medium text-gray-700">Đấu giá</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="inAuction"
                checked={formData.inAuction}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
            </label>
          </div>

          {/* Mô tả */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập mô tả sản phẩm..."
            ></textarea>
          </div>

          {/* Hình ảnh */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>
            
            {/* Input file ẩn */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              multiple
              accept="image/*"
              className="hidden"
            />
            
            {/* Vùng kéo thả */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragging 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={handleUploadClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload size={48} className="mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500 mb-1">
                Kéo thả hình ảnh vào đây hoặc nhấn để chọn
              </p>
              <p className="text-sm text-gray-400">
                Chọn nhiều ảnh cùng lúc • JPG, PNG, GIF
              </p>
            </div>
            
            {/* Hiển thị ảnh hiện có từ server (chỉ trong edit mode) */}
            {isEditMode && existingImages.length > 0 && (
            <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                Ảnh hiện có ({existingImages.length})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {existingImages.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                    <img
                        src={imageUrl}
                        alt={`Ảnh ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                        type="button"
                        onClick={(e) => {
                        e.stopPropagation();
                        removeExistingImage(imageUrl);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X size={14} />
                    </button>
                    </div>
                ))}
                </div>
            </div>
            )}

            {/* Hiển thị ảnh mới chọn */}
            {images.length > 0 && (
            <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                Ảnh mới ({images.length})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {images.map((image) => (
                    <div key={image.id} className="relative group">
                    <img
                        src={image.preview}
                        alt={image.name}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                        type="button"
                        onClick={(e) => {
                        e.stopPropagation();
                        removeImage(image.id);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X size={14} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                        {image.name}
                    </div>
                    </div>
                ))}
                </div>
            </div>
            )}
          </div>

          {/* Nút hành động */}
          <div className="col-span-2 flex gap-3 mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 rounded-lg transition-colors"
            >
              {isLoading ? "Đang xử lý..." : (isEditMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm")}
            </button>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;