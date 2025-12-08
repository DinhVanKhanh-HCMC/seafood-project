import { useEffect, useState } from "react";
import ApiService from "../../services/apis";

export default function useCart(user) {
  const [cart, setCart] = useState([]);

  useEffect(() => {

    // Nếu đã đăng nhập → load từ API
    if (user) {
      ApiService.getCart()
        .then((res) => {
          setCart(res.items || []);  // API của bạn trả về { items: [...] }
        })
        .catch(() => {
          setCart([]);
        });

    } else {
      // Nếu chưa đăng nhập → lấy từ localStorage
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(localCart);
    }

  }, [user]);

  return { cart, setCart };
}
