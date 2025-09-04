import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"

const HeroSection = () => {
  const slides = [
    {
      title: "Hải sản tươi sống",
      subtitle: "Giao hàng hàng ngày",
      desc: "Khám phá bộ sưu tập hải sản tươi ngon nhất...",
      img: "/assets/backgr_1.jpg",
    },
    {
      title: "Đấu giá trực tuyến",
      subtitle: "Trải nghiệm trực tiếp",
      desc: "Tham gia phiên đấu giá hải sản với giá cực tốt...",
      img: "/assets/backgr_2.png",
    },
    {
      title: "Khuyến mãi đặc biệt",
      subtitle: "Giảm giá sốc",
      desc: "Cơ hội sở hữu hải sản tươi ngon với ưu đãi hấp dẫn...",
      img: "/discount-seafood.png",
    },
  ]

  return (
    <section className="relative h-screen bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
      <Swiper spaceBetween={50} slidesPerView={1} loop autoplay={{ delay: 4000, disableOnInteraction: false }} modules={[Autoplay]}>
        {slides.map((s, idx) => (
          <SwiperSlide key={idx}>
            {/* Lớp wrapper ép full màn hình + căn giữa theo dọc */}
            <div className="h-screen flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left */}
                <div className="space-y-8">
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                    {s.title}
                    <span className="text-amber-600 block">{s.subtitle}</span>
                  </h1>
                  <p className="text-lg text-gray-600 max-w-lg leading-relaxed">{s.desc}</p>
                </div>

                {/* Right */}
                <div className="flex justify-center">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full max-w-[90%] aspect-[4/3] object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )

}

export default HeroSection
