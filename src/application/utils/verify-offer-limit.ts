import { ErrorHandler, HttpStatusCode } from "@/application/utils";

type VerifyOfferLimitParams = {
  is_on_showcase: boolean,
  role: string,
  offerNumber: number
}

export const verifyOfferLimit = (input: VerifyOfferLimitParams) => {
  if (input.is_on_showcase === true && input.role === "FREE" && input.offerNumber >= 50) {
    throw new ErrorHandler({
      statusCode: HttpStatusCode.BAD_REQUEST,
      status: "error",
      name: "OfferLimitReached",
      message: "Limite de ofertas na vitrine atingido."
    });
  }
};
