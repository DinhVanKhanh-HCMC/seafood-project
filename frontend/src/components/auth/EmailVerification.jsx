"use client"
import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import ApiService from "../../services/apis";

const EmailVerification = ({ 
  initialEmail = "", 
  onVerificationComplete, 
  onBack,
  mode // 'register' or 'resetPassword'
}) => {
  const [email, setEmail] = useState(initialEmail)
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState("email") // 'email' or 'otp'
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const validateEmail = () => {
    const newErrors = {}
    if (!email) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    
    if (!validateEmail()) return
    
    setIsLoading(true)
    
    try {
      // Giả lập gửi OTP
      // await new Promise(resolve => setTimeout(resolve, 1500))
      const response = await ApiService.send(email,mode)
      toast.success(response.data.message)
      
      // Chuyển sang bước nhập OTP và bắt đầu đếm ngược 60 giây
      setStep("otp")
      setCountdown(60)
      
      // Giả lập gửi OTP thành công
      
    } catch (errMessage) {
      toast.error(errMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (countdown > 0) return
    
    setIsLoading(true)
    
    try {
      // Giả lập gửi lại OTP
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Reset đếm ngược
      setCountdown(60)
      
      toast.success(`Mã OTP mới đã được gửi đến ${email}.`)
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi lại OTP. Vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!otp) {
      newErrors.otp = "Mã OTP là bắt buộc"
    } else if (otp.length !== 6) {
      newErrors.otp = "Mã OTP phải có 6 chữ số"
    }
    
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    
    setIsLoading(true)
    
    try {
      // Giả lập xác thực OTP
      // await new Promise(resolve => setTimeout(resolve, 1500))
      const response = await ApiService.verifyOTP(email,otp)
      onVerificationComplete(email,mode)
      toast.success(response.message)
    }catch (errMessage) {
      toast.error(errMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={step === "email" ? handleSendOtp : handleVerifyOtp} className="space-y-4">
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
        <h2 className="text-2xl font-bold text-neutral-800">
          {mode === "register" ? "Xác thực email" : "Đặt lại mật khẩu"}
        </h2>
        <p className="text-neutral-600 mt-2">
          {step === "email" 
            ? "Vui lòng nhập email để nhận mã xác thực OTP" 
            : "Vui lòng nhập mã OTP đã gửi đến email của bạn"}
        </p>
      </div>

      {/* Field email (chỉ hiện ở bước 1) */}
      {step === "email" && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors({...errors, email: ""})
            }}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              errors.email ? "border-red-500" : "border-neutral-300"
            }`}
            placeholder="Nhập email của bạn"
            disabled={isLoading}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      )}

      {/* Field OTP (chỉ hiện ở bước 2) */}
      {step === "otp" && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-neutral-700">Mã OTP *</label>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={countdown > 0 || isLoading}
              className={`text-sm ${countdown > 0 ? "text-neutral-400" : "text-amber-600 hover:underline"}`}
            >
              {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Gửi lại mã"}
            </button>
          </div>
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              // Chỉ cho phép nhập số và giới hạn 6 ký tự
              const value = e.target.value.replace(/\D/g, '').slice(0, 6)
              setOtp(value)
              if (errors.otp) setErrors({...errors, otp: ""})
            }}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              errors.otp ? "border-red-500" : "border-neutral-300"
            }`}
            placeholder="Nhập mã OTP 6 số"
            disabled={isLoading}
          />
          {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
          <p className="text-sm text-neutral-500 mt-2">
            Mã OTP đã được gửi đến <span className="font-medium">{email}</span>
          </p>
        </div>
      )}

      {/* Nút hành động */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading 
          ? "Đang xử lý..." 
          : step === "email" 
            ? "Gửi mã OTP" 
            : "Xác thực"
        }
      </button>
    </form>
  )
}

export default EmailVerification