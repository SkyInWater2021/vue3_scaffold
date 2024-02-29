import type { GlobalResponse } from "@/types"

import { requestInstance, sRequestInstance } from "../request"

import type { ListResponseItem } from "./types"

class Api {
  // 查询三级页面-资源分配列表数据支持主机ip条件查询
  queryThirdResourceList(data: { hostIp: string }) {
    if (import.meta.env.DEV) {
      return sRequestInstance.post<GlobalResponse<ListResponseItem[]>>({
        url: "/api/v1/communicationSystem/queryThirdResourceList",
        data,
      })
    }

    let url = "/api/res/list/ip"
    if (data.hostIp) url += `/${data.hostIp}`
    return requestInstance.get<GlobalResponse<ListResponseItem[]>>({
      url,
    })
  }
}

export const sourceApi = new Api()
