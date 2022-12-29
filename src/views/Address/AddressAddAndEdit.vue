<template>
    <!-- 头部 -->
    <van-nav-bar :title="id ? '编辑地址' : '新增地址'" left-arrow @click-left="$router.back()">
        <template #right>
            <van-icon name="ellipsis" />
        </template>
    </van-nav-bar>
    <!-- 表单 -->
    <van-address-edit :address-info="info" :area-list="areaList" :show-delete="id ? true : false" show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
</template>

<script setup>
import { areaList } from "@vant/area-data"
import { addAddress,getAddressDetail,updateAddress,removeAddress} from "@/api/index.js"
import { useRoute, useRouter } from "vue-router"
import { showToast } from "vant";
import { ref } from "vue";
import { remove } from "@vue/shared";

const router = useRouter()
const route =  useRoute()

//info表示地址详情
let info = ref({})

let id = route.query.addressId;

if (id) {
    //如果ID存在,根据id获取地址详情
    getDetail();
}

//根据地区,获取地址编码
const getAreaCode = (area) => {
    console.log("area", area);
    area = area.replace(/区|县/, "");
    for (let k in areaList.county_list) {
        if (areaList.county_list[k].includes(area)) {
            return k;
        }
    }
}

//获取地址详情
async function getDetail() {
    let {data} = await getAddressDetail(id)
    // console.log("res=>" , res);
    info.value = {
        id: data.addressId,
        name: data.userName,
        tel: data.userPhone,
        province: data.provinceName,
        city: data.cityName,
        county: data.regionName,
        addressDetail: data.detailAddress,
        areaCode: getAreaCode(data.regionName),
        isDefault: data.defaultFlag ? true : false, 
    }
}

//新增或编辑
let onSave = (obj) => {
    // console.log("obj",obj);
    let option = {
        "cityName": obj.city,
        "defaultFlag": obj.isDefault ? 1 : 0,
        "detailAddress": obj.addressDetail,
        "provinceName": obj.province,
        "regionName":obj.county,
        "userName":obj.name,
        "userPhone":obj.tel ,
        "areaCode": obj.areaCode,
        "postalCode":""
    }
    if (id) {
        //实现编辑
        updateAddress({ ...option, addressId: id }).then((res) => {
            if (res.resultCode == 200) {
                showToast("编辑成功")
                router.push("/addressList")
            }
        })
    } else {
        addAddress({ ...option }).then((res) => {
            // console.log("res" , res);
            if (res.resultCode == 200) {
                showToast("新增成功")
                router.push("/addressList")
            }
        })
    }
    
}

//删除
let onDelete = (item) => {
    removeAddress(item.id).then(res => {
        if (res.resultCode == 200) {
            showToast('删除');
            setTimeout(() => {
                router.back();
            },500)
        }
    })
}

</script>
