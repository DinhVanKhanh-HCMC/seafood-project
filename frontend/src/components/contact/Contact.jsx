"use client"

import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "general",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactMethods = [
    {
      title: "Yêu Cầu Chung",
      description: "Câu hỏi về sản phẩm, dịch vụ hoặc nền tảng của chúng tôi",
      email: "info@seafresh.com",
      phone: "+84 28 1234 5678",
      hours: "Thứ 2 - Thứ 6, 8:00 - 18:00",
      icon: "📧",
    },
    {
      title: "Hỗ Trợ Khách Hàng",
      description: "Hỗ trợ đơn hàng, vấn đề tài khoản hoặc sự cố kỹ thuật",
      email: "support@seafresh.com",
      phone: "+84 28 1234 5679",
      hours: "Hỗ trợ 24/7",
      icon: "🛟",
    },
    {
      title: "Cơ Hội Hợp Tác",
      description: "Quan tâm đến việc trở thành đối tác hoặc nhà cung cấp",
      email: "partnerships@seafresh.com",
      phone: "+84 28 1234 5680",
      hours: "Thứ 2 - Thứ 6, 9:00 - 17:00",
      icon: "🤝",
    },
    {
      title: "Truyền Thông & Báo Chí",
      description: "Yêu cầu báo chí, phỏng vấn và truyền thông",
      email: "press@seafresh.com",
      phone: "+84 28 1234 5681",
      hours: "Thứ 2 - Thứ 6, 9:00 - 17:00",
      icon: "📰",
    },
  ]

  

  const faqs = [
    {
      question: "Giờ giao hàng của bạn là gì?",
      answer: "Chúng tôi giao hàng từ Thứ 2 đến Thứ 7, 8:00 - 18:00. Giao hàng Chủ Nhật có sẵn tại một số khu vực.",
    },
    {
      question: "Hải sản có tươi không?",
      answer: "Tất cả hải sản được đánh bắt trong vòng 24-48 giờ trước khi giao. Chúng tôi cam kết độ tươi tối đa hoặc hoàn tiền.",
    },
    {
      question: "Bạn có giao hàng toàn quốc không?",
      answer: "Có, chúng tôi giao hàng toàn quốc bằng bao bì giữ nhiệt để đảm bảo độ tươi.",
    },
    {
      question: "Tôi có thể hủy hoặc chỉnh sửa giá thầu đấu giá không?",
      answer: "Bạn có thể chỉnh sửa giá thầu tối đa 30 phút trước khi kết thúc đấu giá. Vui lòng liên hệ hỗ trợ ngay.",
    },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "general",
        message: "",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn với mọi thắc mắc về hải sản tươi sống, đấu giá hoặc tính năng nền tảng.
          </p>
        </div>

        {/* Emergency Contact Banner */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-12">
          <div className="flex items-center justify-center gap-4 text-center">
            <div className="text-destructive text-2xl">🚨</div>
            <div>
              <h3 className="font-semibold text-destructive">Đơn Hàng Khẩn Cấp?</h3>
              <p className="text-sm text-muted-foreground">
                Đối với đơn hàng khẩn cấp hoặc vấn đề giao hàng, gọi số nóng:{" "}
                <a href="tel:+842812345999" className="font-medium text-destructive hover:underline">
                  +84 28 1234 5999
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-card rounded-xl p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">Gửi Tin Nhắn Cho Chúng Tôi</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Họ và Tên *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="email@domain.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Số Điện Thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="+84 912 345 678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Danh Mục</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="general">Yêu cầu chung</option>
                    <option value="support">Hỗ trợ khách hàng</option>
                    <option value="partnership">Hợp tác</option>
                    <option value="press">Truyền thông & báo chí</option>
                    <option value="feedback">Góp ý</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Tiêu Đề *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Nhập tiêu đề"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Tin Nhắn *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Vui lòng nhập chi tiết yêu cầu của bạn..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi Tin Nhắn"}
              </button>
            </form>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Liên Lạc</h2>
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-card rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{method.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">{method.title}</h3>
                    <p className="text-muted-foreground mb-3">{method.description}</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Email:</span>
                        <a href={`mailto:${method.email}`} className="text-primary hover:underline">
                          {method.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">SĐT:</span>
                        <a href={`tel:${method.phone}`} className="text-primary hover:underline">
                          {method.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Giờ làm việc:</span>
                        <span className="text-muted-foreground">{method.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

       

        

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Câu Hỏi Thường Gặp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Social Media & Additional Info */}
        <section>
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Kết Nối Với Chúng Tôi</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Theo dõi chúng tôi trên mạng xã hội để cập nhật tin tức, sản phẩm mới và nội dung hậu trường từ đối tác.
            </p>
            <div className="flex justify-center gap-4 mb-6">
              {[
                { name: "Facebook", icon: "📘" },
                { name: "Instagram", icon: "📷" },
                { name: "Twitter", icon: "🐦" },
                { name: "LinkedIn", icon: "💼" },
                { name: "YouTube", icon: "📺" },
              ].map((social, index) => (
                <button
                  key={index}
                  className="bg-background hover:bg-muted p-3 rounded-lg transition-colors"
                  title={social.name}
                >
                  <span className="text-2xl">{social.icon}</span>
                </button>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Giờ Làm Việc: Thứ 2 - Thứ 6, 8:00 - 18:00</p>
              <p>Hỗ Trợ Cuối Tuần: Thứ 7, 9:00 - 15:00</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
