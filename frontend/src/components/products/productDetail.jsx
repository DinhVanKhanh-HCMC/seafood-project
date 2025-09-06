"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"


export default function ProductDetailPage() {
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })

  // Mock product data - in real app, fetch by ID
  const product = {
    id: 1,
    name: "Cá Hồi Atlantic Phi Lê",
    category: "salmon",
    price: 599000,
    originalPrice: 719000,
    images: [
      "/assets/cuathit.jpg",
      "/fresh-salmon-fillet.png",
      "/fresh-salmon-fillet-on-ice-with-herbs-and-lemon.png",
    ],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    weight: "1 kg",
    origin: "Na Uy",
    description:
      "Cá hồi Atlantic cao cấp, nuôi bền vững từ vùng biển lạnh Na Uy. Thịt cá chắc, ngọt tự nhiên, giàu Omega-3.",
    specifications: {
      "Loại sản phẩm": "Phi lê cá hồi tươi",
      "Xuất xứ": "Na Uy",
      "Trọng lượng": "1 kg",
      "Bảo quản": "Nhiệt độ 0-4°C",
      "Hạn sử dụng": "3 ngày kể từ ngày mua",
      "Chứng nhận": "ASC - Nuôi trồng thủy sản bền vững",
    },
    nutritionFacts: {
      Calories: "208 kcal/100g",
      Protein: "25.4g",
      "Chất béo": "11g",
      "Omega-3": "2.3g",
      "Vitamin D": "526 IU",
    },
  }

  const reviews = [
    {
      id: 1,
      user: "Nguyễn Minh Anh",
      rating: 5,
      date: "2024-01-15",
      comment: "Cá hồi rất tươi ngon, thịt chắc và ngọt. Đóng gói cẩn thận, giao hàng nhanh. Sẽ mua lại!",
      helpful: 12,
    },
    {
      id: 2,
      user: "Trần Văn Hùng",
      rating: 4,
      date: "2024-01-10",
      comment: "Chất lượng tốt, giá hợp lý. Làm sashimi rất ngon. Chỉ có điều muốn có thêm size nhỏ hơn.",
      helpful: 8,
    },
    {
      id: 3,
      user: "Lê Thị Mai",
      rating: 5,
      date: "2024-01-08",
      comment: "Cá tươi, không tanh. Nướng lên thơm lắm. Shop đóng gói kỹ, có đá khô giữ lạnh.",
      helpful: 15,
    },
  ]

  const relatedProducts = [
    {
      id: 2,
      name: "Tôm Hùm Maine",
      price: 1099000,
      image: "/fresh-maine-lobster.png",
      rating: 4.9,
    },
    {
      id: 4,
      name: "Bít Tết Cá Ngừ Tươi",
      price: 789000,
      image: "/fresh-tuna-steak.png",
      rating: 4.8,
    },
    {
      id: 8,
      name: "Phi Lê Cá Chẽm",
      price: 549000,
      image: "/fresh-sea-bass-fillet.png",
      rating: 4.5,
    },
  ]

  const handleAddToCart = () => {
    // Add to cart logic
    alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng`)
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    // Submit review logic
    alert("Cảm ơn bạn đã đánh giá sản phẩm!")
    setNewReview({ rating: 5, comment: "" })
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
          <a href="/products" className="hover:text-amber-600">
            Sản phẩm
          </a>
          <span>/</span>
          <span className="text-neutral-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-amber-500" : "border-neutral-200"
                  }`}
                >
                  <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">{"★".repeat(Math.floor(product.rating))}</div>
                  <span className="text-neutral-600">({product.rating})</span>
                </div>
                <span className="text-neutral-600">{product.reviews} đánh giá</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.inStock ? "Còn hàng" : "Hết hàng"}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-amber-600">{product.price.toLocaleString()}₫</span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-neutral-500 line-through">{product.originalPrice.toLocaleString()}₫</span>
              )}
            </div>

            <p className="text-neutral-700 leading-relaxed">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-neutral-900">Trọng lượng:</span>
                <span className="ml-2 text-neutral-600">{product.weight}</span>
              </div>
              <div>
                <span className="font-medium text-neutral-900">Xuất xứ:</span>
                <span className="ml-2 text-neutral-600">{product.origin}</span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-neutral-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-neutral-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-neutral-300">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-neutral-100">
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Thêm vào giỏ hàng
              </button>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 border border-neutral-300 text-neutral-700 px-6 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors">
                Mua ngay
              </button>
              <button className="px-6 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                ♡
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl p-8 mb-12">
          <div className="border-b border-neutral-200 mb-8">
            <nav className="flex space-x-8">
              {[
                { id: "description", label: "Mô tả sản phẩm" },
                { id: "specifications", label: "Thông số kỹ thuật" },
                { id: "nutrition", label: "Thành phần dinh dưỡng" },
                { id: "reviews", label: "Đánh giá" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p className="text-neutral-700 leading-relaxed mb-6">{product.description}</p>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Đặc điểm nổi bật</h3>
              <ul className="space-y-2 text-neutral-700">
                <li>• Cá hồi Atlantic nuôi tại vùng biển lạnh Na Uy</li>
                <li>• Thịt cá chắc, ngọt tự nhiên, giàu Omega-3</li>
                <li>• Được chứng nhận ASC về nuôi trồng thủy sản bền vững</li>
                <li>• Đóng băng ngay sau khi đánh bắt để giữ độ tươi ngon</li>
                <li>• Thích hợp cho nhiều món ăn: nướng, chiên, làm sashimi</li>
              </ul>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-neutral-100">
                  <span className="font-medium text-neutral-900">{key}:</span>
                  <span className="text-neutral-600">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "nutrition" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.nutritionFacts).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-neutral-100">
                  <span className="font-medium text-neutral-900">{key}:</span>
                  <span className="text-neutral-600">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-8">
              {/* Review Summary */}
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-neutral-900">{product.rating}</div>
                  <div className="flex text-yellow-400 justify-center mb-2">
                    {"★".repeat(Math.floor(product.rating))}
                  </div>
                  <div className="text-sm text-neutral-600">{product.reviews} đánh giá</div>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center space-x-2">
                      <span className="text-sm text-neutral-600">{stars} sao</span>
                      <div className="flex-1 bg-neutral-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${Math.random() * 80 + 10}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write Review */}
              <form onSubmit={handleSubmitReview} className="bg-neutral-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Viết đánh giá</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Đánh giá của bạn</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`text-2xl ${star <= newReview.rating ? "text-yellow-400" : "text-neutral-300"}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Nhận xét</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      rows={4}
                      className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                  >
                    Gửi đánh giá
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-neutral-200 pb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-neutral-900">{review.user}</div>
                        <div className="flex items-center space-x-2">
                          <div className="flex text-yellow-400">{"★".repeat(review.rating)}</div>
                          <span className="text-sm text-neutral-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-neutral-700 mb-3">{review.comment}</p>
                    <div className="flex items-center space-x-4 text-sm text-neutral-500">
                      <button className="hover:text-amber-600">Hữu ích ({review.helpful})</button>
                      <button className="hover:text-amber-600">Trả lời</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-amber-600">{product.price.toLocaleString()}₫</span>
                    <div className="flex text-yellow-400">{"★".repeat(Math.floor(product.rating))}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
