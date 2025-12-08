// contexts/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../services/apis';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartVersion, setCartVersion] = useState(0);

  // Tự động load giỏ hàng khi component mount
  useEffect(() => {
    const loadInitialCart = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          const response = await ApiService.getCart();
          setCartItems(response.data?.items || []);
        } catch (error) {
          console.error("Lỗi load cart:", error);
          const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
          setCartItems(localCart);
        }
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(localCart);
      }
    };

    loadInitialCart();
  }, []); // Chạy 1 lần khi mount

  // Lắng nghe cartVersion thay đổi để refresh
  useEffect(() => {
    if (cartVersion > 0) {
      const refreshCartData = async () => {
        const token = localStorage.getItem("token");
        
        if (token) {
          try {
            const response = await ApiService.getCart();
            setCartItems(response.data?.items || []);
          } catch (error) {
            console.error("Lỗi refresh cart:", error);
          }
        } else {
          const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
          setCartItems(localCart);
        }
      };

      refreshCartData();
    }
  }, [cartVersion]);

  const refreshCart = () => {
    setCartVersion(prev => prev + 1);
  };

  const value = {
    cartItems,
    setCartItems,
    refreshCart,
    cartVersion
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// QUAN TRỌNG: THÊM EXPORT NÀY
export const useCart = () => useContext(CartContext);