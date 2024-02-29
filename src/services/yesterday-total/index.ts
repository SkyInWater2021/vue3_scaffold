import type { GlobalResponse } from "@/types"

import { requestInstance } from "../request"

import type { CodeItem, TotalItem } from "./types"

class Api {
  // ----- 总量 -----
  fetchColTotal(range: [number, number]) {
    return requestInstance.get<GlobalResponse<TotalItem[]>>({
      url: `/api/col/last/day/datatype/sum/${range[0]}-${range[1]}`,
    })
  }

  fetchDistTotal(range: [number, number]) {
    return requestInstance.get<GlobalResponse<TotalItem[]>>({
      url: `/api/dist/last/day/datatype/sum/${range[0]}-${range[1]}`,
    })
  }

  // ----- 四级编码 -----
  fetchColCode(range: [number, number]) {
    return requestInstance.get<GlobalResponse<CodeItem[]>>({
      url: `/api/col/last/day-7/datatype/sum/${range[0]}-${range[1]}`,
    })
  }

  fetchDistCode(range: [number, number]) {
    return requestInstance.get<GlobalResponse<CodeItem[]>>({
      url: `/api/dist/last/day-7/datatype/sum/${range[0]}-${range[1]}`,
    })
  }
}

export const yesterdayTotalApi = new Api()
