import moment from "moment";
import { DateAdapterImpl } from "../types/dateTime";

export class MomentAdapter implements DateAdapterImpl {
  getCurrentDate(format: string) {
    return moment().format(format);
  }
}
