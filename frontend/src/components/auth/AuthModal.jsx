"use client"
import { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import EmailVerification from "./EmailVerification"
import ResetPassword from "./ResetPassword"
import ApiService from "../../services/apis"
import { toast } from "react-toastify"

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [authStep, setAuthStep] = useState("main") // 'main', 'emailVerification', 'register', 'resetPassword'
  const [verificationMode, setVerificationMode] = useState("register") // 'register' or 'resetPassword'
  const [verifiedEmail, setVerifiedEmail] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = "Email là bắt buộc"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email không hợp lệ"
    if (!formData.password) newErrors.password = "Mật khẩu là bắt buộc"
    else if (formData.password.length < 8) newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự"

    if (!isLogin) {
      if (!formData.name) newErrors.name = "Họ tên là bắt buộc"
      if (!formData.phone) newErrors.phone = "Số điện thoại là bắt buộc"
      else if (!/^[0-9]{10,11}$/.test(formData.phone)) newErrors.phone = "Số điện thoại không hợp lệ"
      if (!formData.confirmPassword) newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc"
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Mật khẩu không khớp"
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "Bạn phải đồng ý với điều khoản sử dụng"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Hàm xử lý khi xác thực email hoàn tất
  const handleVerificationComplete = (email, mode) => {
    setVerifiedEmail(email)
    
    if (mode === "register") {
      // Cập nhật formData với email đã xác thực và chuyển sang form đăng ký
      setFormData(prev => ({ ...prev, email }))
      setAuthStep("register")
    } else {
      // Chuyển sang form đặt lại mật khẩu
      setFormData(prev => ({ ...prev, email, password: "", confirmPassword: "" }))
      setAuthStep("resetPassword")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      if (isLogin) {
        alert("Đăng nhập thành công!")
      } else {
        alert("Đăng ký thành công! Vui lòng kiểm tra email để xác thực.")
      }
      
      onClose()
      setFormData({ name: "", email: "", password: "", confirmPassword: "", phone: "", agreeToTerms: false })
      setAuthStep("main") // Reset về bước chính sau khi đăng ký thành công
    } catch {
      alert("Có lỗi xảy ra. Vui lòng thử lại!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form đăng ký
    const newErrors = {}
    if (!formData.name) newErrors.name = "Họ tên là bắt buộc"
    if (!formData.phone) newErrors.phone = "Số điện thoại là bắt buộc"
    else if (!/^[0-9]{10,11}$/.test(formData.phone)) newErrors.phone = "Số điện thoại không hợp lệ"
    if (!formData.password) newErrors.password = "Mật khẩu là bắt buộc"
    else if (formData.password.length < 8) newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự"
    if (!formData.confirmPassword) newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc"
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Mật khẩu không khớp"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "Bạn phải đồng ý với điều khoản sử dụng"

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    
    setIsLoading(true)
    
    try {
      const response = await ApiService.register(formData)
      toast.success(response.message)
      onClose()
      setFormData({ name: "", email: "", password: "", confirmPassword: "", phone: "", agreeToTerms: false })
      setAuthStep("main") // Reset về bước chính
    } catch(err) {
      const {message, errors} = err
      toast.error(errors)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!formData.password) newErrors.password = "Mật khẩu là bắt buộc"
    else if (formData.password.length < 8) newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự"
    if (!formData.confirmPassword) newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc"
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Mật khẩu không khớp"

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    
    setIsLoading(true)
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert("Đặt lại mật khẩu thành công!")
      onClose()
      setFormData({ name: "", email: "", password: "", confirmPassword: "", phone: "", agreeToTerms: false })
      setAuthStep("main")
    } catch {
      alert("Có lỗi xảy ra. Vui lòng thử lại!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    setVerificationMode("reset")
    setAuthStep("emailVerification")
  }

  // Hàm quay lại từ xác thực email
  const handleBackFromVerification = () => {
    setAuthStep("main")
  }

  // Hàm quay lại từ đặt lại mật khẩu
  const handleBackFromResetPassword = () => {
    setAuthStep("emailVerification")
  }

  // Hàm quay lại từ đăng ký về xác thực email
  const handleBackFromRegister = () => {
    setAuthStep("emailVerification")
  }

  // Chuyển đổi giữa đăng nhập và đăng ký
  const switchMode = () => {
    setIsLogin(!isLogin)
    setErrors({})
    setFormData({ name: "", email: "", password: "", confirmPassword: "", phone: "", agreeToTerms: false })
  }

  // Bắt đầu quy trình đăng ký với xác thực email
  const startRegisterProcess = () => {
    setVerificationMode("register")
    setAuthStep("emailVerification")
  }

  // Hàm xử lý đăng nhập bằng mạng xã hội
  const handleSocialLogin = (provider) => {
    alert(`Đăng nhập với ${provider}`)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600">
            ✕
          </button>

          {authStep === "emailVerification" ? (
            <EmailVerification
              initialEmail={formData.email}
              onVerificationComplete={handleVerificationComplete}
              onBack={handleBackFromVerification}
              mode={verificationMode}
            />
          ) : authStep === "register" ? (
            <RegisterForm
              onSubmit={handleRegisterSubmit}
              isLoading={isLoading}
              errors={errors}
              formData={formData}
              handleInputChange={handleInputChange}
              onBack={handleBackFromRegister}
            />
          ) : authStep === "resetPassword" ? (
            <ResetPassword
              onSubmit={handleResetPassword}
              isLoading={isLoading}
              errors={errors}
              formData={formData}
              handleInputChange={handleInputChange}
              onBack={handleBackFromResetPassword}
            />
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">{isLogin ? "Đăng nhập" : "Đăng ký tài khoản"}</h2>
                <p className="text-neutral-600">
                  {isLogin ? "Chào mừng bạn quay lại" : "Tạo tài khoản để trải nghiệm đầy đủ tính năng"}
                </p>
              </div>

              {/* Social Login */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSocialLogin("Google")}
                  className="w-full flex items-center justify-center gap-3 border border-neutral-300 rounded-lg py-3 px-4 hover:bg-neutral-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Tiếp tục với Google
                </button>

                <button
                  onClick={() => handleSocialLogin("Facebook")}
                  className="w-full flex items-center justify-center gap-3 border border-neutral-300 rounded-lg py-3 px-4 hover:bg-neutral-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Tiếp tục với Facebook
                </button>
              </div>

              {/* Render form */}
              {isLogin ? (
                <LoginForm
                  onSubmit={handleSubmit}
                  onForgotPassword={handleForgotPassword}
                  isLoading={isLoading}
                  errors={errors}
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              ) : (
                <RegisterForm
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  errors={errors}
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}

              {/* Switch Mode */}
              <div className="text-center mt-6">
                <p className="text-neutral-600">
                  {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
                  <button 
                    onClick={isLogin ? startRegisterProcess : switchMode} 
                    className="text-amber-600 font-medium hover:underline"
                  >
                    {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthModal