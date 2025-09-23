

import { useState } from "react"
import { useParams } from "react-router-dom"

export default function ArticleDetailPage() {
  const params = useParams()
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [newComment, setNewComment] = useState({ name: "", email: "", comment: "" })

  // Mock article data - in real app, fetch by ID
  const article = {
    id: 1,
    title: "SeaFresh Hợp Tác Với Hiệp Hội Bảo Tồn Biển Để Bảo Vệ Đại Dương",
    content: `
      <p>Chúng tôi vui mừng thông báo về sự hợp tác mới nhằm bảo vệ hệ sinh thái biển đồng thời hỗ trợ các hoạt động đánh bắt cá bền vững. Đây là một bước tiến quan trọng trong cam kết của SeaFresh về việc bảo vệ môi trường biển.</p>
      
      <h3>Mục Tiêu Của Chương Trình Hợp Tác</h3>
      <p>Chương trình hợp tác này tập trung vào ba mục tiêu chính:</p>
      <ul>
        <li>Giảm thiểu tác động của hoạt động đánh bắt đến hệ sinh thái biển</li>
        <li>Hỗ trợ ngư dân áp dụng các phương pháp đánh bắt bền vững</li>
        <li>Nâng cao nhận thức cộng đồng về tầm quan trọng của việc bảo vệ đại dương</li>
      </ul>
      
      <h3>Các Hoạt Động Cụ Thể</h3>
      <p>Trong khuôn khổ hợp tác này, SeaFresh và Hiệp Hội Bảo Tồn Biển sẽ triển khai các hoạt động sau:</p>
      
      <h4>1. Chương Trình Đào Tạo Ngư Dân</h4>
      <p>Chúng tôi sẽ tổ chức các khóa đào tạo miễn phí cho ngư dân về các kỹ thuật đánh bắt bền vững, bao gồm:</p>
      <ul>
        <li>Sử dụng lưới đánh bắt thân thiện với môi trường</li>
        <li>Kỹ thuật đánh bắt có chọn lọc để tránh bắt phải các loài non trẻ</li>
        <li>Quản lý thời gian đánh bắt theo mùa sinh sản của cá</li>
      </ul>
      
      <h4>2. Hệ Thống Giám Sát Chất Lượng Nước Biển</h4>
      <p>Chúng tôi sẽ lắp đặt các trạm giám sát chất lượng nước biển tại các khu vực đánh bắt chính. Hệ thống này sẽ theo dõi:</p>
      <ul>
        <li>Nhiệt độ nước biển</li>
        <li>Độ pH và độ mặn</li>
        <li>Mức độ ô nhiễm</li>
        <li>Mật độ sinh vật biển</li>
      </ul>
      
      <h3>Cam Kết Dài Hạn</h3>
      <p>Đây không chỉ là một dự án ngắn hạn mà là cam kết dài hạn của SeaFresh trong việc xây dựng một ngành thủy sản bền vững. Chúng tôi tin rằng việc kết hợp giữa công nghệ hiện đại và các phương pháp truyền thống sẽ tạo ra một tương lai tốt đẹp hơn cho cả ngư dân và đại dương.</p>
      
      <p>Trong 5 năm tới, chúng tôi dự kiến sẽ giảm 30% lượng khí thải carbon từ hoạt động vận chuyển và tăng 50% số lượng ngư dân áp dụng các phương pháp đánh bắt bền vững.</p>
    `,
    excerpt:
      "Chúng tôi vui mừng thông báo về sự hợp tác mới nhằm bảo vệ hệ sinh thái biển đồng thời hỗ trợ các hoạt động đánh bắt cá bền vững.",
    image: `${import.meta.env.BASE_URL}assets/image_news1.jpg`,
    date: "15 tháng 12, 2024",
    category: "Bền Vững",
    readTime: "5 phút đọc",
    author: {
      name: "Emma Thompson",
      avatar: "/team-emma-thompson-sustainability.png",
      bio: "Chuyên gia về phát triển bền vững với hơn 10 năm kinh nghiệm trong ngành thủy sản.",
    },
    tags: ["Bền vững", "Bảo vệ môi trường", "Hợp tác", "Đại dương"],
    views: 1247,
    likes: 89,
    shares: 23,
  }

  const relatedArticles = [
    {
      id: 2,
      title: "Tính Năng Live Streaming Mới: Xem Hải Sản Được Đánh Bắt Trực Tiếp",
      excerpt:
        "Công nghệ live streaming sáng tạo cho phép khách hàng xem hải sản được đánh bắt và chế biến theo thời gian thực.",
      image: `${import.meta.env.BASE_URL}assets/image_news2.jpg`,
      date: "12 tháng 12, 2024",
      category: "Công Nghệ",
      readTime: "3 phút đọc",
    },
    {
      id: 3,
      title: "Phiên Đấu Giá Cá Ngừ Kỷ Lục Gây Quỹ 50.000$ Cho Ngư Dân",
      excerpt:
        "Con cá ngừ vây xanh hiếm 400 pound được bán với giá kỷ lục, làm nổi bật giá trị của việc bán trực tiếp cho người tiêu dùng.",
      image: `${import.meta.env.BASE_URL}assets/image_news3.jpg`,
      date: "10 tháng 12, 2024",
      category: "Đấu Giá",
      readTime: "4 phút đọc",
    },
    {
      id: 4,
      title: "Mùa Lễ Hội Tăng Nhu Cầu Hải Sản Cao Cấp",
      excerpt: "Doanh số tôm hùm, cua và cá cao cấp tăng 300% khi các gia đình chuẩn bị cho các lễ hội.",
      image: `${import.meta.env.BASE_URL}assets/image_news4.jpg`,
      date: "8 tháng 12, 2024",
      category: "Xu Hướng Thị Trường",
      readTime: "2 phút đọc",
    },
  ]

  const comments = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      date: "16 tháng 12, 2024",
      comment:
        "Rất tuyệt vời! Tôi ủng hộ những sáng kiến bảo vệ môi trường như thế này. Hy vọng sẽ có nhiều doanh nghiệp khác làm theo.",
      likes: 12,
      replies: [
        {
          id: 11,
          name: "Emma Thompson",
          date: "16 tháng 12, 2024",
          comment: "Cảm ơn bạn đã ủng hộ! Chúng tôi tin rằng mỗi bước nhỏ đều có ý nghĩa lớn.",
          likes: 5,
        },
      ],
    },
    {
      id: 2,
      name: "Trần Thị Mai",
      date: "15 tháng 12, 2024",
      comment: "Tôi là ngư dân và rất mong được tham gia chương trình đào tạo này. Làm thế nào để đăng ký?",
      likes: 8,
      replies: [],
    },
    {
      id: 3,
      name: "Lê Minh Hoàng",
      date: "15 tháng 12, 2024",
      comment: "Chương trình rất ý nghĩa. Tôi sẽ chia sẻ bài viết này để nhiều người biết đến.",
      likes: 6,
      replies: [],
    },
  ]

  const handleSubmitComment = (e) => {
    e.preventDefault()
    alert("Cảm ơn bạn đã bình luận!")
    setNewComment({ name: "", email: "", comment: "" })
    setShowCommentForm(false)
  }

  const handleShare = (platform) => {
    alert(`Chia sẻ lên ${platform}`)
  }

  return (
    <div className="min-h-screen bg-neutral-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-8">
          <a href="/" className="hover:text-amber-600">
            Trang chủ
          </a>
          <span>/</span>
          <a href="/news" className="hover:text-amber-600">
            Tin tức
          </a>
          <span>/</span>
          <span className="text-neutral-900">{article.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {/* Article Header */}
              <div className="relative">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-6 left-6 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </div>
              </div>

              <div className="p-8 md:p-12">
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-6">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <span>{article.views.toLocaleString()} lượt xem</span>
                </div>

                {/* Article Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 leading-tight">{article.title}</h1>

                {/* Author Info */}
                <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-neutral-200">
                  <img
                    src={article.author.avatar || "/placeholder.svg"}
                    alt={article.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-neutral-900">{article.author.name}</div>
                    <div className="text-sm text-neutral-600">{article.author.bio}</div>
                  </div>
                </div>

                {/* Article Content */}
                <div
                  className="prose prose-lg max-w-none text-neutral-700 leading-relaxed mb-8"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm hover:bg-amber-100 hover:text-amber-700 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Social Actions */}
                <div className="flex items-center justify-between py-6 border-t border-b border-neutral-200 mb-8">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-neutral-600 hover:text-amber-600 transition-colors">
                      <span>♡</span>
                      <span>{article.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-neutral-600 hover:text-amber-600 transition-colors">
                      <span>💬</span>
                      <span>{comments.length}</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-neutral-600">Chia sẻ:</span>
                    <button
                      onClick={() => handleShare("Facebook")}
                      className="text-neutral-600 hover:text-blue-600 transition-colors"
                    >
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare("Twitter")}
                      className="text-neutral-600 hover:text-blue-400 transition-colors"
                    >
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare("LinkedIn")}
                      className="text-neutral-600 hover:text-blue-700 transition-colors"
                    >
                      LinkedIn
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-neutral-900">Bình luận ({comments.length})</h3>
                    <button
                      onClick={() => setShowCommentForm(!showCommentForm)}
                      className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                    >
                      Viết bình luận
                    </button>
                  </div>

                  {/* Comment Form */}
                  {showCommentForm && (
                    <form onSubmit={handleSubmitComment} className="bg-neutral-50 rounded-lg p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Tên của bạn"
                          value={newComment.name}
                          onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                          className="border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                        <input
                          type="email"
                          placeholder="Email của bạn"
                          value={newComment.email}
                          onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                          className="border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                      <textarea
                        placeholder="Viết bình luận của bạn..."
                        value={newComment.comment}
                        onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                        rows={4}
                        className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                        >
                          Gửi bình luận
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowCommentForm(false)}
                          className="border border-neutral-300 text-neutral-700 px-6 py-2 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
                        >
                          Hủy
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                            <span className="text-amber-600 font-semibold">{comment.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-semibold text-neutral-900">{comment.name}</span>
                              <span className="text-sm text-neutral-500">{comment.date}</span>
                            </div>
                            <p className="text-neutral-700 mb-3">{comment.comment}</p>
                            <div className="flex items-center space-x-4 text-sm text-neutral-500">
                              <button className="hover:text-amber-600 transition-colors">
                                Thích ({comment.likes})
                              </button>
                              <button className="hover:text-amber-600 transition-colors">Trả lời</button>
                            </div>
                          </div>
                        </div>

                        {/* Replies */}
                        {comment.replies.length > 0 && (
                          <div className="ml-14 space-y-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center">
                                  <span className="text-neutral-600 text-sm font-semibold">{reply.name.charAt(0)}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="font-semibold text-neutral-900">{reply.name}</span>
                                    <span className="text-sm text-neutral-500">{reply.date}</span>
                                  </div>
                                  <p className="text-neutral-700 mb-2">{reply.comment}</p>
                                  <button className="text-sm text-neutral-500 hover:text-amber-600 transition-colors">
                                    Thích ({reply.likes})
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Related Articles */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Bài viết liên quan</h3>
                <div className="space-y-6">
                  {relatedArticles.map((relatedArticle) => (
                    <article key={relatedArticle.id} className="group cursor-pointer">
                      <div className="flex space-x-4">
                        <img
                          src={relatedArticle.image || "/placeholder.svg"}
                          alt={relatedArticle.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-neutral-900 group-hover:text-amber-600 transition-colors line-clamp-2 mb-2">
                            {relatedArticle.title}
                          </h4>
                          <div className="flex items-center text-xs text-neutral-500 space-x-2">
                            <span>{relatedArticle.date}</span>
                            <span>•</span>
                            <span>{relatedArticle.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-3">Đăng ký nhận tin</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Nhận những tin tức mới nhất về hải sản và các ưu đãi đặc biệt.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button className="w-full bg-amber-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
                    Đăng ký
                  </button>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Thẻ phổ biến</h3>
                <div className="flex flex-wrap gap-2">
                  {["Bền vững", "Công nghệ", "Đấu giá", "Hải sản tươi", "Bảo vệ môi trường", "Ngư dân"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm hover:bg-amber-100 hover:text-amber-700 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
