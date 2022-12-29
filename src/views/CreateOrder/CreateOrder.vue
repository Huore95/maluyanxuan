<template>
    <!-- 头部 -->
    <van-nav-bar title="生成订单" left-arrow @click-left="$router.back()">
        <template #right>
            <van-icon name="ellipsis"  size="18" />
        </template>
    </van-nav-bar>
    <router-link to="/addressList">
      <div class="address-wrap">
        <div class="name">
            <span>{{ receiver.name }}</span>
            <span>{{ receiver.tel }}</span>
        </div>
        <van-icon name="arrow" />
        <div class="address">
            <span>{{ receiver.address }}</span>
        </div>
      </div>
    </router-link>
    <van-card v-for="item in cartCheckGood" :key="item.goodsId" :num="item.goodsCount" :price="item.sellingPrice" :title="item.goodsName" :thumb="item.goodsCoverImg" />

    <!-- 底部 -->
    <van-submit-bar :price="(totalPrice * 100 || 0 )" label="商品金额" button-text="生成订单" @submit="onSubmit" />
    <van-popup v-model:show="popupIsShow" round position="bottom" :style="{height : '22%'}">
     <template #default>
        <div class="buy-box">
            <div @click="payAndGoOrder(item)" v-for="(item,i) in payWays" :key="i" >{{ item.name }}</div>
            <section></section>
            <div @click="cancelOrder">取消</div>
        </div>
     </template>
    </van-popup>

</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getAddressDetail,getOrderCard,addOrder,paySuccess } from "@/api/index.js"
import { onMounted, reactive, toRefs, computed, ref } from 'vue'
import {showSuccessToast} from 'vant';

const route = useRoute()
const router = useRouter()

const cartCheckGooodIds = ref([]); //购物车中选中的商品的id
const cartCheckGood = ref([]); //购物车选中的商品

const totalPrice = ref(0); //总价
const popupIsShow = ref(false);//popup是否显示
const payWays = ref([{ name: '微信支付' }, { name: '支付宝支付' }]);

let receiver = reactive({
    name: "",//收货人姓名
    tel: "",//收货人电话
    address: "",//收货人地址
    orderNo:"",//生成订单的订单号
})

onMounted(() => {
    getAddress()
    getCartCheckGoods()
});

//根据ids获取商品的数据
async function getCartCheckGoods() {
    let ids =  localStorage.getItem("cartCheckedGoodsIds");
    // console.log(ids);
    cartCheckGooodIds.value = ids;
    getOrderCard(cartCheckGooodIds.value).then(res => {
        // console.log("res:",res);
        if (res.resultCode == 200) {
            cartCheckGood.value = res.data;
        }
        totalPrice.value = cartCheckGood.value.reduce((prev, next) => {
            return prev + next.sellingPrice * next.goodsCount
        },0)
    })
}

//根据id获取地址详情
async function getAddress() {
    let res = await getAddressDetail(route.query.addressId)
    receiver.name = res.data.userName;
    receiver.tel = res.data.userPhone;
    receiver.address =
        res.data.provinceName +
        res.data.cityName +
        res.data.regionName +
        res.data.detailAddress;
}

//点击生成订单
function onSubmit() {
    popupIsShow.value = !popupIsShow.value;
    //调用接口生成订单
    addOrder(route.query.addressId, cartCheckGooodIds.value.split(",")).then(res => {
        if (res.resultCode == 200) {
            receiver.orderNo = res.data;
        }
    })
}

//模拟支付,支付完后,去订单页面
function payAndGoOrder(item) {
    if (item.name == "微信支付") {
        paySuccess(receiver.orderNo, 1).then(res => {
            if (res.resultCode == 200) {
                showSuccessToast('微信支付成功');
                setTimeout(() => {
                    router.replace('/order')
                },500)
            }
        })
    } else if (item.name == "支付宝支付") {
        paySuccess(receiver.orderNo, 2).then(res => {
            if (res.resultCode == 200) {
                showSuccessToast('支付宝支付成功');
                setTimeout(() => {
                    router.replace('/order')
                },500)
            }
        })
    }
};

//点击取消支付
function cancelOrder() {
    router.replace('/order')
}


</script>


<style lang="less" scoped>
.address-wrap {
    margin-bottom: 0.53333rem;
    background: #fff;
    position: relative;
    font-size: 0.37333rem;
    padding: 0.63rem 0.4rem 0.66667rem;
    color: #222333;

    .name {
        display: flex;
        justify-content: left;
        margin: 0.26667rem 0 0.27667rem;
        line-height: 0.37333rem;

        span:nth-child(1) {
            margin-right: 0.04rem;
        }
    }

    .address {
        display: flex;
        justify-content: left;
        line-height: 0.37333rem;
    }

    .van-icon {
        position: absolute;
        right: 0.26667rem;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        font-size: 0.53333rem;
    }
}

.address-wrap::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 0.05333rem;
    background: -webkit-repeating-linear-gradient(135deg,
            #ff6c6c,
            #ff6c6c 20%,
            transparent 0,
            transparent 25%,
            #1989fa 0,
            #1989fa 45%,
            transparent 0,
            transparent 50%);
    background: repeating-linear-gradient(-45deg,
            #ff6c6c,
            #ff6c6c 20%,
            transparent 0,
            transparent 25%,
            #1989fa 0,
            #1989fa 45%,
            transparent 0,
            transparent 50%);
    background-size: 2.13333rem;
    content: "";
}
.buy-box {
    font-size: 16px;
    text-align: center;
    color: #222333;

    div {
        box-sizing: border-box;
        padding: 15px;
    }
    :last-child{
        color: #646566;
    }

    section {
        width: 100%;
        height: 10px;
        background: #f7f8fa;
    }
}
</style>