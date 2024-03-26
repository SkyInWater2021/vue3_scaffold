import { homeApi } from "@/api/home"
import { WeatherData } from "@/api/home/types"

export const useHomeStore = defineStore("HOME_STORE", () => {
  const currentLivePosition = ref<number[]>([])

  const liveData = ref<WeatherData>()

  const fetchLL = () => {
    homeApi.fetchWeather().then(({ code, data }) => {
      if (code === 200) {
        const { location } = data
        liveData.value = data
        currentLivePosition.value = [location.longitude, location.latitude]
      }
    })
  }

  return {
    currentLivePosition,
    liveData,
    fetchLL,
  }
})
