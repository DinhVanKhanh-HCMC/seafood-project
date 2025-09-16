"use client"

const RegisterForm = ({ onSubmit, isLoading, errors, formData, handleInputChange, onBack }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Nút quay lại */}
      {onBack && (
        <div className="flex items-center mb-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-amber-600 hover:text-amber-700 font-medium"
          >
            ← Quay lại
          </button>
        </div>
      )}

      {/* Tiêu đề */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">Hoàn tất đăng ký</h2>
        <p className="text-neutral-600 mt-2">Vui lòng điền thông tin còn lại để hoàn tất đăng ký</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Họ tên *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
            errors.name ? "border-red-500" : "border-neutral-300"
          }`}
          placeholder="Nhập họ tên"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          className="w-full border border-neutral-300 rounded-lg px-3 py-2 bg-gray-100"
          placeholder="Email"
          disabled
        />
        <p className="text-sm text-green-600 mt-1">Email đã được xác thực</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Số điện thoại *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
            errors.phone ? "border-red-500" : "border-neutral-300"
          }`}
          placeholder="Nhập số điện thoại"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Mật khẩu *</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
            errors.password ? "border-red-500" : "border-neutral-300"
          }`}
          placeholder="Nhập mật khẩu"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Xác nhận mật khẩu *</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
            errors.confirmPassword ? "border-red-500" : "border-neutral-300"
          }`}
          placeholder="Nhập lại mật khẩu"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>

      <div>
        <label className="flex items-center">
          <input 
            type="checkbox" 
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="text-amber-600 focus:ring-amber-500" 
          />
          <span className="ml-2 text-sm text-neutral-700">Tôi đồng ý với điều khoản sử dụng</span>
        </label>
        {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Đang xử lý..." : "Hoàn tất đăng ký"}
      </button>
    </form>
  )
}

export default RegisterForm