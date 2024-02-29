export interface MonitorItem {
  group: string
  points: string
}

export interface MonitorGroup {
  ip: string
  metric_name: string
}

export interface MonitorPoints {
  [x: string]: number
}

export interface RMQListResponse {
  list: {
    clusterName: string
    hostIp: string
    hostName: string
    port: number
    rmqName: string
  }[]

  total: number
  pages: number
}

export interface FlumeListResponse {
  list: {
    clusterName: string
    hostIp: string
    nodeName: string
    port: number
    flumeId: string
    state: number
  }[]

  total: number
  pages: number
}

export interface RMQQueueResponse {
  list: {
    ackRate: number
    deliverRate: number
    mqReady: number
    mqTotal: number
    mqUnacked: number
    pkId: string
    date: string
    hostIp: string
    hostName: string
    queueName: string
    rmqName: string
    port: number
    publishRate: number
  }[]

  total: number
  pages: number
}

export interface FlumeQueueResponse {
  list: {
    port: number
    state: number
    channelCapacity: number
    channelFillPercentage: number
    eventPutAttemptCount: number | null
    eventPutSuccessCount: number | null
    eventTakeAttemptCount: number | null
    eventTakeSuccessCount: number | null

    channelName: string
    flumeId: string
    monitorIp: string
    monitorTime: string
    nodeName: string
    startTime: string
    stopTime: string
  }[]

  total: number
  pages: number
}

export interface RMQLineResponseItem {
  mqCount: null | number
  periodDate: number
}

export interface FlumeLineResponseItem {
  flumePct: null | number
  periodDate: number
}
