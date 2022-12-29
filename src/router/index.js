import { createRouter,createWebHashHistory } from "vue-router";

const asyncRouutes = [
    {
        path: '/',
        redirect:'/home'
    },
    {
        path: "/home",
        component: () => import("../views/Home/Home.vue"),
        meta: {
            isShowNav:true
        }
    },
    {
        path: '/categary',
        component: () => import("../views/Categary/Categary.vue"),
        meta: {
            isShowNav:true
        }
    },
    {
        path: '/cart',
        component: () => import("../views/Cart/Cart.vue"),
        meta: {
            isShowNav:true
        }
    },
    {
        path: '/user',
        component: () => import("../views/User/User.vue"),
        meta: {
            isShowNav:true
        }
    },
    {
        path: '/login',
        component: () => import("../views/Login/Login.vue"),
        meta: {
            isShowNav:false
        }
    },
    {
        path: '/info/:productId',
        component: () => import("../views/Info/Info.vue"),
        meta: {
            isShowNav:false
        }
    },
    {
        path: '/addressList',
        component: () => import("../views/Address/AddressList.vue"),
        meta: {
            isShowNav:false
        }
    },
    {
        path: '/addressAddAndEdit',
        component: () => import("../views/Address/AddressAddAndEdit.vue"),
        meta: {
            isShowNav: false
        } 
    }
    ,
    {
        path: '/create-order',
        component: () => import("../views/CreateOrder/CreateOrder.vue"),
        meta: {
            isShowNav:false
        }
    },
    {
        path: '/order',
        component: () => import("../views/Order/Order.vue"),
        meta: {
            isShowNav: false,
            til:"订单页"
        } 
    }
]

const router = createRouter({
    history: createWebHashHistory(),  // 带#的hash路由模式
    routes: [
        ...asyncRouutes,
        {path:"/:pathMatch(.*)",redirect:"/"}
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.til || "码路严选"
    next();
})

export default router;