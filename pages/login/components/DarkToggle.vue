<template>
  <button class="!outline-none" @click="toggleDark">
    <!-- <div class="dark:i-carbon-moon i-carbon-sun" /> -->
    <Icon v-if="color.value === 'light'" icon="carbon:sun" class=" text-2xl" />
    <Icon v-else icon="carbon:moon" class=" text-2xl text-light-50" />
  </button>
</template>

<script setup lang="ts">
const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
})

const toggleTheme = useToggle(isDark)
const color = useColorMode()
function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
  toggleTheme()
}
</script>
