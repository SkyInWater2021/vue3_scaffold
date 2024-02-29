import type { GlobalResponse } from "@/types"

import { requestInstance } from "../request"

import type { LiveTransItem } from "./types"

class Api {
  // ----- 文件收发 -----
  fetchCol24() {
    return requestInstance.get<GlobalResponse<LiveTransItem[]>>({
      url: "/api/col/last/hour/sum/24",
    })
  }
  fetchCol30() {
    return requestInstance.get<GlobalResponse<LiveTransItem[]>>({
      url: "/api/col/last/day/rank/30",
    })
  }

  fetchDist24() {
    return requestInstance.get<GlobalResponse<LiveTransItem[]>>({
      url: "/api/dist/last/hour/sum/24",
    })
  }
  fetchDist30() {
    return requestInstance.get<GlobalResponse<LiveTransItem[]>>({
      url: "/api/dist/last/day/rank/30",
    })
  }

  // ----- 四级编码 -----
  fetchCodeCol24(range?: [number, number]) {
    if (!range) return
    const subPath = range.join("-")
    return requestInstance.get<GlobalResponse<LiveTransItem[]>>({
      url: `/api/col/hour/sum/datatype-24/${subPath}`,
    })
  }

  fetchCodeDist24(range?: [number, number]) {
    if (!range) return
    const subPath = range.join("-")
    return requestInstance.get<GlobalResponse<LiveTransItem[]>>({
      url: `/api/dist/hour/sum/datatype-24/${subPath}`,
    })
  }

  // ----- 单个四级编码 -----
  fetchSingleCodeCol(dataType: string) {
    return requestInstance.get<GlobalResponse<LiveTransItem[]>>({
      url: `/api/col/hour/single/datatype-${dataType}/day-7`,
    })
  }
  fetchSingleCodeDist(dataType: string) {
    return requestInstance.get<GlobalResponse<LiveTransItem[]>>({
      url: `/api/dist/hour/single/datatype-${dataType}/day-7`,
    })
  }
}

export const liveTransApi = new Api()
