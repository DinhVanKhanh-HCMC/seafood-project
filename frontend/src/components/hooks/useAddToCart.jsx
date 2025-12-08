import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiService from "../../services/apis";
import { useCart } from "../../contexts/CartContext"; // IMPORT CONTEXT

export const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const { refreshCart } = useCart(); // LẤY HÀM REFRESH

  const addToCart = async (product, quantity) => {
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
        };

        const response = await ApiService.addCartItem(data);
        toast.success(response.message);
        
        // QUAN TRỌNG: GỌI REFRESH CART
        refreshCart();
        
      } else {
        // Nếu chưa đăng nhập → lưu tạm vào localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find((item) => item.productId === product.id);

        if (existing) {
          existing.quantity += quantity;
        } else {
          cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            images: product.images,
            weight: product.weight,
            origin: product.origin,
            quantity: quantity
          });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        toast.info("Sản phẩm đã được thêm vào giỏ (chưa đăng nhập)");
        
        // QUAN TRỌNG: GỌI REFRESH CART
        refreshCart();
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