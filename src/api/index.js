import http from "./http.js"
import md5 from "js-md5"

//注册接口
//需求在组件中调用接口,就是调用方法
export function register(name, pwd) {
    return http.post("/user/register", {
        loginName: name,
        password:pwd
    })
}


//登录接口
export function login(name, pwd) {
    return http.post("/user/login", {
        loginName: name,
        passwordMd5:md5(pwd)
    })
}

//首页面数据接口
export function getIndexInfo() {
    return http.get("/index-infos")
}

//根据商品ID,获取商品的详情
export function getInfoData(id) {
    return http.get("/goods/detail/"+id)
}

//添加商品到购物车
export function addCart(options) {
    return http.post("/shop-cart",options)
}

//添加商品到购物车
export function getCartList() {
    return http.get("/shop-cart")
}
