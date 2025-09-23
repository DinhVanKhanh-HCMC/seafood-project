// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import ApiService from "../services/apis";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setIsChecking(false);
        return;
      }

      try {
        const res = await ApiService.verifyToken();
        if (res.status === 200) {
          setUser(res.data?.user || {}); // tuỳ backend trả
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isChecking }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
