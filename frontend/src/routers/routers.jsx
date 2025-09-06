import { lazy } from "react";



const HomePage = lazy(() => import("../components/homepage/page.jsx"));
const Layout = lazy(() => import("../components/layouts/layout.jsx"));
const Products = lazy(() => import("../components/products/page.jsx"))
const Introduction = lazy(() => import("../components/about/Introduction.jsx"))
const NewsPage = lazy(() => import("../components/news/News.jsx"))
const Contact = lazy(() => import("../components/contact/Contact.jsx"))
const Livestream = lazy(() => import("../components/livestreaming/LiveStream.jsx"))
const Auction = lazy(() => import("../components/auction/Auction.jsx"))


const routers = [
    {
        path: "/",
        component: Layout,   // ⬅ Layout luôn hiển thị (header, footer)
        children: [
            { index: true, component: HomePage },
            { path: "products", component: Products},
            { path: "about", component: Introduction },
            { path: "news", component: NewsPage },
            { path: "contact", component: Contact },
            { path: "livestreaming", component: Livestream },
            { path: "auction", component: Auction }
            
            
        ]
        
    }
    
];

export { routers }