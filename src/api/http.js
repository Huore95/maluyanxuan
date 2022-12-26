// 对ajax进行二次封装

import axios from "axios"
import {
    showNotify
} from 'vant';
import router from "../router";

// http://backend-api-01.newbee.ltd/api/v1/user/login
// process.env.NODE_ENV
// yarn dev  开发  process.env.NODE_ENV  "development"
// yarn build  打包  process.env.NODE_ENV  "production"
// 开发环境:
// 生产环境:
let http = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api，不用你手写
    baseURL: process.env.NODE_ENV === 'production' ? 'http://backend-api-01.newbee.ltd/api/v1/' : '/api/v1',
    //请求时间超过5秒
    timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use(function(config) {
    config.headers.token = localStorage.getItem("mltoken")
    return config;
}, function(error) {
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
    //成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情。
    let data = response.data;
    // 在这里,可以判断服务器响应的不同的状态
    // .....  Notify
    if (data.resultCode != 200) {

        if (data.resultCode == 416) {
            if (router.currentRoute.path != '/login') {
                router.push("/login?needback=1")
            }
        }
        // 代码走到这里,说明数据不是我们需要的,给出提示
        showNotify({
            type: 'danger',
            message: data.message || '系统繁忙'
        });
    }

    return data;
}, (error) => {
    Notify({
        type: "danger",
        message: "系统繁忙,稍后再试"
    })
    return promise.reject(new Error('faile'))
});

export default http;