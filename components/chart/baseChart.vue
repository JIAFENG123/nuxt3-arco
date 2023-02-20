<template>
  <div
    v-if="chart.open"
    :id="chart.id"
    ref="myChart"
    class="echart"
    :style="{ width: '100%', height: chart.height ? chart.height : '400px' }"
  />
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { markRaw, ref, watch } from 'vue'

const props = defineProps({
  chart: {
    type: Object,

    default: () => {},
  },
})
const myChart = ref<HTMLElement>()
const initChart = (chart: any) => {
  const getchart = ref<any>()

  getchart.value = markRaw(echarts.init(myChart.value!))
  const option: any = {
    legend: {
      orient: 'horizontal',
      bottom: chart.bottom,
      icon: 'circle',
    },
    color: chart.color,
    tooltip: {},
    series: chart.series,
  }
  if (chart.typeVal === 'line') {
    option.tooltip = {
      trigger: 'axis',
      showContent: true,
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56',
        },
      },
      formatter: (item: any) => {
        // item 是当前x轴对应的节点数据，是个数组
        let str = `
            <span style="font-weight:bold">${item[0].axisValue}</span>
            <p style="margin:0">
          `
        item.forEach((i: any) => {
          // const index = i.dimensionNames.findIndex((ele:any) => ele===i.seriesName)
          str += `
              <p style="margin: 6px 0;">
                <span>${i.marker}</span>
                <span>${i.seriesName}：</span>
                <span>${i.value}</span>
              </p>
            `
        })
        return str
      },
    }

    option.xAxis = { type: 'category', data: chart.xAxis }
    option.yAxis = [
      {
        type: 'value',
        position: 'left',
      },
      {
        type: 'value',
        position: 'right',
      },
    ]
    option.grid = { top: '10%' }
  }
  getchart.value.setOption(option)
  // 随着屏幕大小调节图表
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      getchart.value.resize()
    })
  }
}
watch(() => props.chart, (newVal) => {
  if (newVal.open) {
    const newPromise = new Promise<void>((resolve) => {
      resolve()
    })
    // 然后异步执行echarts的初始化函数
    newPromise.then(() => {
      initChart(newVal)
    })
  }
}, { immediate: true, deep: true })
</script>
