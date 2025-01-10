<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <router-link to="/">
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" alt="logo">
            <div class="title">鱼皮云图库</div>
          </div>
        </router-link>
      </a-col>

      <a-col flex="auto">
        <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
      </a-col>

      <a-col flex="120px">
        <div class="user-login-status">
          <a-button type="primary" href="/user/login">登录</a-button>
        </div>
      </a-col>
    </a-row>

  </div>

</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import { HomeOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
const current = ref<string[]>(['mail'])
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/about',
    label: '关于',
    title: '关于',
  },
  {
    key: 'others',
    label: h('a', { href: 'https://www.codefather.cn', target: '_blank' }, '编程导航'),
    title: '编程导航',
  },
])
</script>

<style scoped>
#globalHeader .title-bar{
  display: flex;
  align-content: center;
}

.title{
  color: #000;
  font-size: 18px;
  margin-left: 16px;
}
.logo {
  height: 48px;
}
</style>
