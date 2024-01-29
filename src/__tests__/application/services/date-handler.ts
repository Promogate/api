import { DateHandlerService } from "@/application/services/date-handler";

describe("Date Handler Suite", function () {

  test("it should verify if subscription is overdue", async function () {
    const endDate = "2024-01-20T19:00:00.000Z";
    const sut = new DateHandlerService();
    const output = sut.hasEnded(endDate);
    expect(output).toBeTruthy();
  });
});