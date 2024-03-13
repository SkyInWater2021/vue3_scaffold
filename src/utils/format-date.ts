import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

interface OffsetType {
  offset?: number
  offsetType?: "hour" | "month" | "day"
  startTime?: Date | string | dayjs.Dayjs
  format?: string
  utc?: boolean
}

export function dateOffset({
  offset = 0,
  offsetType = "hour",
  startTime = new Date(),
  format = "YYYY-MM-DD HH:mm:ss",
  utc = false,
}: OffsetType): string {
  const type = offset < 0 ? "subtract" : "add"
  const initialTime = dayjs(startTime)
  const operatedTime = utc ? initialTime.utc() : initialTime
  return operatedTime[type](Math.abs(offset), offsetType).format(format)
}

export function dateFormat(
  date?: Date | string | dayjs.Dayjs,
  format = "YYYY-MM-DD HH:mm:ss",
): string | undefined {
  return date ? dayjs(date).format(format) : undefined
}

export function getCnWeek(date?: Date | string | dayjs.Dayjs) {
  const num = dateFormat(date, "d")
  if (!num) return
  const index = Number(num) % 7
  return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][index]
}
