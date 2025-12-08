import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ApiService from "../../services/apis"
import { useAddToCart } from "../hooks/useAddToCart";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [searchQuery, setSearchQuery] = useState("")
  const [fishEasterEgg, setFishEasterEgg] = useState(false)
  const [konamiSequence, setKonamiSequence] = useState([])
  const [showPriceEasterEgg, setShowPriceEasterEgg] = useState(false)
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const { addToCart, loading } = useAddToCart();
  const [loadingProduct, setLoadingProduct] = useState(true);

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

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // gọi API lấy tất cả sản phẩm
        const productRes = await ApiService.getAllProduct();
        setProducts(productRes.data);

        // gọi API lấy danh mục
        const categoryRes = await ApiService.getAllCategory();
        setCategories([{ id: "all", name: "Tất cả sản phẩm" }, ...categoryRes.data]);
      } catch (err) {
        console.error("Lỗi khi fetch:", err);
      }finally{
        setLoadingProduct(false)
      }
    };

    fetchData();
  }, []);

  const filteredProducts =
  selectedCategory === "all"
    ? products
    : products.filter(p => p.categoryId === selectedCategory);

  // const products = [
  //   {
  //     id: 1,
  //     name: "Phi lê cá hồi Đại Tây Dương",
  //     category: "salmon",
  //     price: 599000,
  //     originalPrice: 719000,
  //     image: `${import.meta.env.BASE_URL}assets/cuagach.jpg`,
  //     rating: 4.8,
  //     reviews: 124,
  //     inStock: true,
  //     weight: "500g",
  //     origin: "Na Uy",
  //     description: "Cá hồi Đại Tây Dương cao cấp, nuôi bền vững",
  //     freshness: "Siêu tươi",
  //   },
  // ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

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

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        {/* <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🐟 Sản phẩm hải sản tươi sống
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập hải sản cao cấp của chúng tôi - từ đại dương đến bàn ăn của bạn
          </p>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
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
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort and Results */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 bg-white rounded-xl p-4 shadow-sm">
              <p className="text-gray-600 flex items-center">
                <span className="mr-2">📊</span>
                Hiển thị {visibleProducts.length} / {products.length} sản phẩm
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
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => navigate(`/product-detail/${product.id}`)}
                >
                  <div className="relative group">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
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
                        {"Siêu tươi"}
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
                        {"⭐".repeat(Math.floor(product.avgRating))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.avgRating}) • {product.reviewCount} đánh giá
                      </span>
                    </div>

                    {/* Product details */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4 bg-gray-50 rounded-lg p-2">
                      <span className="flex items-center">
                        <span className="mr-1">⚖️</span>
                        {product.weight} kg
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
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product,1);
                        }}
                        disabled={!product?.inStock || loading}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all transform active:scale-95 ${
                          product.inStock
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}

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
              <button 
                onClick={() => setVisibleCount(sortedProducts.length)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg">
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