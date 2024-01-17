import dayjs from 'dayjs'
import { DateAdapterImpl } from '../types/dateTime';

export class DayjsAdapter implements DateAdapterImpl {
  getCurrentDate(): string {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  }
}
