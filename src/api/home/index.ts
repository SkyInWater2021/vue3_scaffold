import { Response } from "@/types"
import { requestInstance } from "@/utils/request"

import type { WeatherData } from "./types"

class Api {
  fetchWeather() {
    return requestInstance.get<Response<WeatherData>>({
      url: "/api/weather/view?stationid=&_",
    })
  }
}

export const homeApi = new Api()
