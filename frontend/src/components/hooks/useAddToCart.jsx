import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiService from "../../services/apis";

export const useAddToCart = () => {
  const [loading, setLoading] = useState(false);

  const addToCart = async (product, quantity = 1) => {
    if (!product || !product.id) {
      toast.error("Không tìm thấy sản phẩm hợp lệ");
      return;
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      if (token) {
        await ApiService.verifyToken();

        const data = {
            productId: product.id,
            quantity: quantity
        }


        const response = await ApiService.addCartItem(data)
        toast.success(response.message)
      } else {
        // 🧱 Nếu chưa đăng nhập → lưu tạm vào localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find((item) => item.id === product.id);

        if (existing) {
          existing.quantity += quantity;
        } else {
          cart.push({ ...product, quantity });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        toast.info("Sản phẩm đã được thêm vào giỏ (chưa đăng nhập)");
      }
    } catch (error) {
      console.error(error);
      toast.error("Không thể thêm vào giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading };
};
