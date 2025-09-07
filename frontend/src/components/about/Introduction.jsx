import Navigation from "../header/Navigation"
import Wave from "react-wavify"
import image_1 from '../../../public/assets/image_introduction1.jpg'
import image_2 from '../../../public/assets/image_introduction2.jpg'
import image_3 from '../../../public/assets/image_introduction3.jpg'
import image_4 from '../../../public/assets/image_introduction4.jpg'
import image_5 from '../../../public/assets/image_introduction5.jpg'
import image_6 from '../../../public/assets/image_introduction6.jpg'


// Simple Wave Component
function WaveAnimation({ className }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
          <path
            d="M0,20 C100,60 300,0 400,30 L400,100 L0,100 Z"
            fill="currentColor"
            className="animate-pulse"
          />
        </svg>
      </div>
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
          <path
            d="M0,40 C150,80 250,10 400,50 L400,100 L0,100 Z"
            fill="currentColor"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>
    </div>
  )
}

export default function IntroductionPage() {
   const values = [
    {
      title: "Cua Cà Mau Chính Gốc",
      description: "100% cua tự nhiên từ vùng ngập mặn Cà Mau - đặc sản nổi tiếng thế giới với thịt ngọt, thơm đậm đà.",
      icon: "🦀",
    },
    {
      title: "Nuôi Trồng Bền Vững",
      description: "Áp dụng kỹ thuật nuôi cua sinh thái, bảo vệ môi trường rừng tràm U Minh và hệ sinh thái vùng ngập mặn.",
      icon: "🌿",
    },
    {
      title: "Tươi Sống Từ Ao Nuôi",
      description: "Cua được thu hoạch và vận chuyển sống, đảm bảo độ tươi ngon tối đa khi đến tay khách hàng.",
      icon: "⚡",
    },
    {
      title: "Chứng Nhận Chất Lượng",
      description: "Đạt tiêu chuẩn VietGAP, xuất khẩu quốc tế. Mỗi con cua đều có nguồn gốc xuất xứ rõ ràng.",
      icon: "🏆",
    },
  ]
  const crabSpecs = [
    {
      title: "Cua Gạch",
      description: "Cua cái có gạch, thịt ngọt béo, gạch đậm đà",
      weight: "300-500g/con",
      price: "600.000đ - 800.000đ/kg",
      season: "Tháng 9 - Tháng 3",
    },
    {
      title: "Cua Thịt",
      description: "Cua đực to khỏe, mai cứng, thịt chắc ngọt",
      weight: "400-700g/con", 
      price: "400.000đ - 550.000đ/kg",
      season: "Quanh năm",
    },
    {
      title: "Cua Cốm",
      description: "Cua non mai mềm, thịt ngọt thanh, thích hợp rang me",
      weight: "150-250g/con",
      price: "700.000đ - 900.000đ/kg", 
      season: "Tháng 4 - Tháng 8",
    },
  
  ]

  const categories = [
    {
      name: "Tôm sú",
      image: image_1,
      href: "/products?category=fish",
    },
    {
      name: "Ghẹ",
      image: image_2,
      href: "/products?category=shellfish",
    },
    {
      name: "Ốc móng tay",
      image: image_3,
      href: "/products?category=salmon",
    },
    {
      name: "Cá lóc bông",
      image: image_4,
      href: "/products?category=tuna",
    },
    {
      name: "Hàu sữa",
      image: image_5,
      href: "/products?category=shrimp",
    },
    {
      name: "Cá mú",
      image: image_6,
      href: "/products?category=oysters",
    }
  ]

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Hero Section - Crab Focus */}
      <section className="py-20 px-4 bg-gradient-to-r bg-orange-50  text-gray-950 relative overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl animate-bounce">🦀</div>
          <div className="absolute bottom-20 right-20 text-7xl animate-pulse">🦀</div>
          <div className="absolute top-1/2 left-1/4 text-6xl animate-bounce" style={{ animationDelay: "1s" }}>🦀</div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium mb-4">
              🏆 Đặc sản xuất khẩu hàng đầu Việt Nam
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="block text-orange-500">CUA CÀ MAU</span>
            <span className="block text-2xl md:text-3xl font-medium mt-2">Tinh hoa vùng ngập mặn</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
            SeaFresh tự hào là nhà cung cấp <span className="font-bold text-orange-500">cua Cà Mau chính gốc</span> 
            - đặc sản nổi tiếng với thịt ngọt béo, gạch đậm đà, được nuôi trồng bền vững 
            trong môi trường tự nhiên vùng ngập mặn U Minh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 text-gray-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              🦀 Đặt Cua Tươi Sống Ngay
            </button>
            <button className="bg-yellow-400 text-gray-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-500 transition-all duration-300">
              📹 Xem Live Stream Từ Ao Nuôi
            </button>
          </div>
        </div>
        <WaveAnimation className="absolute bottom-0 left-0 w-full h-20 text-orange-50" />
      </section>
      {/* Crab Specifications Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              <span className="text-orange-600">🦀</span> Các loại cua Cà Mau
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Từ cua gạch béo ngậy đến cua đồng thịt chắc, chúng tôi cung cấp đầy đủ các loại cua Cà Mau chất lượng cao nhất
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-right">
            {crabSpecs.map((crab, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100 group hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">🦀</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{crab.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{crab.description}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/80 p-3 rounded-lg">
                    <span className="font-medium text-gray-700">Kích thước:</span>
                    <span className="font-bold text-orange-600">{crab.weight}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/80 p-3 rounded-lg">
                    <span className="font-medium text-gray-700">Giá bán:</span>
                    <span className="font-bold text-green-600">{crab.price}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/80 p-3 rounded-lg">
                    <span className="font-medium text-gray-700">Mùa vụ:</span>
                    <span className="font-bold text-blue-600">{crab.season}</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105">
                  Đặt {crab.title} Ngay
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Story Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                Câu chuyện của <span className="text-orange-600">Cua Cà Mau</span>
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  SeaFresh được thành lập vào năm 2018 bởi Thuyền trưởng Nguyễn Minh Hải - người con của vùng đất Cà Mau 
                  với tình yêu sâu sắc dành cho đặc sản cua nổi tiếng quê hương. Khởi đầu từ ý tưởng đơn giản: làm sao 
                  để cua Cà Mau chính gốc, tươi sống có thể đến tay người tiêu dùng ở khắp mọi nơi.
                </p>
                <p>
                  Từ 5 ao nuôi cua nhỏ ở huyện Ngọc Hiển, chúng tôi đã phát triển thành hệ thống trang trại nuôi cua 
                  sinh thái lớn nhất miền Tây với hơn 500 hecta ao nuôi. Công nghệ livestream và hệ thống đấu giá của 
                  chúng tôi cho phép khách hàng theo dõi cua từ lúc còn trong ao đến khi thu hoạch.
                </p>
                <p>
                  Ngày nay, cua Cà Mau của SeaFresh không chỉ được yêu thích trong nước mà còn xuất khẩu đi nhiều quốc gia, 
                  mang tên tuổi đặc sản Việt Nam vươn ra thế giới, đồng thời tạo việc làm cho hàng nghìn nông dân địa phương.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-10 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500">500+</div>
                  <div className="text-gray-600 font-medium">Hecta ao nuôi</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500">50.000+</div>
                  <div className="text-gray-600 font-medium">Con cua/tháng</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500">20+</div>
                  <div className="text-gray-600 font-medium">Nước xuất khẩu</div>
                </div>
              </div>
            </div >
            <div className="relative" data-aos="fade-left">
              <div className="bg-gradient-to-br from-blue-500 to-teal-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-4 right-4 text-white/30 text-8xl">🦀</div>
                <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm relative z-10">
                  <WaveAnimation className="w-full h-64 text-white" />
                  <div className="mt-6 text-center">
                    <p className="text-white font-bold text-lg">Trang trại nuôi cua đầu tiên của SeaFresh</p>
                    <p className="text-white/80">Huyện Ngọc Hiển, Cà Mau - 2018</p>
                    <div className="mt-4 flex justify-center gap-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-right">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Cam kết <span className="text-orange-600">Chất lượng Cua Cà Mau</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những tiêu chuẩn nghiêm ngặt này đảm bảo mỗi con cua Cà Mau đến tay bạn đều đạt chất lượng xuất khẩu
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-left">
            {values.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 text-center hover:from-orange-100 hover:to-yellow-100 transition-all duration-300 shadow-lg hover:shadow-2xl group hover:-translate-y-2 border border-orange-100">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

        

        {/* Mission Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-orange-100 via-red-100 to-yellow-100 rounded-3xl p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 text-9xl">🦀</div>
              <div className="absolute bottom-10 right-10 text-9xl">🦀</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-12xl">🦀</div>
            </div>
            <div className="text-center relative z-10" data-aos="fade-down">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                Sứ mệnh <span className="text-orange-600">Cua Cà Mau</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
                Đưa cua Cà Mau chính gốc - đặc sản tự nhiên của vùng đất mũi Cà Mau - đến mọi gia đình Việt Nam và bạn bè quốc tế, 
                đồng thời xây dựng chuỗi giá trị bền vững giúp nông dân địa phương có cuộc sống tốt đẹp hơn, bảo vệ môi trường 
                sinh thái vùng ngập mặn U Minh cho các thế hệ tương lai.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-orange-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  🦀 Đặt Cua Cà Mau Ngay
                </button>
                <button className="bg-white text-orange-600 border-2 border-orange-500 px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all duration-300">
                  📞 Liên Hệ Tư Vấn
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Statistics Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto" data-aos="fade-right">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Con số ấn tượng của Cua Cà Mau SeaFresh</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-yellow-300 mb-3">500+</div>
              <div className="text-white/90 font-medium">Hecta ao nuôi cua</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-yellow-300 mb-3">50.000+</div>
              <div className="text-white/90 font-medium">Con cua xuất bán/tháng</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-yellow-300 mb-3">20+</div>
              <div className="text-white/90 font-medium">Nước xuất khẩu</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-yellow-300 mb-3">24h</div>
              <div className="text-white/90 font-medium">Thời gian từ ao đến bàn</div>
            </div>
          </div>
        </div>
      </section>

            {/* Categories Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Sản phẩm khác ngoài <span className="text-orange-600">Cua Cà Mau</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ngoài cua, SeaFresh còn cung cấp nhiều loại hải sản tươi sống chất lượng cao khác, 
              được lựa chọn kỹ lưỡng từ ngư dân và vùng biển Việt Nam.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8" data-aos="fade-right">
            {categories.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-full h-40 bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600">
                    {item.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>


        {/* Sustainability Section */}
        <section className="py-16 px-4 bg-orange-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative"  data-aos="fade-right">
                <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-8 shadow-2xl">
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <Wave fill="white" paused={false} className="w-full h-64 opacity-80" 
                      options={{
                        height: 20,
                        amplitude: 30,
                        speed: 0.25,
                        points: 4,
                      }}/>
                    <div className="mt-4 text-center">
                      <p className="text-white/90 font-medium">Đánh bắt bền vững</p>
                      <p className="text-white/70 text-sm">Bảo vệ đại dương cho tương lai</p>
                    </div>
                  </div>
                </div>
              </div>
              <div data-aos="fade-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Cam kết về tính bền vững</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Chúng tôi tin rằng tương lai của hải sản phụ thuộc vào các thực hành đánh bắt bền vững. 
                    Đó là lý do tại sao chúng tôi cẩn thận kiểm tra tất cả các đối tác ngư dân để đảm bảo họ 
                    tuân theo các phương pháp có trách nhiệm bảo vệ hệ sinh thái biển.
                  </p>
                  <p>
                    Chương trình bền vững của chúng tôi bao gồm các hạn chế đánh bắt theo mùa, quản lý hạn ngạch 
                    và hỗ trợ cho các sáng kiến bảo tồn biển. Chúng tôi tự hào là thành viên của Đối tác Thủy sản 
                    Bền vững và đóng góp 2% lợi nhuận cho các nỗ lực bảo tồn đại dương.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-600 font-bold">✓</span>
                        </div>
                        <span className="font-semibold text-gray-800">Hạn chế theo mùa</span>
                      </div>
                      <p className="text-sm text-gray-600">Tuân thủ thời vụ sinh sản tự nhiên</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-600 font-bold">✓</span>
                        </div>
                        <span className="font-semibold text-gray-800">Quản lý hạn ngạch</span>
                      </div>
                      <p className="text-sm text-gray-600">Kiểm soát số lượng đánh bắt</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                    Tìm hiểu thêm về thực hành của chúng tôi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        
      </div>
    );
}
