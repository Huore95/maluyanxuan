<template>
    <div>
        <van-tabbar route active-color="1baeae">
            <van-tabbar-item replace to="/home" icon="home-o">
                <span>首页</span>
                <template #icon>
                    <span class="icon iconfont icon-shouye"></span>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/categary">
                <span>分类</span>
                <template #icon>
                    <span class="icon iconfont icon-grouping"></span>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/cart">
                <span>购物车</span>
                <template #icon>
                    <span class="icon iconfont icon-gouwuche"></span>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/user">
                <span>我的</span>
                <template #icon>
                    <span class="icon iconfont icon-31wode"></span>
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>

</script>

<style lang="less" scoped>
.van-tabbar-item{
    font-size: 9px;
    .iconfont{
        position: relative;
        font-size: 0.55rem;
        .cartNum{
            position: absolute;
            top: -3px;
            right: -6px;
            font-size: 12px;
            width: 14px;
            height: 14px;
            line-height: 14px;
            border-radius: 50%;
            background-color: #ee0a24;
            color:#fff;

        }
    }
}
</style>