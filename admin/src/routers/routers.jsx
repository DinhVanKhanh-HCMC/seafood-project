import { lazy } from "react";
import Layout from "../components/Layout/Layout.jsx";


const RequireAuth = lazy(() => import("../components/auth/RequireAuth.jsx"));
const Login = lazy(() => import("../components/auth/login.jsx"))
const UserPage = lazy(() => import("../components/UserManagement/page.jsx"));
const Orders = lazy(() => import("../components/OrderManagement/page.jsx"));
const Products = lazy(() => import("../components/ProductManagement/page.jsx"));
const Livestreams = lazy(() => import("../components/Livestream/page.jsx"));
const Auctions = lazy(() => import("../components/AuctionManagement/page.jsx"));
const Posts = lazy(() => import("../components/PostManagement/page.jsx"));
const CreateLivestream = lazy(() => import("../components/Livestream/CreateLivestream.jsx"));
const LivestreamView = lazy(() => import("../components/Livestream/LivestreamView.jsx"));
const CreateAuction = lazy(() => import("../components/AuctionManagement/CreateAuction.jsx"));
const AuctionView = lazy(() => import("../components/AuctionManagement/AuctionView.jsx"));
const AddProduct = lazy(() => import("../components/ProductManagement/AddProduct.jsx"));
const OrderDetail = lazy(() => import("../components/OrderManagement/OrderDetail.jsx"));











const routers = [
     

    { path: "/login", component: Login },
    { path: "/", component: RequireAuth,
        children: [
            {
                path: "/",
                component: Layout,
                children: [
                    { path: "users", component: UserPage },
                    { path: "orders", component: Orders},
                    { path: "products", component: Products},
                    { path: "livestreams", component: Livestreams},
                    { path: "auctions", component: Auctions},
                    { path: "posts", component: Posts},
                    { path: "create-livestream", component: CreateLivestream},
                    { path: "livestream-view", component: LivestreamView},
                    { path: "create-auction", component: CreateAuction},
                    { path: "auction-view/:id", component: AuctionView},
                    { path: "add-product", component: AddProduct},
                    { path: "/orders/:id", component: OrderDetail},

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