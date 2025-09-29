import React,{useState} from "react";
import { Plus, Eye, Edit, Trash2, MessageSquare, Heart, Share } from "lucide-react";

const PostsTab = ({openModal }) => {
  const [posts] = useState([
    { id: 1, title: 'Khuyến mãi tháng 3', author: 'Admin', status: 'Đã đăng', date: '2024-03-15' },
    { id: 2, title: 'Hướng dẫn mua hàng', author: 'Admin', status: 'Nháp', date: '2024-03-16' },
  ]);
  return (
     <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Quản lý bài viết</h2>
          <button 
            onClick={() => openModal('add-post')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} /> Thêm bài viết
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tiêu đề</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tác giả</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Trạng thái</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Ngày tạo</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{post.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{post.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{post.author}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'Đã đăng' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{post.date}</td>
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

export default PostsTab;
