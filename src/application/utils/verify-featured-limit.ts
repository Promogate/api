import { ErrorHandler, HttpStatusCode } from '@/application/utils';

type VerifyFeaturedLimitParams = {
  is_featured: boolean,
  role: string,
  offerNumber: number
}

export const verifyFeaturedLimit = (input: VerifyFeaturedLimitParams) => {
  if (input.is_featured === true && input.role === 'FREE' && input.offerNumber >= 10) {
    throw new ErrorHandler({
      statusCode: HttpStatusCode.BAD_REQUEST,
      name: 'OfferLimitReached',
      message: 'Limite de ofertas como destaque atingido.'
    });
  }
}
