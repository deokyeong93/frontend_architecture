import moment from "moment";
import { DateAdapterImpl } from "../types/dateTime";

export class MomentAdapter implements DateAdapterImpl {
  getCurrentDate(): string {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }
}
