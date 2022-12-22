<template>
    <div class="login">
        <!-- 顶部导航栏 -->
        <header>
            <van-nav-bar :title="isTitle ? '登录' : '注册'" left-arrow @click-left="onClickLeft">
                <template #right>
                    <van-icon name="ellipsis" size="18" />
                </template>
            </van-nav-bar>
        </header>
        <!-- logo -->
        <img src="../../assets/logo.png" width="100" class="logo" alt="">
        <!-- 登录表单 -->
        <div class="login-form">
            <van-form @submit="onSubmit">
                <van-field 
                v-model="username" 
                name="用户名" 
                label="用户名" 
                placeholder="手机号"
                :rules="[{ required: true, message: '请填写手机号' }]" />

                <van-field 
                v-model="password" 
                type="password"
                name="密码" 
                label="密码" 
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />

                <!-- 验证码 -->
                <div style="display:flex;width: 100%;margin-top: 10px;">
                    <div class="identify">验证码</div>
                    <input type="text" placeholder="验证码" v-model="identifyVal">
                    <div class="code" @click="refreshCode" style="width:112px">
                        <Identify></Identify>
                    </div>
                </div>
                <!-- 文本提示 -->
                <div style="margin:16px;">
                    <p class="link-register" @click="isTitle = !isTitle">{{ isTitle ? '立即注册' : '已有账号，立即登录' }}</p>
                    <van-button round block type="primary">{{ isTitle ? '登录' : '注册' }}</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue"
import Identify from "../../components/Identify.vue"
let userInfo = reactive({
    username: "937832539",
    password: "123456",
    isTitle: true, // 控制是登录还是注册 
});

// 点击提交
let onSubmit = () => { }

// 点击返回
let onClickLeft = () => { }

let { username, password, isTitle } = toRefs(userInfo);
</script>

<style scoped lang="less">
.login {
    width: 100%;
    height: 100%;

    header {
        width: 100%;
        padding: 0 0.26667rem;
        box-sizing: border-box;
        background: #fff;
        border-bottom: 0.02667rem solid #dcdcdc;
    }

    .logo {
        width: 3.2rem;
        height: 3.2rem;
        display: block;
        margin: 36px auto 0;
    }

    .login-form {
        padding: 0 0.53333rem;

        .van-form {
            display: block;

            .identify {
                margin: 10px 16px;
                margin-right: 28px;
                font-size: 15px;
            }

            input {
                font-size: 16px;
                padding-left: 26px;
                width: 80px;
                height: 34px;
                margin-right: 20px;
                border: none;
                border-bottom: 1px solid rgb(226, 221, 221);
            }

            input::-webkit-input-placeholder {
                color: #aab2bd;
                font-size: 14px;
            }
        }

        /deep/.cerify-code-panel {
            display: flex;
            margin-top: 0.42667rem;
            height: 100%;
            overflow: hidden;

            .verify-code {
                width: 40% !important;
                height: 40px !important;
                line-height: 40px !important;
                font-size: 16px !important;
            }

            .verify-code-area {
                width: 54%;
                margin-left: 0.37333rem;

                .verify-input-area .varify-input-code {
                    width: 2.4rem;
                    height: 1.01333rem;
                    border: 0.02667rem solid #e9e9e9;
                    padding-left: 0.26667rem;
                    font-size: 0.42667rem;
                }

                .verify-change-area {
                    line-height: 1.17333rem;
                    font-size: 12px;
                }
            }
        }

        :deep(.cerify-code-panel) {
            display: flex;
            margin-top: 0.42667rem;
            height: 100%;
            overflow: hidden;

            .verify-code {
                width: 40% !important;
                height: 40px !important;
                line-height: 40px !important;
                font-size: 16px !important;
            }

            .verify-code-area {
                width: 54%;
                margin-left: 0.37333rem;

                .verify-input-area .varify-input-code {
                    width: 2.4rem;
                    height: 1.01333rem;
                    border: 0.02667rem solid #e9e9e9;
                    padding-left: 0.26667rem;
                    font-size: 0.42667rem;
                }

                .verify-change-area {
                    line-height: 1.17333rem;
                    font-size: 12px;
                }
            }
        }
    }

    .link-register {
        float: left;
        font-size: 0.37333rem;
        margin-bottom: 0.53333rem;
        color: #1989fa;
        display: inline-block;
    }

    .van-button--round {
        background: rgb(27, 174, 174) !important;
        border-color: rgb(27, 174, 174) !important;
    }
}
</style> 