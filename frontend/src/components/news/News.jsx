import { useNavigate } from 'react-router-dom'




export default function NewsPage() {
  const navigate = useNavigate()
  const featuredNews = {
    id: 1,
    title: "SeaFresh Hợp Tác Với Hội Bảo Tồn Biển Để Thực Hiện Sáng Kiến Bảo Vệ Đại Dương",
    excerpt:
      "Chúng tôi vui mừng thông báo về quan hệ đối tác mới nhằm bảo vệ hệ sinh thái biển đồng thời hỗ trợ các hoạt động đánh bắt thủy sản bền vững.",
    image: "/assets/image_news1.jpg",
    date: "15 tháng 12, 2024",
    category: "Bền Vững",
    readTime: "5 phút đọc",
    author: "Emma Thompson",
  }

  const newsArticles = [
    {
      id: 2,
      title: "Ra Mắt Tính Năng Phát Trực Tiếp: Xem Thủy Sản Của Bạn Được Đánh Bắt",
      excerpt:
        "Công nghệ phát trực tiếp sáng tạo của chúng tôi giờ đây cho phép khách hàng xem thủy sản của họ được đánh bắt và chế biến theo thời gian thực.",
      image: "/assets/image_news2.jpg",
      date: "12 tháng 12, 2024",
      category: "Công Nghệ",
      readTime: "3 phút đọc",
      author: "Đội Ngũ Công Nghệ",
    },
    {
      id: 3,
      title: "Phiên Đấu Giá Cá Ngừ Phá Kỷ Lục Thu Về 50.000$ Cho Ngư Dân Địa Phương",
      excerpt:
        "Một con cá ngừ vây xanh hiếm 400 pound đã được bán với giá kỷ lục trên nền tảng đấu giá của chúng tôi, làm nổi bật giá trị của việc bán trực tiếp cho người tiêu dùng.",
      image: "/assets/image_news3.jpg",
      date: "10 tháng 12, 2024",
      category: "Đấu Giá",
      readTime: "4 phút đọc",
      author: "James Morrison",
    },
    {
      id: 4,
      title: "Mùa Lễ Hội Mang Lại Sự Gia Tăng Nhu Cầu Thủy Sản Cao Cấp",
      excerpt:
        "Doanh số tôm hùm, cua và cá cao cấp đã tăng 300% khi các gia đình chuẩn bị cho các lễ kỷ niệm trong dịp lễ.",
      image: "/assets/image_news4.jpg",
      date: "8 tháng 12, 2024",
      category: "Xu Hướng Thị Trường",
      readTime: "2 phút đọc",
      author: "Sarah Chen",
    },
    {
      id: 5,
      title: "Đối Tác Đánh Bắt Mới Tham Gia Từ Tây Bắc Thái Bình Dương",
      excerpt:
        "Chúng tôi chào đón 15 hoạt động đánh bắt bền vững mới từ Oregon và Washington, mở rộng các sản phẩm thủy sản Thái Bình Dương của chúng tôi.",
      image: "/assets/image_news5.jpg",
      date: "5 tháng 12, 2024",
      category: "Quan Hệ Đối Tác",
      readTime: "3 phút đọc",
      author: "Đội Ngũ Đối Tác",
    },
    {
      id: 6,
      title: "Khóa Học Thạc Sĩ Chế Biến Thủy Sản Của Đầu Bếp Miguel Bắt Đầu",
      excerpt:
        "Tham gia cùng đầu bếp bậc thầy của chúng tôi trong các buổi trình diễn nấu ăn trực tiếp hàng tuần với thủy sản theo mùa và kỹ thuật chuyên nghiệp.",
      image: "/assets/image_news6.jpg",
      date: "3 tháng 12, 2024",
      category: "Giáo Dục",
      readTime: "2 phút đọc",
      author: "Miguel Rodriguez",
    },
    {
      id: 7,
      title: "Ứng Dụng Di Động SeaFresh Hiện Có Sẵn Cho iOS Và Android",
      excerpt:
        "Đấu giá, xem phát trực tiếp và đặt hàng thủy sản tươi sống trực tiếp từ thiết bị di động của bạn với ứng dụng mới của chúng tôi.",
      image: "/assets/image_news7.jpg",
      date: "28 tháng 11, 2024",
      category: "Công Nghệ",
      readTime: "3 phút đọc",
      author: "Đội Ngũ Phát Triển",
    },
    {
      id: 8,
      title: "Tuần Lễ Tạ Ơn Lập Kỷ Lục Doanh Số Mới",
      excerpt:
        "Đơn hàng của khách hàng tăng 250% trong tuần lễ Tạ ơn, với tôm hùm và cua là những sản phẩm phổ biến nhất.",
      image: "/assets/image_news8.jpg",
      date: "25 tháng 11, 2024",
      category: "Tin Tức Công Ty",
      readTime: "2 phút đọc",
      author: "Đội Ngũ Bán Hàng",
    },
    {
      id: 9,
      title: "Nghiên Cứu Nhiệt Độ Đại Dương Cho Thấy Tác Động Đến Chất Lượng Thủy Sản",
      excerpt:
        "Quan hệ đối tác nghiên cứu của chúng tôi tiết lộ cách nhiệt độ đại dương thay đổi ảnh hưởng đến hương vị và giá trị dinh dưỡng của thủy sản.",
      image: "/assets/image_news9.jpg",
      date: "22 tháng 11, 2024",
      category: "Nghiên Cứu",
      readTime: "6 phút đọc",
      author: "Đội Ngũ Nghiên Cứu",
    },
  ]

  const categories = ["Tất Cả", "Công Nghệ", "Quan Hệ Đối Tác", "Đấu Giá", "Xu Hướng Thị Trường", "Hợp Tác", "Giáo Dục"]

  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Tin Tức</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cập nhật những tin tức mới nhất từ thế giới hải sản bền vững và những đổi mới trên nền tảng của chúng tôi.
          </p>
        </div>

        {/* Featured Article */}
        <section className="mb-16">
          <div className="bg-card rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2" onClick={() => navigate(`/news-detail/${featuredNews.id}`)}>
              <div className="relative">
                <img
                  src={featuredNews.image || "/placeholder.svg"}
                  alt={featuredNews.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {featuredNews.category}
                  </span>
                  <span className="text-sm text-muted-foreground">{featuredNews.date}</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-4">{featuredNews.title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{featuredNews.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>By {featuredNews.author}</span>
                    <span>•</span>
                    <span>{featuredNews.readTime}</span>
                  </div>
                  <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-border text-foreground hover:bg-muted transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* News Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <article
                key={article.id}
                className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 rounded text-xs font-medium shadow-md hover:bg-gray-800 transition-colors">
                    {article.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">By {article.author}</span>
                    <button className="text-primary font-medium hover:underline">Read More</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors">
            Load More Articles
          </button>
        </div>

        {/* Newsletter Signup */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to get the latest news about sustainable seafood, platform updates, and
              exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
