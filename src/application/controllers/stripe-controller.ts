import { HttpServer } from "@/infra/http";
import { ErrorHandler, HttpStatusCode, getAbsoluteUrl } from "../utils";
import { rawBody, verifyToken } from "../middlewares";
import { prisma } from "@/main/config";
import { stripe } from "../lib/stripe";
import { Request, Response } from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const settingsUrl = getAbsoluteUrl("/painel");

export class StripeController {
  constructor(httpServer: HttpServer) {

    httpServer.on("get", "/stripe/subscribe", [verifyToken], async function (request: Request & { user?: string, role?: string }, response: Response) {
      try {
        if (!request.user) {
          throw new ErrorHandler({
            message: "Unauthorized",
            name: "Unauthorized",
            statusCode: HttpStatusCode.UNAUTHORIZED
          });
        }
        const user = await prisma.user.findUnique({
          where: { id: request.user }
        });
        if (!user) {
          throw new ErrorHandler({
            message: "Unauthorized",
            name: "Unauthorized",
            statusCode: HttpStatusCode.UNAUTHORIZED
          });
        }
        const userSubscription = await prisma.userSubscription.findUnique({
          where: { userId: request.user }
        });
        if (userSubscription && userSubscription.stripeCustomerId) {
          const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: settingsUrl
          });

          return { url: stripeSession.url };
        }
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: settingsUrl,
          cancel_url: settingsUrl,
          payment_method_types: ["card"],
          mode: "subscription",
          billing_address_collection: "auto",
          customer_email: user.email,
          line_items: [
            {
              price_data: {
                currency: "BRL",
                product_data: {
                  name: "Promogate PRO",
                  description: "Versão sem restrições do painel Promogate!"
                },
                unit_amount: 2990,
                recurring: {
                  interval: "month"
                }
              },
              quantity: 1
            }
          ],
          metadata: {
            userId: user.id
          }
        });
        return response.json({ url: stripeSession.url }).status(200);
      } catch (error: any) {
        throw new ErrorHandler({
          message: error.message,
          name: "StripeFailed",
          statusCode: HttpStatusCode.INTERNAL_SERVER
        });
      }
    });

    httpServer.on("post", "/stripe/webhook", [bodyParser.text({ type: "application/json" }), rawBody], async function (request: Request & { rawBody: any }, response: Response) {
      const signature = request.headers["stripe-signature"] as string;
      let event: Stripe.Event;
      try {
        event = stripe.webhooks.constructEvent(
          request.rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET as string
        );
      } catch (error: any) {
        throw new ErrorHandler({
          message: error.message,
          name: "StripeFailed",
          statusCode: HttpStatusCode.BAD_REQUEST
        });
      }
      const session = event.data.object as Stripe.Checkout.Session;
      if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        if (!session?.metadata?.userId) {
          throw new ErrorHandler({
            message: "User id is required",
            name: "StripeFailed",
            statusCode: HttpStatusCode.BAD_REQUEST
          });
        }
        const user = await prisma.user.findUnique({
          where: { id: session?.metadata?.userId },
          include: { user_profile: true }
        });
        if (!user) {
          throw new ErrorHandler({
            message: "User not found",
            name: "UserNotFound",
            statusCode: HttpStatusCode.UNAUTHORIZED
          });
        }
        await prisma.userSubscription.create({
          data: {
            userId: user.id,
            userProfileId: user.user_profile?.id as string,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            )
          }
        });
        await prisma.userProfile.update({
          where: { user_id: user.id },
          data: {
            role: "PREMIUM"
          }
        });
      }

      if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        await prisma.userSubscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            )
          }
        });
      }
      return null;
    });
  }
}