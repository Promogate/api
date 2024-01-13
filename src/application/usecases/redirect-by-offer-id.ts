import { FindOfferByIdRepository } from "@/data/contracts";
import { RedirectByOfferId } from "@/domain/features";
import { ErrorHandler, HttpStatusCode } from "@/application/utils";

export class RedirectByOfferIdUseCase implements RedirectByOfferId {
    constructor(private readonly offerRepository: FindOfferByIdRepository) {}

    async execute(input: RedirectByOfferId.Input): Promise<RedirectByOfferId.Output> {
        const result = await this.offerRepository.findOfferById({ id: input.id });
        if (!result) throw new ErrorHandler({
            statusCode: HttpStatusCode.NOT_FOUND,
            name: "OfferNotFound",
            message: "Redirecionamento falhou. Oferta não encontrada."
        });
        return {
            destinationLink: result.destination_link
        };
    }
}