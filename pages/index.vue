<template>
  <div>
    <a-card title="图片轮播">
      <!-- 组件1 -->
      <div class="text-center">
        <Carousel />
        <a-button type="primary" status="success">
          Success
        </a-button>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash'

const a = {
  b: 1,
}
const b = a
const c = cloneDeep(a)
a.b = 2
console.log(b.b, c.b) // 1
</script>
