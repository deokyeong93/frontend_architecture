import dayjs from "dayjs"
import type { DateLib, DateUnit } from "../types/DateLib"

export const DayJsAdapter: DateLib = {
  addDate(options: Partial<DateUnit>) {
      return dayjs().toDate()
  },
}

