import _ from 'lodash'
import axios from 'axios'

type TargetContext = '_self' | '_parent' | '_blank' | '_top'

export const openWindow = (
  url: string,
  opts?: { target?: TargetContext; [key: string]: any },
) => {
  const { target = '_blank', ...others } = opts || {}
  typeof window !== 'undefined' && window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue
        return [...preValue, `${key}=${value}`]
      }, [])
      .join(','),
  )
}

// eslint-disable-next-line prefer-regex-literals
export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i',
)

export function getUrlKey(keyname: string) {
  return (
    decodeURIComponent(
      (new RegExp(`[?|&]${keyname}=([^&;]+?)(&|#|;|$)`).exec(
        // (new RegExp(`[?|&]${keyname}=` + `([^&;]+?)(&|#|;|$)`).exec(
        typeof window !== 'undefined' ? window.location.href : '',
      ) || [])[1].replace(/\+/g, '%20'),
    ) || null
  )
}

/* 获取数据类型 */
export function getType(value: any) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}
/* 转换空的查询参数 */
export const filterQueryParams = (params: any) =>
  _.mapValues(params, (v: any) => {
    const type = getType(v)
    if (['number'].includes(type))
      return v

    if (['array'].includes(type))
      return v.length ? v : undefined

    return v || undefined
  })

/* 时间转化 */
export const parseTime = (
  time?: object | string | number | null,
  cFormat?: string,
): string | null => {
  if (time === undefined || !time)
    return null

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  }
  else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time, 10)
      }
      else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        // eslint-disable-next-line prefer-regex-literals
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    if (typeof time === 'number' && time.toString().length === 10)
      time *= 1000

    date = new Date(time)
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a')
      return ['日', '一', '二', '三', '四', '五', '六'][value]

    return value.toString().padStart(2, '0')
  })
  return timeStr
}

// 导出表格
export function downloadExcel(data: any, fileName: string) {
  let url: any = typeof window !== 'undefined' ? window.URL.createObjectURL(new Blob([data], { type: '.xlsx' })) : ''
  if (typeof window !== 'undefined') {
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.setAttribute('download', `${fileName}.xlsx`)
    document.body.appendChild(a)
    a.click()
    url = typeof window !== 'undefined' ? window.URL.revokeObjectURL(url) : ''
    document.body.removeChild(a)
  }
}

// 文件下载
export const downloadFun = (url: string, name: string) => {
  const urlInfo = JSON.parse(`${sessionStorage.getItem('urlInfo')}`)
  axios({
    responseType: 'blob',
    url,
    headers: {
      systemCode: urlInfo.systemCode,
      Authorization: `Bearer ${urlInfo.token}`,
    },
  }).then((res) => {
    const blob = new Blob([res], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    if (typeof window === 'undefined')
      return
    if ('download' in document.createElement('a')) {
      // 非IE下载
      const elink = document.createElement('a')
      elink.download = name
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    }
    else {
      // IE10+下载
      (navigator as any).msSaveBlob(blob, name)
    }
  })
}
export default null
