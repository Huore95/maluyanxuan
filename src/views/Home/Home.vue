<template>
    <div class="home_box">
        <!-- header -->
        <header class="header_box" :class="{active:!isTop}">
        <div class="left_box">左</div>
        <div class="middle_box">中</div>
        <div class="right_box">右</div>
        </header>
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in myCarousels"  :key="item">
                <img :src="item.carouselUrl" :alt="item.carouselUrl"/>
            </van-swipe-item>
        </van-swipe>
        <!-- 九宫格 -->
        <van-grid :border="false" :column-num="5">
            <van-grid-item v-for="value in 10" :key="value">
            <template #icon>
                <div class="icon">li</div>
            </template>
            </van-grid-item>
        </van-grid>
        <!-- 新品上线 -->
        <Goods :dataItem="myNewGoodses">
        <template #title>
            <div>
                <h3>新品上线</h3>
            </div>
        </template>
        </Goods>
        <!-- 热销商品 -->
        <Goods :dataItem="myHotGoodses">
            <template #title>
                <div>
                    <h3>热销商品</h3>
                </div>
            </template>
        </Goods>
        <!-- 最新推荐 -->
        <Goods :dataItem="myRecommendGoodses">
            <template #title>
                <div>
                    <h3>最新推荐</h3>
                </div>
            </template>
        </Goods>
    </div>
</template>

<script  setup>
import { ref, onMounted, onBeforeUnmount, reactive } from "vue"
import { getIndexInfo } from '@/api/index.js';
import Goods from "@/components/Goods.vue"
// import { get } from "http";

let isTop = ref(true);
let myCarousels = reactive([]);
let myHotGoodses = reactive([]);
let myNewGoodses = reactive([]);
let myRecommendGoodses = reactive([]);

onMounted(() => {
    //可以做节流
    window.addEventListener("scroll", changeTop)
    //发ajax请求,获取数据
    getData();
});

let getData = async () => {
    let { data: { carousels, hotGoodses, newGoodses, recommendGoodses }, resultCode } = await getIndexInfo();
    if (resultCode == 200) {
        myCarousels.push(...carousels)
        myHotGoodses.push(...hotGoodses)
        myNewGoodses.push(...newGoodses)
        myRecommendGoodses.push(...recommendGoodses)
    }  
}

let changeTop = () => {
    let t = document.documentElement.scrollTop || document.body.scrollTo;
    if (t > 50) {
        isTop.value = false; //添加背景色
    } else {
        isTop.value = true; // 移除背景色
    }
}

onBeforeUnmount(() => {
    window.removeEventListener("scroll", changeTop)
});


</script>

<style lang="less" scoped>
.home_box {
     .header_box {
         position: fixed;
         width: 100%;
         height: 50px;
         display: flex;
         z-index: 200;
         top: 0;
         left: 0;

         .left_box {
             width: 50px;
             flex: none;
             background: rgba(0, 0, 0, 0.2);
         }

         .right_box {
             width: 50px;
             flex: none;
             background: rgba(0, 0, 0, 0.2);
         }

         .middle_box {
             flex: auto;
             background: rgba(255, 255, 0, 0.2);
         }

         &.active {
             background: #1baeae;
         }
     }

     padding-bottom: 1000px;

     .my-swipe .van-swipe-item {
         color: #fff;
         font-size: 20px;
         text-align: center;

         img {
             width: 100%;
             height: auto;
         }
     }
 }

 .good {
     margin-top: 10px;
 }
</style>