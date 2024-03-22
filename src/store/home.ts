export const useHomeStore = defineStore("HOME_Store", () => {
  const currentLivePosition = ref<number[]>([])

  function setPosition(longitude: number, latitude: number) {
    currentLivePosition.value = [longitude, latitude]
  }

  return {
    currentLivePosition,
    setPosition,
  }
})
