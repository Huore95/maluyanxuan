<template>
    <div class="order-box">
        <van-nav-bar fixed title="我的订单" left-arrow @click-left="$router.back()">
            <template #right>
                <van-icon name="ellipsis" size="18" />
            </template>
        </van-nav-bar>
        <!-- van-tabs -->
        <van-tabs v-model:active="active">
            <van-tab v-for="item in tabs" :key="item.text" :title="item.text"></van-tab>
        </van-tabs>
        <!-- list -->
        <van-list :offset="80" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item.orderId">
            <template #default="orderItem">
                <div>
                    <p>
                        订单时间：{{ item.createTime }} ——————
                        {{ item.orderStatusString }}
                    </p>
                    <div v-for="v in item.newBeeMallOrderItemVOS" :key="v.goodsId">
                        <img style="width:180px" :src="v.goodsCoverImg" alt="" />
                        <p>名称：{{ v.goodsName }}</p>
                        <p>单价：{{ v.sellingPrice }}</p>
                    </div>
                    <p>总价格：{{ item.totalPrice }}</p>
                </div>
            </template>
            </van-cell>
        </van-list>
    </div>
</template>

<script setup>
import { reactive, ref ,watch} from "vue"
import { getOrderList } from "@/api/index.js";
import { on } from "events";


let tabs = reactive([
    {
        text: "全部",
        status: "",
    },
    {
        text: "待付款",
        status: "0",
    },
    {
        text: "待确认",
        status: "1",
    },

    {
        text: "待发货",
        status: "2",
    },
    {
        text: "已发货",
        status: "3",
    },
    {
        text: "交易完成",
        status: "4",
    },
]);
const loading = ref(false);
const finished = ref(false);
const list = ref([]);//数据源
const pageNumber = ref(1)//第几页
const status = ref("");//订单的状态
const active = ref(0); //index和tabs绑定

// 1）onLoad一上来就会触发一次  onLoad...  此时页面上没有数据
// 2）数据渲染完后，数据没有撑满整个屏幕，还会加载一次  onLoad...  此时页面上有10条数据
// 3）10条数据没有撑满屏幕，还会触发一次  onLoad...  此时页面上有20条数据
// 4）当滚动到底部时，还会触发onLoad
const onLoad = () => {
    // console.log("onLoad...");
    getOrderList(pageNumber.value++ , status.value).then(res => {
        if (res.resultCode == 200) {
            if (res.data.list.length == 0) {
                finished.value = true;
            }
            list.value = list.value.concat(res.data.list)
            loading.value = false;
        }
    })
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
            // finished变成true表示数据加载完毕
            finished.value = true;
        }
    }, 1000);
};

//监听active的变化
watch(active, (newVal, oldVal) => {
    status.value = tabs[newVal].status;
    pageNumber.value = 1;
    list.value = [];
    finished.value = false;
    onLoad();//重新发请求
})

</script>
<style lang="less" scoped>
.order-box {
    .van-tabs {
        position: fixed;
        top: 1.2rem;
        width: 100%;
        left: 0;
        z-index: 300
    }

    .van-list {
        padding-top: 2.2rem;
    }
}
</style>