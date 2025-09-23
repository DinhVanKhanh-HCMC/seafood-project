import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [searchQuery, setSearchQuery] = useState("")
  const [fishEasterEgg, setFishEasterEgg] = useState(false)
  const [konamiSequence, setKonamiSequence] = useState([])
  const [showPriceEasterEgg, setShowPriceEasterEgg] = useState(false)
  const navigate = useNavigate()

  // Easter egg: Konami code for fish animation
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
    'KeyB', 'KeyA'
  ]

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newSequence = [...konamiSequence, e.code].slice(-10)
      setKonamiSequence(newSequence)
      
      if (newSequence.join(',') === konamiCode.join(',')) {
        setFishEasterEgg(true)
        setTimeout(() => setFishEasterEgg(false), 5000)
        setKonamiSequence([])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiSequence])

  const categories = [
    { id: "all", name: "Tất cả sản phẩm" },
    { id: "fish", name: "Cá tươi sống" },
    { id: "shellfish", name: "Tôm cua" },
    { id: "salmon", name: "Cá hồi" },
    { id: "tuna", name: "Cá ngừ" },
    { id: "shrimp", name: "Tôm" },
    { id: "oysters", name: "Hàu sò" },
  ]

  const products = [
    {
      id: 1,
      name: "Phi lê cá hồi Đại Tây Dương",
      category: "salmon",
      price: 599000,
      originalPrice: 719000,
      image: `${import.meta.env.BASE_URL}assets/cuagach.jpg`,
      rating: 4.8,
      reviews: 124,
      inStock: true,
      weight: "500g",
      origin: "Na Uy",
      description: "Cá hồi Đại Tây Dương cao cấp, nuôi bền vững",
      freshness: "Siêu tươi",
    },
    {
      id: 2,
      name: "Tôm hùm Maine",
      category: "shellfish",
      price: 1099000,
      originalPrice: 1269000,
      image: `${import.meta.env.BASE_URL}assets/cuagach.jpg`,
      rating: 4.9,
      reviews: 89,
      inStock: true,
      weight: "700g",
      origin: "Maine, Mỹ",
      description: "Tôm hùm Maine sống, đánh bắt tươi hàng ngày",
      freshness: "Sống",
    },
    {
      id: 3,
      name: "Tôm sú jumbo",
      category: "shrimp",
      price: 455000,
      originalPrice: 550000,
      image: `${import.meta.env.BASE_URL}assets/cuagach.jpg`,
      rating: 4.7,
      reviews: 156,
      inStock: false,
      weight: "500g",
      origin: "Vịnh Mexico",
      description: "Tôm sú jumbo to, thịt ngọt",
      freshness: "Tươi đông lạnh",
    },
    {
      id: 4,
      name: "Bít tết cá ngừ tươi",
      category: "tuna",
      price: 789000,
      originalPrice: 935000,
      image: `${import.meta.env.BASE_URL}assets/cuagach.jpg`,
      rating: 4.8,
      reviews: 78,
      inStock: true,
      weight: "250g",
      origin: "Thái Bình Dương",
      description: "Cá ngừ vây vàng cấp sushi",
      freshness: "Cấp sashimi",
    },
    {
      id: 5,
      name: "Hàu tươi",
      category: "oysters",
      price: 695000,
      originalPrice: 839000,
      image: `${import.meta.env.BASE_URL}assets/cuagach.jpg`,
      rating: 4.6,
      reviews: 92,
      inStock: true,
      weight: "12 con",
      origin: "Vịnh Chesapeake",
      description: "Hàu tươi vịnh Chesapeake",
      freshness: "Sống",
    },
    {
      id: 6,
      name: "Cá hồng",
      category: "fish",
      price: 649000,
      originalPrice: 765000,
      image: `${import.meta.env.BASE_URL}assets/cuagach.jpg`,
      rating: 4.7,
      reviews: 67,
      inStock: true,
      weight: "1kg",
      origin: "Vịnh Mexico",
      description: "Cá hồng nguyên con, đã làm sạch và cạo vảy",
      freshness: "Siêu tươi",
    },
    {
      id: 7,
      name: "Chân cua hoàng đế",
      category: "shellfish",
      price: 2159000,
      originalPrice: 2399000,
      image: `${import.meta.env.BASE_URL}assets/cuagach.jpg`,
      rating: 4.9,
      reviews: 145,
      inStock: true,
      weight: "1kg",
      origin: "Alaska",
      description: "Chân cua hoàng đế Alaska, đã nấu sẵn",
      freshness: "Nấu sẵn",
    },
    {
      id: 8,
      name: "Phi lê cá chẽm",
      category: "fish",
      price: 550000,
      originalPrice: 670000,
      image: `${import.meta.env.BASE_URL}assets/cuagach.jpg`,
      rating: 4.5,
      reviews: 83,
      inStock: true,
      weight: "500g",
      origin: "Địa Trung Hải",
      description: "Cá chẽm Địa Trung Hải, phi lê không xương",
      freshness: "Tươi sống",
    },
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  // Easter egg: Click on price 7 times to show special message
  const handlePriceClick = (productId) => {
    if (productId === 7) { // King crab - most expensive
      const clicks = parseInt(localStorage.getItem('crabClicks') || '0') + 1
      localStorage.setItem('crabClicks', clicks.toString())
      if (clicks >= 7) {
        setShowPriceEasterEgg(true)
        setTimeout(() => setShowPriceEasterEgg(false), 3000)
        localStorage.removeItem('crabClicks')
      }
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "under-500k" && product.price < 500000) ||
      (priceRange === "500k-1m" && product.price >= 500000 && product.price <= 1000000) ||
      (priceRange === "over-1m" && product.price > 1000000)
    return matchesCategory && matchesSearch && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
      default:
        return a.name.localeCompare(b.name, 'vi')
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 relative overflow-hidden">
      {/* Animated fish easter egg */}
      {fishEasterEgg && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="animate-bounce absolute top-1/2 left-0 text-6xl transform -translate-y-1/2">
            🐟
          </div>
          <div className="animate-pulse absolute top-1/4 right-1/4 text-4xl">🦐</div>
          <div className="animate-spin absolute bottom-1/4 left-1/3 text-5xl">🦀</div>
          <div className="animate-bounce absolute top-1/3 right-1/3 text-3xl">🐠</div>
        </div>
      )}

      {/* Price easter egg */}
      {showPriceEasterEgg && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center animate-bounce">
            <div className="text-6xl mb-4">🦀👑</div>
            <h2 className="text-2xl font-bold text-orange-600 mb-2">
              Chúc mừng! Bạn đã mở khóa Easter Egg!
            </h2>
            <p className="text-gray-600">
              Cua hoàng đế quá đắt, nhưng team dev thì vô giá! 😄
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🐟 Sản phẩm hải sản tươi sống
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập hải sản cao cấp của chúng tôi - từ đại dương đến bàn ăn của bạn
          </p>
          <div className="mt-4 text-sm text-gray-500">
            💡 <em>Mẹo: Thử nhấn mũi tên ↑↑↓↓←→←→BA để có bất ngờ!</em>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 sticky top-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🔍</span>
                <h3 className="text-lg font-semibold text-gray-800">Bộ lọc</h3>
              </div>

              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm sản phẩm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pl-10"
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Danh mục</label>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-orange-600 focus:ring-orange-500 mr-3"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Khoảng giá</label>
                <div className="space-y-3">
                  {[
                    { id: "all", name: "Tất cả giá", icon: "💰" },
                    { id: "under-500k", name: "Dưới 500.000đ", icon: "💵" },
                    { id: "500k-1m", name: "500.000đ - 1.000.000đ", icon: "💴" },
                    { id: "over-1m", name: "Trên 1.000.000đ", icon: "💎" },
                  ].map((range) => (
                    <label key={range.id} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        value={range.id}
                        checked={priceRange === range.id}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="text-orange-600 focus:ring-orange-500 mr-3"
                      />
                      <span className="mr-2">{range.icon}</span>
                      <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">
                        {range.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Tình trạng</label>
                <label className="flex items-center cursor-pointer group">
                  <input type="checkbox" className="text-orange-600 focus:ring-orange-500 mr-3" />
                  <span className="text-green-600 mr-2">✅</span>
                  <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">
                    Chỉ hiển thị còn hàng
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort and Results */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 bg-white rounded-xl p-4 shadow-sm">
              <p className="text-gray-600 flex items-center">
                <span className="mr-2">📊</span>
                Hiển thị {sortedProducts.length} / {products.length} sản phẩm
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <span className="mr-2">📋</span>
                  Sắp xếp:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="name">Tên A-Z</option>
                  <option value="price-low">Giá thấp đến cao</option>
                  <option value="price-high">Giá cao đến thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => navigate(`/product-detail/${product.id}`)}
                >
                  <div className="relative group">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Status badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.originalPrice > product.price && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                          🔥 SALE
                        </span>
                      )}
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {product.freshness}
                      </span>
                    </div>
                    
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                          ❌ Hết hàng
                        </span>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-800 text-lg leading-tight">
                        {product.name}
                      </h3>
                      <span className="text-orange-600 text-sm font-medium bg-orange-50 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                        {product.origin}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {"⭐".repeat(Math.floor(product.rating))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.rating}) • {product.reviews} đánh giá
                      </span>
                    </div>

                    {/* Product details */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4 bg-gray-50 rounded-lg p-2">
                      <span className="flex items-center">
                        <span className="mr-1">⚖️</span>
                        {product.weight}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">📍</span>
                        {product.origin}
                      </span>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span 
                          className="text-xl font-bold text-orange-600 cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => handlePriceClick(product.id)}
                        >
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      
                      <button
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all transform active:scale-95 ${
                          product.inStock
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? "🛒 Thêm vào giỏ" : "❌ Hết hàng"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg">
                <span className="mr-2">🌊</span>
                Xem thêm sản phẩm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}