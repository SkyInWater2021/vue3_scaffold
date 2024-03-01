import type { GlobalResponse } from "@/types"

import { requestInstance, sRequestInstance } from "../request"

import type {
  FlumeLineResponseItem,
  FlumeListResponse,
  FlumeQueueResponse,
  MonitorItem,
  RMQLineResponseItem,
  RMQListResponse,
  RMQQueueResponse,
} from "./types"

class Api {
  fetchIpList(type: string) {
    return requestInstance.get<GlobalResponse<string>>({
      url: `/api/monitor/${type}/ip`,
    })
  }

  fetchMetricList(type: string) {
    return requestInstance.get<GlobalResponse<string>>({
      url: `/api/monitor/${type}/metric`,
    })
  }

  fetchHourMonitor(payload: { monitorType: string; ip: string; metric: string; device?: string }) {
    const devicePath = payload.device ? `${payload.device}/` : ""
    const { monitorType, ip, metric } = payload

    return requestInstance.get<GlobalResponse<MonitorItem[]>>({
      url: `/api/monitor/${monitorType}/hour/ip-${ip}/${devicePath}metric-${metric}`,
    })
  }

  fetchMinutesMonitor(payload: {
    monitorType: string
    ip: string
    metric: string
    minutes?: number
    device?: string
  }) {
    const devicePath = payload.device ? `${payload.device}/` : ""
    const { monitorType, minutes, ip, metric } = payload

    return requestInstance.get<GlobalResponse<MonitorItem[]>>({
      url: `/api/monitor/${monitorType}/minutes-${minutes}/ip-${ip}/${devicePath}metric-${metric}`,
    })
  }

  fetchMetricDetail(classCode: string, code: string) {
    return requestInstance.get<GlobalResponse<Record<string, string>>>({
      url: `/api/monitor/metric/detail/classCode-${classCode}/code-${code}`,
    })
  }
}

// RMQ 和 Flume api
class FlumeAndRMQ {
  // 查询系统状态rmq-三级页面的集群列表页面
  queryThirdRmqColonyLists(data: { limit: number; page: number }) {
    if (import.meta.env.DEV) {
      return sRequestInstance.post<GlobalResponse<RMQListResponse>>({
        url: `/api/v1/communicationSystem/queryThirdRmqColonyLists`,
        data,
      })
    }

    return requestInstance.get<GlobalResponse<RMQListResponse>>({
      url: `/api/mq/cluster/${data.page}/${data.limit}`,
    })
  }

  // 查询系统状态rmq-三级页面的队列最新的参数列表,传入ip web端口,可以选择某一列升序/降序，如果未选择 排序字段和排序方式 不传
  queryThirdRmqArgLists(data: {
    limit: number
    page: number
    hostIp?: string
    port?: string
    sortName?: string
    sortType?: string
  }) {
    if (import.meta.env.DEV) {
      return sRequestInstance.post<GlobalResponse<RMQQueueResponse>>({
        url: `/api/v1/communicationSystem/queryThirdRmqArgLists`,
        data,
      })
    }
    return requestInstance.post<GlobalResponse<RMQQueueResponse>>({
      url: `/api/mq/args`,
    })
  }

  // 查询系统状态模块-rmq参数列表跳转折线图接口 目前支持最大时间跨度是跨一天 且最长时间范围24小时
  queryThirdRmqLineChart(data: Record<string, string | number>) {
    if (import.meta.env.DEV) {
      return sRequestInstance.post<GlobalResponse<RMQLineResponseItem[]>>({
        url: `/api/v1/communicationSystem/queryThirdRmqLineChart`,
        data,
      })
    }
    const { hostId, queueName, linesType, interval_unit, interval } = data
    return requestInstance.get<GlobalResponse<RMQLineResponseItem[]>>({
      url: `/api/mq/line/host-${hostId}/query-${queueName}/type-${linesType}/${interval_unit}/${interval}`,
    })
  }

  // 查询系统状态flume-三级页面的集群列表页面
  queryThirdFlumeColonyLists(data: { limit: number; page: number }) {
    if (import.meta.env.DEV) {
      return sRequestInstance.post<GlobalResponse<FlumeListResponse>>({
        url: `/api/v1/communicationSystem/queryThirdFlumeColonyLists`,
        data,
      })
    }
    return requestInstance.get<GlobalResponse<FlumeListResponse>>({
      url: `/api/flume/cluster/${data.page}/${data.limit}`,
    })
  }

  // 查询系统状态flume-三级页面的队列最新的参数列表,传入ip 端口,可以选择某一列升序/降序，如果未选择 排序字段和排序方式 不传
  queryThirdFlumeArgLists(data: {
    limit: number
    page: number
    hostIp?: string
    port?: string
    sortName?: string
    sortType?: string
  }) {
    if (import.meta.env.DEV) {
      return sRequestInstance.post<GlobalResponse<FlumeQueueResponse>>({
        url: `/api/v1/communicationSystem/queryThirdFlumeArgLists`,
        data: { ...data, port: data.port ? data.port : null },
      })
    }

    return requestInstance.post<GlobalResponse<FlumeQueueResponse>>({
      url: `/api/flume/args`,
      data: { ...data, port: data.port ? data.port : null },
    })
  }

  // 查询系统状态模块-flume参数列表跳转折线图接口 目前支持最大时间跨度是跨一天 且最长时间范围24小时
  queryThirdFlumeLineChart(data: Record<string, string | number>) {
    if (import.meta.env.DEV) {
      return sRequestInstance.post<GlobalResponse<FlumeLineResponseItem[]>>({
        url: `/api/v1/communicationSystem/queryThirdFlumeLineChart`,
        data,
      })
    }

    const { channelName, flumeId, linesType, interval_unit, interval } = data
    return requestInstance.get<GlobalResponse<FlumeLineResponseItem[]>>({
      url: `/api/flume/line/channel-${channelName}/id-${flumeId}/type-${linesType}/${interval_unit}/${interval}`,
      data,
    })
  }

  // 查询系统状态模块-flume参数列表,查看某flume节点通道的历史启动时间最近5次
  queryThirdFlumeStartTimeTopFive(data: { channelName: string; flumeId: string }) {
    return sRequestInstance.post<GlobalResponse<string>>({
      url: `/api/v1/communicationSystem/queryThirdFlumeStartTimeTopFive`,
      data,
    })
  }
}

export const systemStatusApi = new Api()
export const systemStatusFRApi = new FlumeAndRMQ()
