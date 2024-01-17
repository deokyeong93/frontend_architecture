import { DayjsAdapter } from "./adapter/dayjs";
import { DateAdapterImpl } from "./types/dateTime";

class DateClient {
  private adapter: DateAdapterImpl;

  constructor(adapter: DateAdapterImpl) {
    this.adapter = adapter;
  }

  getCurrentDate(): string {
    return this.adapter.getCurrentDate();
  }
}

const adapter = new DayjsAdapter()

export const dateTime = new DateClient(adapter)
