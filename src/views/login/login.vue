<template>
  <div class="login-container">
    <el-form ref="formRef" :model="form" :rules="rules" class="login-form">
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
      </div>
      <el-form-item prop="username">
        <svg-icon icon="user" class="svg-container"></svg-icon>
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <svg-icon icon="password" class="svg-container"></svg-icon>
        <el-input v-model="form.password" :type="passwordType"> </el-input>
        <svg-icon
          class="svg-container show-pwd"
          :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
          @click="handleChangeType"
        ></svg-icon>
      </el-form-item>
      <el-button type="primary" class="login-button" @click="handleLogin">{{
        $t('login.btnTitle')
      }}</el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ElForm } from 'element-plus'

import { useStore } from '@/store'
const store = useStore()

const form = ref({
  username: 'admin',
  password: '123456'
})

const passwordType = ref('password')

const rules = ref({
  username: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    }
  ]
})

const formRef = ref<InstanceType<typeof ElForm>>()
const handleLogin = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      // store.dispatch('app/login', form.value)
      store.dispatch('login/loginAction', form.value)
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

const handleChangeType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$black: #000;
$cursor: #fff;

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #e493d0;
  background-image: radial-gradient(
      closest-side,
      rgba(235, 105, 78, 1),
      rgba(235, 105, 78, 0)
    ),
    radial-gradient(closest-side, rgba(243, 11, 164, 1), rgba(243, 11, 164, 0)),
    radial-gradient(
      closest-side,
      rgba(254, 234, 131, 1),
      rgba(254, 234, 131, 0)
    ),
    radial-gradient(
      closest-side,
      rgba(170, 142, 245, 1),
      rgba(170, 142, 245, 0)
    ),
    radial-gradient(
      closest-side,
      rgba(248, 192, 147, 1),
      rgba(248, 192, 147, 0)
    );
  background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
    110vmax 110vmax, 90vmax 90vmax;
  background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
    -30vmax -10vmax, 50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 10s movement linear infinite;

  &::after {
    content: '';
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  @keyframes movement {
    0%,
    100% {
      background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
        110vmax 110vmax, 90vmax 90vmax;
      background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
        -30vmax -10vmax, 50vmax 50vmax;
    }
    25% {
      background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax,
        90vmax 90vmax, 60vmax 60vmax;
      background-position: -60vmax -90vmax, 50vmax -40vmax, 0vmax -20vmax,
        -40vmax -20vmax, 40vmax 60vmax;
    }
    50% {
      background-size: 80vmax 80vmax, 110vmax 110vmax, 80vmax 80vmax,
        60vmax 60vmax, 80vmax 80vmax;
      background-position: -50vmax -70vmax, 40vmax -30vmax, 10vmax 0vmax,
        20vmax 10vmax, 30vmax 70vmax;
    }
    75% {
      background-size: 90vmax 90vmax, 90vmax 90vmax, 100vmax 100vmax,
        90vmax 90vmax, 70vmax 70vmax;
      background-position: -50vmax -40vmax, 50vmax -30vmax, 20vmax 0vmax,
        -10vmax 10vmax, 40vmax 60vmax;
    }
  }
  // min-height: 100%;
  // width: 100%;
  // // background-color: $bg;
  // background: url('~@/assets/img/login-bg.svg');
  // overflow: hidden;

  .login-form {
    position: relative;
    z-index: 10;
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-input) {
      height: 48px;

      input {
        -webkit-appearance: none;
        border-radius: 5px;
        padding: 12px 38px;
        color: rgba(255, 255, 255);
        background-color: rgba(255, 255, 255, 0.3);
        height: 48px;
        // --el-input-focus-border: red;
        // caret-color: $cursor;
      }
    }
    .login-button {
      background-color: rgba(255, 255, 255, 0.3);
      border: 1px solid #dcdfe6;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    position: absolute;
    z-index: 1;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: transparent;
      text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.8),
        0px 4px 4px rgba(0, 0, 0, 0.05);
      // letter-spacing: 0.2rem;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    :deep(.lang-select) {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    right: 0;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
