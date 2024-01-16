export type DateUnit = {
  day: number,
  week: number,
  month: number,
  quarter: number,
  year: number,
  hour: number,
  minute: number,
  second: number,
  millisecond: number
}

export interface DateLib {
  addDate(options: Partial<DateUnit>): Date
}