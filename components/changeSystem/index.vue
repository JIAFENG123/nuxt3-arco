<template>
  <a-drawer
    ref="systemDrawer"
    :visible="appStore.systemVisible"
    placement="left"
    :width="600"
    unmount-on-close
    :header="false"
    :closable="false"
    :footer="false"
    @cancel="handleCancel"
  >
    <a-card
      v-for="(item, index) in systemList"
      :key="index"
      size="small"
      :class="code.systemCode === item.usId ? 'card-demo activeColor' : 'card-demo'"
      hoverable
      @click="jumpNext(item)"
    >
      <a-link>{{ item.usName }}</a-link>
    </a-card>
  </a-drawer>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'
import { sysTree } from '@/api/users'
import { useAppStore } from '@/store'

const systemDrawer = ref()
const systemList = ref([]) as any
const appStore = useAppStore()
const code = ref(JSON.parse(JSON.stringify(typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('urlInfo') : '')))
onMounted(() => {
  sysTree()
    .then((res: any) => {
      systemList.value = res.data
    })
})
const handleCancel = () => {
  appStore.toggleSystemVisible(false)
}
const jumpNext = (i: { usId: number; usUrl: string }) => {
  const object = {
    userId: code.value.userId,
    systemCode: i.usId,
    username: code.value.username,
    ip: Cookies.get('userIp'),
    token: code.value.token,
    // originUrl: window.location.href （后端校验token不通过，后期后端做处理后，在子系统可用传递的URL做回退，先写死）
  }
  // console.log(object, "obj")
  // object = JSON.stringify(object)
  const urlCode = Base64.encode(JSON.stringify(object))
  const urlstr = `http://${i.usUrl}?code=${urlCode}`
  if (typeof window !== 'undefined')
    window.open(urlstr)
}
</script>

<style lang="less" scoped>
  .card-demo {
    width: 260px;
    display: inline-block;
    margin: 0.5rem 0.5rem 0;
    font-weight: 700;
  }
  .card-demo :deep(.arco-card-body)::before,
  .card-demo :deep(.arco-card-body)::after {
    box-sizing: inherit;
    position: absolute;
    content: '';
    border: 2px solid transparent;
    width: 0;
    height: 0;
  }
  .card-demo :deep(.arco-card-body)::after {
    bottom: 0;
    right: 0;
  }
  .card-demo :deep(.arco-card-body)::before {
    top: 0;
    left: 0;
  }
  .card-demo :deep(.arco-card-body):hover::before {
    width: 100%;
    height: 100%;
    border-top-color: #4361ee;
    border-right-color: #4361ee;
    transition: width 0.15s ease-out, height 0.15s ease-out 0.15s;
  }
  .card-demo :deep(.arco-card-body):hover::after {
    width: 100%;
    height: 100%;
    border-bottom-color: #4361ee;
    border-left-color: #4361ee;
    transition: border-color 0s ease-out 0.3s, width 0.15s ease-out 0.3s, height 0.15s ease-out 0.5s;
  }
  .activeColor {
    color: rgb(var(--arcoblue-6)) !important;
    pointer-events: none;
    border: 2px solid rgb(var(--arcoblue-6));
    border-radius: 5px;
  }
</style>
