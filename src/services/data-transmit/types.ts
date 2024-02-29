export interface DataTransItem {
  FILESIZE_COUNT: number
  FILE_COUNT: number
  PERIOD_DATE: number
  USER_ID: string
  USER_ID_NAME: string
  DATA_TYPE_FIRST?: string
  DATA_TYPE_FIRST_NAME?: string
  detail?: string
}

export interface DataTransDetail {
  FILESIZE_COUNT: number
  FILE_COUNT: number
  USER_ID: string
  USER_ID_NAME: string
}
