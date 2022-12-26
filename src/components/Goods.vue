<template>
    <div class="good">
        <div class="good-header">
            <slot name="title">默认标题</slot>
        </div>
        <ul class="good-box">
            <router-link :to="`/info/${item.goodsId}`" v-for="item in dataItem" :key="item.goodsId" class="good-item" tag="li" >
                <div class="img_box">
                    <img :src="item.goodsCoverImg" :alt="item.goodsCoverImg">
                </div>
                <div class="good-desc">
                    <div class="title">{{ item.goodsName }}</div>
                    <div class="price">{{ item.sellingPrice}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
    dataItem: {
        type: Array,
        default:[]
    }
})
</script>

<style lang="less" scoped>
.good {
    width: 100%;
    background: rgb(243, 243, 243);

    .good-header {
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: 500;
        background-color: #fff;
        color: rgb(15, 196, 181);
    }

    .good-box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;

        .good-item {
            width: 49%;
            background: white;
            margin: 2px 0;
            box-sizing: border-box;
            padding: 10px;

            .img_box {
                width: 90%;
                height: 200px;
                margin: 10px auto;
                overflow: hidden;
            }

            .good-desc {
                .title {
                    font-size: 0.32rem;
                    color: #222333;
                }

                .price {
                    margin-top: 10px;
                    font-size: 0.32rem;
                    color: red;
                }
            }

            img {
                width: 100%;
                height: auto;
            }
        }
    }
}
</style>