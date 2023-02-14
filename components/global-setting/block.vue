<template>
  <div class="block">
    <h5 class="title">
      {{ title }}
    </h5>
    <div v-for="option in options" :key="option.name" class="switch-wrapper">
      <span>{{ $t(option.name) }}</span>
      <FormWrapper
        :type="option.type || 'switch'"
        :name="option.key"
        :default-value="option.defaultVal"
        @input-change="handleChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import FormWrapper from './form-wrapper.vue'
import { useAppStore } from '@/store'

interface OptionsProps {
  name: string
  key: string
  type?: string
  defaultVal?: boolean | string | number
}
defineProps({
  title: {
    type: String,
    default: '',
  },
  options: {
    type: Array as PropType<OptionsProps[]>,
    default() {
      return []
    },
  },
})
const appStore = useAppStore()
const handleChange = async ({
  key,
  value,
}: {
  key: string
  value: unknown
}) => {
  if (key === 'colorWeak')
    // eslint-disable-next-line no-unused-expressions
    typeof window !== 'undefined' ? document.body.style.filter = value ? 'invert(80%)' : 'none' : null

  if (key === 'menuFromServer' && value)
    await appStore.fetchServerMenuConfig()

  if (key === 'topMenu') {
    appStore.updateSettings({
      menuCollapse: false,
    })
  }
  appStore.updateSettings({ [key]: value })
}
</script>

<style scoped lang="less">
  .block {
    margin-bottom: 24px;
  }

  .title {
    margin: 10px 0;
    padding: 0;
    font-size: 14px;
  }

  .switch-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
  }
</style>
