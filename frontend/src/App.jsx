import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routers } from "./routers/routers";
import { Suspense, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function renderRoutes(routes) {
  return routes.map((route, index) => {
    const Component = route.component;
    if (route.children) {
      return (
        <Route
          path={route.path}
          element={<Component />}
          key={index}
        >
          {renderRoutes(route.children)}
        </Route>
      );
    } else {
      return (
        <Route
          path={route.path}
          element={<Component />}
          index={route.index}
          key={index}
        />
      );
    }
  });
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800, // tốc độ animation
      once: true,    // chỉ chạy 1 lần
    });
  }, []);

  return (
    <>
    <BrowserRouter>
      <Suspense fallback={<div>Loading ...</div>}>
        <Routes>
          {renderRoutes(routers)}
        </Routes>
      </Suspense>
    </BrowserRouter>

    <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
