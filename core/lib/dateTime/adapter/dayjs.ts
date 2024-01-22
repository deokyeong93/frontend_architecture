import dayjs from 'dayjs'
import { DateAdapterImpl } from '../types/dateTime';

export class DayjsAdapter implements DateAdapterImpl {
  getCurrentDate(format: string) {
    return dayjs().format(format);
  }
}
