import { watch } from 'vue'
import { useStore } from '@/store'

export const watchLang = (...cbs: any[]) => {
  const store = useStore()
  watch(
    () => store.state.lang,
    () => {
      cbs.forEach((cb) => cb(store.state.lang))
    },
    {
      deep: true
    }
  )
}
