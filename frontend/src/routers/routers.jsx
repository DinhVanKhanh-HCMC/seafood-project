import { lazy } from "react";



const HomePage = lazy(() => import("../components/homepage/page.jsx"));
const Layout = lazy(() => import("../components/layouts/layout.jsx"));
const Products = lazy(() => import("../components/products/page.jsx"))
const Introduction = lazy(() => import("../components/about/Introduction.jsx"))
const NewsPage = lazy(() => import("../components/news/News.jsx"))
const Contact = lazy(() => import("../components/contact/Contact.jsx"))
const Livestream = lazy(() => import("../components/livestreaming/LiveStream.jsx"))
const Auction = lazy(() => import("../components/auction/Auction.jsx"))
const ProductDetail = lazy(() => import("../components/products/productDetail.jsx"))
const NewsDetail = lazy(() => import("../components/news/NewDetail.jsx"))
const Cart = lazy(() => import("../components/cart/page.jsx"))
const LivestreamDetail = lazy(() => import("../components/livestreaming/LiveStream-Detail.jsx"))



const routers = [
    {
        path: "/",
        component: Layout,   // ⬅ Layout luôn hiển thị (header, footer)
        children: [
            { index: true, component: HomePage },
            { path: "products", component: Products},
            { path: "product-detail/:id", component: ProductDetail},
            { path: "about", component: Introduction },
            { path: "news", component: NewsPage },
            { path: "news-detail/:id", component: NewsDetail },
            { path: "contact", component: Contact },
            { path: "livestreaming", component: Livestream },
            { path: "auction", component: Auction },
            { path: "cart", component: Cart },
            { path: "livestream-detail/:id", component: LivestreamDetail },
            
            
        ]
        
    }
    
];

export { routers }