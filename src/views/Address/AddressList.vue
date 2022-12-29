<template>
    <!-- 头部 -->
    <van-nav-bar title="地址管理" left-arrow  @click-left="$router.back()" >
     <template #right>
        <van-icon name="ellipsis" />
     </template>
    </van-nav-bar>
    <!-- 地址列表 -->
    <van-address-list v-model="address.chosenAddressId" :list="address.list" 
        default-tag-text="默认" @add="onAdd" @edit="onEdit" @click-item="goCreateOrder" />
</template>

<script setup>
import {onMounted, reactive } from "vue"
import { getAddressList } from '@/api/index.js';
import { useRouter } from "vue-router";
import { showConfirmDialog } from "vant";

let router = useRouter();
let edit = true; //用来区分是点击了编辑还是点击了地址



let address = reactive({
    list: [], //地址列表的数据源
    chosenAddressId: "", //选择的那个地址
});

onMounted(() => {
    getData().then(() => {
        let res = address.list.filter(item => item.isDefault == true)
        address.chosenAddressId = res[0].id
    })
})

//获取地址列表数据
async function getData() {
    //await是保证先获取地址列表
    await getAddressList().then(res => {
        // console.log("res",res);
        address.list = res.data.map(item => {
            return {
                id: item.addressId,
                name: item.userName,
                tel: item.userPhone,
                address:
                    item.provinceName +
                    item.cityName +
                    item.regionName +
                    item.detailAddress,
                isDefault: item.defaultFlag,
            }
        })
    })
}

//点击新增
let onAdd = ( ) => {
    router.push("/addressAddAndEdit")
}
//点击编辑
let onEdit = (item) => {
    router.push("/addressAddAndEdit?addressId=" + item.id)
    edit = false;
}

//点击去生成订单页面
let goCreateOrder = (item) => {
    if (!edit) {
        edit = true;
        //说明点击了编辑
        return;
    }
    //item表示点击的地址
    // console.log("去生成订单页面~");
    showConfirmDialog({
        title: '确认地址',
        message:'是否确认选择此地址',
    }).then(() => {
        router.push({
            path: "/create-order",
            query: {addressId: item.id}
        })
    })
}

</script>   

<style  scoped>

</style>