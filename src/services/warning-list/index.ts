import type { GlobalResponse } from "@/types"

import { requestInstance } from "../request"

import type { WarningListItem } from "./types"

class Api {
  fetchList(range: [number, number]) {
    return requestInstance.get<GlobalResponse<WarningListItem[]>>({
      url: `/api/ei/list/limit/${range[0]}-${range[1]}`,
    })
  }
}

export const warningListApi = new Api()
