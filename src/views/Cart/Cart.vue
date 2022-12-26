<template>
    <div>
        <h1>Cart</h1>
    </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useCart } from '@/store/cartStore.js'
let store = useCart();

onMounted(() => {
    store.getCartListAsync();
});
</script>
