import type { GlobalResponse } from "@/types"

import { requestInstance } from "../request"

import type { ListResponseItem } from "./types"

class Api {
  fetchList() {
    return requestInstance.get<GlobalResponse<ListResponseItem[]>>({
      url: "/api/nas/list",
    })
  }
}

export const nasApi = new Api()
