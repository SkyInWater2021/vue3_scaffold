import { useSourceStore } from "@/store/source"

export function useFetchInfo(time: Ref<string>, loading: Ref<boolean>, fn: () => void) {
  const sourceStore = useSourceStore()
  watch(
    () => [loading.value, time.value],
    () => {
      sourceStore.changeFetchLoading(loading.value)
      sourceStore.changeFetchTime(time.value ?? "")
    },
  )
  onActivated(() => {
    sourceStore.changeFetchLoading(loading.value)
    sourceStore.changeFetchTime(time.value ?? "")
    sourceStore.changeRefreshFn(fn)
  })
}
