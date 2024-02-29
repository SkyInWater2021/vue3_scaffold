import type { GlobalResponse } from "@/types"

import { requestInstance } from "../request"

import type { DataTransItem } from "./types"

class Api {
  fetchCol() {
    return requestInstance.get<GlobalResponse<DataTransItem[]>>({
      url: `/api/col/list/500`,
    })
  }

  fetchDist() {
    return requestInstance.get<GlobalResponse<DataTransItem[]>>({
      url: `/api/dist/list/17/1000`,
    })
  }
}

export const dataTransApi = new Api()
