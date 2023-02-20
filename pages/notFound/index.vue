<template>
  <div class="content">
    <a-result class="result" status="404" subtitle="not found" />
    <div class="operation-row">
      <a-button key="back" type="primary" @click="back">
        back
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const back = () => {
  // warning： Go to the node that has the permission
  navigateTo({ name: 'home' })
}
definePageMeta({
  layout: 'default-page',
  locale: 'home.policyTag',
  activeMenu: '',
  hideChildrenInMenu: false,
  hideInMenu: false,
  icon: 'icon-home',
  ignoreCache: false,
  noAffix: false,
  requiresAuth: true,
})
</script>

  <style scoped lang="less">
    .content {
      // padding-top: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -121px;
      margin-left: -95px;
      text-align: center;
    }
  </style>
