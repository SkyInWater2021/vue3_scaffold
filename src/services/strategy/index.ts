import type { GlobalResponse } from "@/types"

import { requestInstance, sRequestInstance } from "../request"

import type { ListItemResponse } from "./types"

class Api {
  // 查询策略模块-三级页面-根据策略类型查询
  queryThirdStrategyList(data: { type: string }) {
    if (import.meta.env.DEV) {
      return sRequestInstance.post<GlobalResponse<ListItemResponse[]>>({
        url: "/api/v1/communicationSystem/queryThirdStrategyList",
        data,
      })
    }

    return requestInstance.get<GlobalResponse<ListItemResponse[]>>({
      url: `/api/pol/list/type-${data.type}`,
    })
  }
}

export const strategyApi = new Api()
