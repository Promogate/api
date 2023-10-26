import { ErrorHandler, HttpStatusCode, verifyOfferLimit } from "@/application/utils";

test("ensure functions throws an Error is limit is reached", function () {
  const sut = () => verifyOfferLimit({is_on_showcase: true, role: "FREE", offerNumber: 50});
  expect(sut).toThrow(new ErrorHandler({
    statusCode: HttpStatusCode.BAD_REQUEST,
    status: "error",
    name: "OfferLimitReached",
    message: "Limite de ofertas na vitrine atingido."
  }));
});