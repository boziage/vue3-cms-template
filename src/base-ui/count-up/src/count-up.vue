<template>
  <div>
    <span ref="counterRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'

import { CountUp, CountUpOptions } from 'countup.js'

export default defineComponent({
  props: {
    number: {
      type: Number,
      default: 0
    },
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const counterRef = ref<HTMLElement | null>(null)
    const counterInstance = ref<InstanceType<typeof CountUp>>()
    const defaultOptions: CountUpOptions = {
      decimalPlaces: 2, // 保留两位
      duration: 2, // 动画时长
      separator: ',', // 千位分割
      decimal: '.', // 小数分割
      prefix: '￥' // 单位
    }

    watch(
      () => props.number,
      () => {
        update(props.number)
      }
    )

    onMounted(() => {
      createCounter()
    })

    const createCounter = () => {
      if (!counterRef.value) return
      const opts: CountUpOptions = { ...defaultOptions, ...props.option }
      counterInstance.value = new CountUp(counterRef?.value, props.number, opts)
      start()
    }

    const start = () => {
      if (!counterInstance.value) return
      counterInstance?.value.start()
    }

    const update = (number: number) => {
      if (!counterInstance.value) return
      counterInstance?.value.update(number)
    }

    return {
      counterRef
    }
  }
})
</script>

<style scoped></style>
