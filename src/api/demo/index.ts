import { Response } from "@/types"
import { requestInstance } from "@/utils"

import type { ListResponseItem } from "./types"

class Api {
  fetchList() {
    return requestInstance.get<Response<ListResponseItem[]>>({
      url: "/api/nas/list",
    })
  }
}

export const demoApi = new Api()
