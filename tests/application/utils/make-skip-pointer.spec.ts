import { makeSkipPointer } from "@/application/utils";

test("ensure skip pointer is made correctly", function () {
  const sut = makeSkipPointer(2, 25);
  expect(sut).toBe(25);
});

test("ensure skip pointer returns zero if page is 1", function () {
  const sut = makeSkipPointer(1, 25);
  expect(sut).toBe(0);
});