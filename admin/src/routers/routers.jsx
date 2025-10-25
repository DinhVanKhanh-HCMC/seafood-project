import { lazy } from "react";
import Layout from "../components/Layout/Layout.jsx";



const Test = lazy(() => import("../components/test.jsx"));
const RequireAuth = lazy(() => import("../components/auth/RequireAuth.jsx"));
const Login = lazy(() => import("../components/auth/login.jsx"))
const UserPage = lazy(() => import("../components/UserManagement/page.jsx"));




const routers = [
     

    { path: "/login", component: Login },
    { path: "/", component: RequireAuth,
        children: [
            {
                path: "/",
                component: Layout,
                children: [
                    { index: true, component: UserPage },
                    
                ],
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