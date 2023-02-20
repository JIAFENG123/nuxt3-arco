<template>
  <div class="dark:text-green-500  text-dark-300">
    home
  </div>
</template>

<script lang='ts' setup>
definePageMeta({
  layout: 'default-page',
  activeMenu: '',
  hideChildrenInMenu: false,
  hideInMenu: false,
  icon: 'icon-home',
  locale: 'home.menu',
  ignoreCache: false,
  isShow: true,
  noAffix: true,
  requiresAuth: true,
})
</script>

<style scoped>

</style>
