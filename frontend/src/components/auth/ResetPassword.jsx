"use client"

const ResetPasswordForm = ({ onSubmit, isLoading, errors, formData, handleInputChange, onBack }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Nút quay lại */}
      <div className="flex items-center mb-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center text-amber-600 hover:text-amber-700 font-medium"
        >
          ← Quay lại
        </button>
      </div>

      {/* Tiêu đề */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">Đặt lại mật khẩu</h2>
        <p className="text-neutral-600 mt-2">Vui lòng nhập mật khẩu mới cho tài khoản của bạn</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Mật khẩu mới *</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
            errors.password ? "border-red-500" : "border-neutral-300"
          }`}
          placeholder="Nhập mật khẩu mới"
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
          placeholder="Nhập lại mật khẩu mới"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
      </button>
    </form>
  )
}

export default ResetPasswordForm