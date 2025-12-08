// hooks/useCart.js
import { useEffect, useState } from "react";
import ApiService from "../../services/apis";

export default function useCart(user) {
  const [cart, setCart] = useState([]);

  const loadCart = () => {
    if (user) {
      ApiService.getCart()
        .then((res) => {
          setCart(res.items || []);
        })
        .catch(() => {
          setCart([]);
        });
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(localCart);
    }
  };

  useEffect(() => {
    // Load lần đầu
    loadCart();

    // Lắng nghe event khi giỏ hàng thay đổi
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [user]);

  return { cart, setCart };
}