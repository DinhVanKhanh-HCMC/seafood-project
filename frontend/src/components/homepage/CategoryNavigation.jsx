const CategoryNavigation = () => {
  const crabCategories = [
    { name: "Cua gạch", image: "/assets/cuagach.jpg", href: "/products?category=crab-roe", desc: "Cua cái nhiều gạch son, béo bùi và giàu dinh dưỡng." },
    { name: "Cua thịt", image: "/assets/cuathit.jpg", href: "/products?category=crab-meat", desc: "Cua đực nhiều thịt, chắc khỏe, vị ngọt đậm đà." },
    { name: "Cua gốm", image: "/assets/cuacom.jpg", href: "/products?category=crab-rice" },
    
  ]

  const seafoodCategories = [
    { name: "Tôm Cà Mau", image: "/assets/tomcamau.jpg", href: "/products?category=ca-mau-shrimp" },
    { name: "Mực Cà Mau", image: "/assets/muccamau.jpg", href: "/products?category=ca-mau-squid" },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* --- Giới thiệu chung --- */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cùng khám phá bộ sưu tập cua và hải sản Cà Mau của chúng tôi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tận hưởng hương vị tươi ngon từ biển Cà Mau – từ cua gạch béo ngậy, cua thịt chắc ngọt, 
            đến tôm, mực và nhiều loại hải sản đặc sản khác, tất cả đều được chọn lọc kỹ càng từ ngư dân địa phương.
          </p>
        </div>

        {/* --- Phần Cua --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bên trái: Giới thiệu */}
          <div data-aos="fade-right">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Cua Cà Mau</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Cua Cà Mau nổi tiếng khắp Việt Nam nhờ hương vị đậm đà, thịt chắc ngọt và giá trị dinh dưỡng cao. 
              Được đánh bắt trực tiếp từ vùng biển Cà Mau, mỗi loại cua đều mang hương vị riêng biệt.
            </p>
            <a
              href="/products?category=crabs"
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-amber-700 transition-colors shadow-md"
            >
              Khám phá ngay
            </a>
          </div>

          {/* Bên phải: 3 loại cua */}
          <div className="grid grid-cols-1 gap-6" data-aos="fade-left">
            {crabCategories.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-amber-600 hover:bg-gray-50 transition-all"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-amber-600 transition-colors">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                  />
                </div>
                <div>
                  <span className="text-lg font-medium text-gray-700 group-hover:text-amber-600 transition-colors">
                    {item.name}
                  </span>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* --- Phần Hải sản khác --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bên trái: Giới thiệu */}
          <div data-aos="fade-right">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Hải sản Cà Mau khác</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Không chỉ nổi tiếng với cua, Cà Mau còn là vùng đất của nhiều loại hải sản tươi ngon như tôm và mực. 
              Đây là những sản phẩm được ngư dân khai thác thủ công, đảm bảo chất lượng và hương vị tự nhiên.
            </p>
            <a
              href="/products?category=seafood"
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-amber-700 transition-colors shadow-md"
            >
              Xem thêm hải sản
            </a>
          </div>

          {/* Bên phải: Tôm + Mực */}
          <div className="grid grid-cols-2 gap-6" data-aos="fade-left">
            {seafoodCategories.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group flex flex-col items-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-gray-100 transition-all"
              >
                <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-amber-600 transition-colors">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                  />
                </div>
                <span className="text-base font-semibold text-gray-700 text-center group-hover:text-amber-600 transition-colors">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryNavigation
