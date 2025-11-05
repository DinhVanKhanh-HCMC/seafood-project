// Products.jsx - Trang danh sách sản phẩm
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/apis";
import { toast } from "react-toastify"

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await ApiService.getAllProduct();
            setProducts(response.data);
          } catch (err) {
            console.error("Lỗi khi fetch:", err);
          }
        };
        fetchData();
      }, []);

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
          return;
        }
    
        try {
          await ApiService.deleteProduct(productId);
          const updateProducts = products.filter(product => product.id !== productId);
          setProducts(updateProducts);
          toast.success("Xóa sản phẩm thành công!");
        } catch (error) {
          console.error("Lỗi khi xóa đơn hàng:", error);
          toast.error("Xóa đơn hàng thất bại!");
        }
      };

    // Đi đến trang thêm sản phẩm
    const goToAddProduct = () => {
        navigate("/add-product");
    };

    // Đi đến trang sửa sản phẩm
    const goToEditProduct = (productId) => {
        navigate(`/add-product?edit=${productId}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h2>
                <button 
                    onClick={goToAddProduct}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus size={20} /> Thêm sản phẩm
                </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">STT</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tên sản phẩm</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Danh mục</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Giá</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tình trạng</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {products.map((product, index) => (
                        <tr key={product.id}>
                        <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{product.categoryName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{product.price}đ</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{product.inStock ? "Còn hàng" : "Hết hàng"}</td>
                        <td className="px-6 py-4 text-sm">
                            <div className="flex gap-2">
                            <button 
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => goToEditProduct(product.id)}
                            >
                                <Edit size={16} />
                            </button>
                            <button 
                                className="text-red-600 hover:text-red-800"
                                onClick={() => handleDeleteProduct(product.id)}
                            >
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

export default Products;