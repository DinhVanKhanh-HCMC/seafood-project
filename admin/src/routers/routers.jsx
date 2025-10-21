import { lazy } from "react";



const Test = lazy(() => import("../components/test.jsx"));
const Layout = lazy(() => import("../components/Layout/layout.jsx"));
const RequireAuth = lazy(() => import("../components/auth/RequireAuth.jsx"));
const Login = lazy(() => import("../components/auth/login.jsx"))





const routers = [
     

    { path: "/login", component: Login },
    { path: "/", component: RequireAuth,
        children: [
            {
                path: "/",
                component: Test,
            }
        ],
    
    },
    // {
    //     path: "/",
    //     component: Layout,   // ⬅ Layout luôn hiển thị (header, footer)
    //     children: [
    //         { index: true, component: HomePage },
    //         // { path: "products", component: Products},
    //     ]
        
    // }
    
];

export { routers }