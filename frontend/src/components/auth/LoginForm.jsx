"use client"
import { useState } from "react"

const LoginForm = ({ onSubmit, onForgotPassword, isLoading, errors, formData, handleInputChange }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
            errors.email ? "border-red-500" : "border-neutral-300"
          }`}
          placeholder="Nhập email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="text-amber-600 focus:ring-amber-500" />
          <span className="ml-2 text-sm text-neutral-700">Ghi nhớ đăng nhập</span>
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-amber-600 hover:underline"
        >
          Quên mật khẩu?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  )
}

export default LoginForm
