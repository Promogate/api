import { generateExpirationDate } from "@/application/utils";
import dayjs from "dayjs";

test("ensure function generates expiration date correctly", function () {
  const expirationDate = generateExpirationDate(3, "days");
  const isAfter = dayjs(expirationDate).isAfter(dayjs().add(2, "days")) && dayjs(expirationDate).isBefore(dayjs().add(3, "days"));
  expect(isAfter).toBeTruthy();
});