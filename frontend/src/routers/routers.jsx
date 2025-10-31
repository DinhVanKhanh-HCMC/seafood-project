import { lazy } from "react";
import RequireAuth from "../components/auth/RequireAuth.jsx";



const HomePage = lazy(() => import("../components/homepage/page.jsx"));
const Layout = lazy(() => import("../components/layouts/layout.jsx"));
const Products = lazy(() => import("../components/products/page.jsx"))
const Introduction = lazy(() => import("../components/about/Introduction.jsx"))
const NewsPage = lazy(() => import("../components/news/News.jsx"))
const Contact = lazy(() => import("../components/contact/Contact.jsx"))
const Livestream = lazy(() => import("../components/livestreaming/LiveStream.jsx"))
const Auction = lazy(() => import("../components/auction/AuctionPage.jsx"))
const ProductDetail = lazy(() => import("../components/products/productDetail.jsx"))
const NewsDetail = lazy(() => import("../components/news/NewDetail.jsx"))
const Cart = lazy(() => import("../components/cart/page.jsx"))
const Profile = lazy(() => import("../components/profile/page.jsx"))
const OrderSuccessPage = lazy(() => import("../components/cart/OrderSuccessPage.jsx"))
const PaymentSuccess = lazy(() => import("../components/cart/PaymentSuccess.jsx"))
const PaymentCanceled = lazy(() => import("../components/cart/PaymentCanceled.jsx"))
const PaymentFailed = lazy(() => import("../components/cart/PaymentFailed.jsx"))
const OrderDetail = lazy(() => import("../components/order/OrderDetail.jsx"))



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
            { path: "profile", component: () => (
                <RequireAuth>
                    <Profile />
                </RequireAuth>
                ),
            },
            { path: "order-success", component: () => (
                <RequireAuth>
                    <OrderSuccessPage />
                </RequireAuth>
                ),
            },
            { path: "payment-success", component: () => (
                <RequireAuth>
                    <PaymentSuccess />
                </RequireAuth>
                ),
            },
            { path: "payment-canceled", component: () => (
                <RequireAuth>
                    <PaymentCanceled />
                </RequireAuth>
                ),
            },
            { path: "payment-failed", component: () => (
                <RequireAuth>
                    <PaymentFailed />
                </RequireAuth>
                ),
            },

            { path: "order-detail/:orderId", component: () => (
                <RequireAuth>
                    <OrderDetail />
                </RequireAuth>
                ),
            },
                
        ]
        
    }
    
];

export { routers }