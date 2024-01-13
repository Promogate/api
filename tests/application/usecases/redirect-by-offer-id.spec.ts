import { RedirectByOfferIdUseCase } from "@/application/usecases";
import { ErrorHandler, HttpStatusCode } from "@/application/utils";
import { FindOfferByIdRepository } from "@/data/contracts";
import { MockProxy, mock } from "jest-mock-extended";

describe("RedirectByOfferIdUseCase", () => {
    let offerRepository: MockProxy<FindOfferByIdRepository>;
    const input = { id: "any_id" };
    let sut: RedirectByOfferIdUseCase;

    beforeEach(() => {
        offerRepository = mock();
        sut = new RedirectByOfferIdUseCase(offerRepository);
        offerRepository.findOfferById.mockResolvedValue({
            id: "",
            image: "",
            old_price: "",
            price: "",
            resourceId: "",
            store_image: "",
            title: "",
            destination_link: "",
            expiration_date: ""
        });
    });

    test("it should call RedirectByOfferIdUseCase with correct params", async () => {
        await  sut.execute(input);
        expect(offerRepository.findOfferById).toHaveBeenCalledWith({ id: "any_id" });
    });

    test("it should RedirectByOfferIdUseCase throw an error when findOfferById method returns undefined", async () => {
        offerRepository.findOfferById.mockResolvedValueOnce(undefined);
        await expect(sut.execute(input)).rejects.toThrow(new ErrorHandler({
            statusCode: HttpStatusCode.NOT_FOUND,
            name: "OfferNotFound",
            message: "Redirecionamento falhou. Oferta não encontrada."
        }));
    });
});