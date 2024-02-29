export interface WarningListItem {
  tenant_id: string
  type: string
  receive_time: number
  message: string
  sender: string
  name: string
  gateway_ip: string
  SYSTEM: string
  KComment: string
  PROCESS_LINK: string
  EVENT_TYPE: string
  EVENT_LEVEL: string
  EVENT_TRAG: string
  EVENT_SUGGEST: string
  EVENT_EXT2: string
  EVENT_EXT1: string
  EVENT_TIME: string
  ORG_TIME: string
  KResult: string
  GROUP_ID: string
  EVENT_CONTROL: string
  KEvent: string
  MSG_TYPE: string
  KObject: string
  DATA_FROM: string
  EVENT_TITLE: string
  KIndex: string
  COL_TYPE: string
  occur_time: number

  TITLE_COUNT?: null
  version?: null
  listcount?: null
}
