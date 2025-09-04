import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routers } from "./routers/routers";
import { Suspense } from "react";
import "./App.css"

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
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading ...</div>}>
        <Routes>
          {renderRoutes(routers)}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
