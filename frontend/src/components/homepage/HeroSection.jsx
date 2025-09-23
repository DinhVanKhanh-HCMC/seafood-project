import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import { motion, AnimatePresence } from "framer-motion"

const HeroSection = () => {

  const [activeIndex, setActiveIndex] = useState(0)

  const slides = [
    {
      title: "Cua Cà Mau tươi ngon",
      subtitle: "Giao hàng hàng ngày",
      desc: "Khám phá bộ sưu tập cua tươi sống từ Cà Mau...",
      img: `${import.meta.env.BASE_URL}assets/slide-1.jpg`,
      buttonText: "Xem ngay",
      buttonLink: "#cua-ca-mau"
    },
    {
      title: "Livestream bán cua",
      subtitle: "Trải nghiệm mua sắm trực tuyến",
      desc: "Tham gia buổi livestream để mua cua tươi ngon với giá tốt!",
      img: `${import.meta.env.BASE_URL}assets/slide-2.jpg`,
      buttonText: "Tham gia ngay",
      buttonLink: "#livestream"
    },
    {
      title: "Đấu giá trực tuyến",
      subtitle: "Cơ hội sở hữu cua chất lượng",
      desc: "Tham gia phiên đấu giá cua độc quyền, giá cực tốt...",
      img: `${import.meta.env.BASE_URL}assets/backgr_2.png`,
      buttonText: "Đấu giá ngay",
      buttonLink: "#auction"
    },
    {
      title: "Khuyến mãi đặc biệt",
      subtitle: "Giảm giá sốc",
      desc: "Sở hữu cua Cà Mau với ưu đãi hấp dẫn...",
      img: `${import.meta.env.BASE_URL}assets/slide-4.jpg`,
      buttonText: "Khám phá các ưu đãi",
      buttonLink: "#promotions"
    },
  ]

  return (
    <section
      className="relative h-screen overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}assets/background_hero.jpg)` }} // 👈 ảnh nền
    >
      {/* overlay màu phủ lên ảnh nền */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-50/80"></div>

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        speed={1000}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="relative z-10"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={idx}>
            <div className="h-screen flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left */}
                {activeIndex === idx && (
                  <motion.div
                    key={s.title + idx + activeIndex}
                    className="space-y-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                      {s.title}
                      <span className="text-amber-600 block">{s.subtitle}</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                      {s.desc}
                    </p>
                    <a
                      href={s.buttonLink}
                      className="mt-4 inline-block px-6 py-2 text-white bg-amber-600 rounded-md shadow-md hover:bg-amber-700 transition"
                    >
                      {s.buttonText}
                    </a>
                  </motion.div>
                )}

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