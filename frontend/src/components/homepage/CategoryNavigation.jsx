const CategoryNavigation = () => {
  const categories = [
    {
      name: "Cá tươi",
      image: "/fresh-fish-on-ice.png",
      href: "/products?category=fish",
    },
    {
      name: "Tôm cua",
      image: "/fresh-lobster-and-crab.png",
      href: "/products?category=shellfish",
    },
    {
      name: "Cá hồi",
      image: "/fresh-salmon-fillet.png",
      href: "/products?category=salmon",
    },
    {
      name: "Cá ngừ",
      image: "/fresh-tuna-steak.png",
      href: "/products?category=tuna",
    },
    {
      name: "Tôm",
      image: "/fresh-jumbo-shrimp.png",
      href: "/products?category=shrimp",
    },
    {
      name: "Hàu",
      image: "/fresh-oysters-on-half-shell.png",
      href: "/products?category=oysters",
    },
    {
      name: "Đấu giá",
      image: "/auction-gavel-with-seafood.png",
      href: "/auction",
    },
    {
      name: "Livestream",
      image: "/live-streaming-camera-with-seafood-market.png",
      href: "/livestreaming",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Khám phá bộ sưu tập của chúng tôi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lựa chọn từ bộ sưu tập đa dạng với những sản phẩm hải sản tốt nhất được lấy trực tiếp từ những ngư dân và
            nhà cung cấp đáng tin cậy.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.href}
              className="group flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="w-20 h-20 mb-3 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-amber-600 transition-colors duration-200">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center group-hover:text-amber-600 transition-colors duration-200">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryNavigation
