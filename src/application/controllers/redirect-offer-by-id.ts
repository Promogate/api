import { RedirectByOfferId } from "@/domain/features";
import { Request, Response } from "express";
import { ErrorHandler, HttpStatusCode } from "../utils";
import { RedirectByOfferIdUseCase } from "../usecases";
import { ResourcesRepository } from "@/data/repositories";

class RedirectOfferByIdController {
    constructor(private readonly redirectOffer: RedirectByOfferId) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params as { id: string }
        try {
            const { destinationLink } = await this.redirectOffer.execute({ id })
            return res.status(200).json({ destinationLink })
        } catch (error: any) {
            throw new ErrorHandler({
                statusCode: HttpStatusCode.INTERNAL_SERVER,
                name: 'FailedToRedirect',
                message: 'Tentativa de redirecionar para link de destino falhou.'
            })
        }
    }   
}

const offerRepository = new ResourcesRepository()
const redirectControllerUseCase = new RedirectByOfferIdUseCase(offerRepository)
export const redirectController = new RedirectOfferByIdController(redirectControllerUseCase)