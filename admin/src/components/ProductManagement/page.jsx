import React,{ useState }  from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";


const ProductsTab = ({openModal}) => {
    const [products] = useState([
        { id: 1, name: 'iPhone 15 Pro', category: 'Điện thoại', price: '29.990.000', stock: 50, status: 'Còn hàng' },
        { id: 2, name: 'MacBook Air M2', category: 'Laptop', price: '25.990.000', stock: 20, status: 'Còn hàng' },
    ]);
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h2>
        <button 
            onClick={() => openModal('add-product')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
            <Plus size={20} /> Thêm sản phẩm
        </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
            <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tên sản phẩm</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Danh mục</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Giá</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Kho</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Trạng thái</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Thao tác</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
                <tr key={product.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{product.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.category}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.price}đ</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.stock}</td>
                <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    {product.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                        <Edit size={16} />
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

export default ProductsTab;
