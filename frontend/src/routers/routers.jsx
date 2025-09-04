import { lazy } from "react";


const HomePage = lazy(() => import("../components/homepage/page.jsx"));
const Layout = lazy(() => import("../components/layouts/layout.jsx"))

const routers = [
    {
        path: "/",
        component: Layout,   // ⬅ Layout luôn hiển thị (header, footer)
        children: [
            { index: true, component: HomePage },
        ]
    }
    
];

export { routers }