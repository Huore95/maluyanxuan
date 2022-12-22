<template>
   <div>
      <router-view></router-view>
      <tab-bar v-if="isSHowNav"></tab-bar>
   </div>
</template>

<script setup>
import TabBar from "./components/TabBar.vue"
import { watch, ref } from "vue"
import {useRoute} from 'vue-router'

let route = useRoute();
let isSHowNav = ref(false);

watch(route, newVal => {
  isSHowNav.value = newVal.meta.isSHowNav
}, {
  immediate: true
});
</script>



<style scoped>
</style>
