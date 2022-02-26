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
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  background: url('~@/assets/img/login-bg.svg');
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-input) {
      height: 48px;

      input {
        -webkit-appearance: none;
        border-radius: 5px;
        padding: 12px 38px;
        color: $black;
        height: 48px;
        // --el-input-focus-border: red;
        // caret-color: $cursor;
      }
    }
    .login-button {
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
      color: $black;
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
