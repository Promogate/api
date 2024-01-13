import { RedirectorLink } from "@/domain/features";
import { prisma } from "@/main/config";
import { ErrorHandler, HttpStatusCode } from "../utils";

export class RedirectorLinkService implements RedirectorLink {
  async execute(input: RedirectorLink.Input): Promise<RedirectorLink.Output> {
    const redirector = await prisma.redirector.findFirst({
      where: {
        id: input.redirectorId
      }, include: {
        groups: true
      }  
    });

    if (!redirector) throw new ErrorHandler({ 
      statusCode: HttpStatusCode.BAD_REQUEST,
      name: "FailedToGetRedirector",
      message: "Redirecionador não encontrado."
    });

    if (redirector.groups[redirector.currentGroup].members < redirector.groups[redirector.currentGroup].limit) {
      const updatedMembersQuantity = redirector.groups[redirector.currentGroup].members + 1;
      await prisma.group.update({
        where: { id: redirector.groups[redirector.currentGroup].id },
        data: {
          members: updatedMembersQuantity
        }
      });
      const addedTimesClicked = redirector.timesClicked + 1;
      await prisma.redirector.update({
        where: { id: input.redirectorId },
        data: {
          timesClicked: addedTimesClicked
        }
      });
      return redirector.groups[redirector.currentGroup].destination_link;
    }
    if (redirector.groups[redirector.currentGroup].members === redirector.groups[redirector.currentGroup].limit) {
      const newGroupPosition = redirector.currentGroup + 1;
      if (newGroupPosition > redirector.groups.length) {
        await prisma.redirector.update({
          where: { id: input.redirectorId },
          data: {
            redirectorStatus: "completed"
          }
        });
        return null;
      }
      const addedTimesClicked = redirector.timesClicked + 1;
      await prisma.redirector.update({
        where: { id: input.redirectorId },
        data: {
          currentGroup: newGroupPosition,
          timesClicked: addedTimesClicked
        }
      });
      return redirector.groups[newGroupPosition].destination_link;
    }

    throw new ErrorHandler({ 
      statusCode: HttpStatusCode.BAD_REQUEST,
      name: "FailedToProcessRedirector",
      message: "Erro ao tentar processar os dados do Redirecionador."
    });
  }
}