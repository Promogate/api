import dayjs, { ManipulateType } from "dayjs";

export function generateExpirationDate (value: number, unit: ManipulateType | undefined): string {
  const now = dayjs();
  return now.add(value, unit).format();
}