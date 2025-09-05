import Navigation from "../header/Navigation.jsx"
import HeroSection from "./HeroSection.jsx"
import CategoryNavigation from "./CategoryNavigation.jsx"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
        <div className="h-screen flex flex-col">
            <HeroSection />
        </div>
      
        <CategoryNavigation />

      {/* Featured Products Section - Crabs */}
      <section className="py-16 bg-white slide-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cua Cà Mau tươi sống</h2>
            <p className="text-gray-600">Được chọn lọc kỹ càng, giao tận nơi tươi ngon</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Cua có gạch",
                price: "620.000₫",
                originalPrice: "750.000₫",
                image: "/crab-with-roe.png",
                rating: 4.8,
                inStock: true,
              },
              {
                name: "Cua thịt",
                price: "1.150.000₫",
                originalPrice: "1.320.000₫",
                image: "/crab-with-meat.png",
                rating: 4.9,
                inStock: true,
              },
              {
                name: "Cua cơm",
                price: "475.000₫",
                originalPrice: "575.000₫",
                image: "/crab-with-rice.png",
                rating: 4.7,
                inStock: false,
              },
              {
                name: "Cua mềm",
                price: "825.000₫",
                originalPrice: "975.000₫",
                image: "/soft-shell-crab.png",
                rating: 4.8,
                inStock: true,
              },
            ].map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 border border-gray-200"
              >
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Hết hàng
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">{"★".repeat(Math.floor(product.rating))}</div>
                    <span className="text-sm text-gray-500">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-amber-600">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        product.inStock
                          ? "bg-amber-600 text-white hover:bg-amber-700"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Other Seafood */}
      <section className="py-16 bg-white slide-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hải sản Cà Mau khác</h2>
            <p className="text-gray-600">Đa dạng hải sản tươi ngon từ Cà Mau</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Tôm sú Cà Mau",
                price: "550.000₫",
                originalPrice: "650.000₫",
                image: "/ca-mau-shrimp.png",
                rating: 4.7,
                inStock: true,
              },
              {
                name: "Mực nang Cà Mau",
                price: "700.000₫",
                originalPrice: "850.000₫",
                image: "/ca-mau-squid.png",
                rating: 4.6,
                inStock: true,
              },
            ].map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 border border-gray-200"
              >
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Hết hàng
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">{"★".repeat(Math.floor(product.rating))}</div>
                    <span className="text-sm text-gray-500">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-amber-600">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        product.inStock
                          ? "bg-amber-600 text-white hover:bg-amber-700"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-gray-50 slide-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bài viết về cua Cà Mau</h2>
            <p className="text-gray-600">Khám phá các bài viết thú vị về cua Cà Mau</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Cách chọn cua tươi</h3>
              <p className="text-gray-600">Hướng dẫn chọn cua Cà Mau chất lượng cao.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Món ngon từ cua</h3>
              <p className="text-gray-600">Các công thức nấu ăn hấp dẫn với cua Cà Mau.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Lợi ích sức khỏe</h3>
              <p className="text-gray-600">Tìm hiểu lợi ích dinh dưỡng từ cua Cà Mau.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Livestream Introduction Section */}
      <section className="py-16 bg-white slide-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Livestream cua Cà Mau</h2>
            <p className="text-gray-600">Trải nghiệm mua sắm trực tiếp cua tươi ngon</p>
          </div>
          <div className="flex justify-center">
            <button className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
              Tham gia livestream
            </button>
          </div>
        </div>
      </section>

      {/* Live Auction Section */}
      <section className="py-16 bg-gray-50 slide-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Đấu giá cua Cà Mau trực tuyến</h2>
                <p className="text-gray-600 mb-6">
                  Tham gia đấu giá trực tuyến và đặt giá cho những con cua Cà Mau tươi nhất từ thuyền đánh cá.
                  Nhận hải sản cao cấp với giá cạnh tranh.
                </p>
                <div className="flex gap-4">
                  <button className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                    Tham gia đấu giá
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Xem livestream
                  </button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/assets/live-homepage.jpg"
                  alt="Đấu giá cua trực tuyến"
                  className="w-full h-auto rounded-xl"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  TRỰC TIẾP
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
