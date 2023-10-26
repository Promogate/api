import { ErrorHandler, HttpStatusCode, verifyFeaturedLimit } from "@/application/utils";

test("ensure functions throws an Error is limit is reached", function () {
  const sut = () => verifyFeaturedLimit({is_featured: true, role: "FREE", offerNumber: 10});
  expect(sut).toThrow(new ErrorHandler({
    statusCode: HttpStatusCode.BAD_REQUEST,
    name: "OfferLimitReached",
    message: "Limite de ofertas como destaque atingido."
  }));
});