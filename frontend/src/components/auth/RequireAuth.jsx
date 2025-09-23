import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../../services/apis";

const RequireAuth = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuth(false);
        setIsChecking(false);
        return;
      }

      try {
        const res = await ApiService.verifyToken();
        setIsAuth(res.status === 200);
      } catch (err) {
        setIsAuth(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (isChecking) return <div>Đang kiểm tra đăng nhập...</div>;
  return isAuth ? children : <Navigate to="/" replace />;
};

export default RequireAuth;
