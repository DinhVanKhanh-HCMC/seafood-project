import { lazy } from "react";

const HomePage = lazy(() => import("../components/homepage/page.jsx"));

const routers = [
    {
        path: "/",
        component: HomePage,   // ⬅ Layout luôn hiển thị (header, footer)
        children: [
            { index: true, component: HomePage },
        ]
    }
    
];

export { routers }