export interface TotalItem {
  FILESIZE_COUNT: number
  FILESIZE_AVG: number
  DATA_TYPE: null | string
  DATA_TYPE_NAME: null | string
  PERIOD_DATE: number
  DATA_PCT_TYPE: number
  DATA_PCT: number
}

export interface CodeItem {
  FILE_COUNT: number
  FILESIZE_COUNT: number
  PERIOD_DATE: number
  DATA_TYPE: string
  DATA_TYPE_NAME: string
}
