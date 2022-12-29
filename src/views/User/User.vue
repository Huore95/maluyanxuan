<template>
    <div>
        <h1>我的页面</h1>
        <h1>{{info}}</h1>
    </div>
</template>

<script setup>
import { getUserInfo } from '@/api/index.js';
import { reactive, onMounted, ref } from 'vue';

let info = ref({});//用户信息

onMounted(() => {
    getData();
});
async function getData() {
    let data = await getUserInfo()
    info.value = data.data;
}
</script>

<style>

</style>