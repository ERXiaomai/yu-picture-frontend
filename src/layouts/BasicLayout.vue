<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader/>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />

      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/ERXiaomai?tab=repositories" target="_blank">
          智能云图库 其他更多项目点我</a
        >
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<style scoped>
#basicLayout .header {
  padding-inline: 20px;
  background: #fff;
  color: unset;
  margin-bottom: 16px;
}

#basicLayout .content {
  padding: 20px;
  background: linear-gradient(to right,#fefefe,#fff);
  margin-bottom: 28px;
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
