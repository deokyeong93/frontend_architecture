import { DayjsAdapter } from "./adapter/dayjs";
import { DateAdapterImpl } from "./types/dateTime";

class DateClient implements DateAdapterImpl {
  private adapter: DateAdapterImpl;

  constructor(adapter: DateAdapterImpl) {
    this.adapter = adapter;
  }

  getCurrentDate(format: string) {
    return this.adapter.getCurrentDate(format);
  }
}

const adapter = new DayjsAdapter()

export const dateTime = new DateClient(adapter)
