import { DateHandler } from "@/domain/features/date-handler";
import dayjs, { Dayjs } from "dayjs";

export class DateHandlerService implements DateHandler {
  private date: Dayjs;

  constructor () {
    this.date = dayjs();
  }

  hasEnded(date: string | Date): boolean {
    return this.date.isAfter(date);
  }
}
