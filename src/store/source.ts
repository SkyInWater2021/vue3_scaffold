type RefreshFn = undefined | (() => void)

export const useSourceStore = defineStore("sourceStore", () => {
  const fetchTime = ref("")
  const changeFetchTime = (time: string) => (fetchTime.value = time)

  const refresh = reactive<{ fn: RefreshFn }>({ fn: undefined })
  const changeRefreshFn = (fn: RefreshFn) => (refresh.fn = fn)

  const fetchLoading = ref(false)
  const changeFetchLoading = (loading: boolean) => (fetchLoading.value = loading)

  function resetFetchInfo() {
    fetchTime.value = ""
    fetchLoading.value = false
    refresh.fn = undefined
  }

  return {
    refresh,
    fetchLoading,
    fetchTime,
    changeFetchTime,
    changeFetchLoading,
    changeRefreshFn,
    resetFetchInfo,
  }
})
