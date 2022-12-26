<template>
    <div>
        <!-- 头部 -->
        <van-nav-bar title="商品详情" left-arrow @click-left="$router.back()">
            <template #right>
                <van-icon name="ellipsis" />
            </template>
        </van-nav-bar>
        <!-- 商品的详情 -->
        <div class="product-info">
            <img style="width: 100%" :src="info.goodsCoverImg" alt="" />
            <div class="info-goodsName">
                {{ info.goodsName }}
            </div>
            <p class="info-p">免邮费 顺丰快递</p>
            <p class="info-price">￥{{ info.sellingPrice }}</p>
            <ul class="info-ul">
                <li>概述</li>
                <li>参数</li>
                <li>安装服务</li>
                <li class="info-ul-li">常见问题</li>
            </ul>
            <div v-html="info.goodsDetailContent" class="info-content"></div>
        </div>
        <!-- action-bar -->
        <div class="actionBar">
            <div class="left-content">
                <div>
                    <van-icon size="18" name="chat-o" />
                    <p class="custom">客服</p>
                </div>
                <div @click="$router.push('/cart')">
                    <van-icon size="18" name="cart-o" :badge="store.cartNum" />
                    <p class="custom">购物车</p>
                </div>
            </div>
            <div class="right-content">
                <button @click="add">加入购物车</button>
                <button>立即购买</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from "vue"
import { getInfoData, addCart } from "@/api/index.js"
import { useRoute, useRouter } from "vue-router"
import { showFailToast, showSuccessToast } from 'vant';
import { useCart } from "@/store/cartStore.js"
let route = useRoute();
let router = useRouter();

let store = useCart();

let info = reactive({})

onMounted(() => {
    // console.log(route.params.productId);
    getData();
});

let getData = async () => {
    let { data } = await getInfoData(route.params.productId);
    // console.log(data);
    for (let key in data) {
        info[key] = data[key]
    }

    // 上一来,就需要加载购物车的数据
    store.getCartListAsync();
}

// 点击加入购物车
let add = async () => {
    let { resultCode, message } = await addCart({
        goodsId: route.params.productId,
        goodsCount: 1
    });
    if (resultCode === 200) {
        // 1)提示添加购物车成功
        showSuccessToast("添加成功")
        // 2)获取购物车数据
        store.getCartListAsync();
    } else {
        showFailToast(message)
    }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
    position: fixed;
    width: 100%;
    height: 1.17333rem;
    top: 0;
    left: 0;
    z-index: 100;
    line-height: 1.17333rem;
    padding: 0 0.26667rem;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 0.02667rem solid #dcdcdc;
}

.product-info {
    margin-top: 1.17333rem;
    padding: 0 0.26667rem;

    .info-goodsName {
        font-size: 0.48rem;
        text-align: left;
        color: #333;
    }

    .info-p {
        font-size: 0.37333rem;
        text-align: left;
        color: #999;
        padding: 0.13333rem 0;
    }

    .info-price {
        color: #f63515;
        font-size: 0.58667rem;
        text-align: left;
    }

    .info-ul {
        width: 100%;
        height: 30px;
        margin: 26px 0;
        display: flex;
        justify-content: space-between;

        li {
            flex: 1;
            padding: 0.13333rem 0;
            text-align: center;
            font-size: 0.4rem;
            border-right: 0.02667rem solid #999;
            box-sizing: border-box;
        }
    }

    .info-ul .info-ul-li {
        border-right: none;
    }

    .info-content {
        padding: 0 0.53333rem;
    }
}

.actionBar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    left: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .left-content {
        display: flex;
        justify-content: space-around;
        width: 80px;

        .custom {
            font-size: 10px;
        }
    }

    .right-content {
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 16px;

        button {
            line-height: 40px;
            height: 40px;
            border-radius: inherit;
            text-align: center;
            color: white;
            cursor: pointer;
            width: 135px;
            background: linear-gradient(to right,
                    rgb(255, 208, 30),
                    rgb(255, 137, 23));
            border: 0px;
        }

        button:nth-child(1) {
            border-radius: 20px 0 0 20px;
        }

        button:nth-child(2) {
            border-radius: 0 20px 20px 0;
        }
    }
}
</style>