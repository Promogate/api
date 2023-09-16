import { StripeService } from "@/application/services/Stripe";
import { ErrorHandler, HttpStatusCode } from "@/application/utils";
import { prisma, STRIPE_DEV_API_KEY, STRIPE_LIVE_API_KEY, TS_NODE_ENV } from "@/main/config";
import { Router } from "express";
import Stripe from "stripe";

const paymentRouter = Router();
const stripeService = new StripeService();
const stripe = new Stripe((TS_NODE_ENV ? STRIPE_DEV_API_KEY : STRIPE_LIVE_API_KEY), {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "Promogate",
    version: "1.0.0"
  },
  typescript: true
});

paymentRouter.get("/product", async (req, res) => {
  const result = await stripeService.getPriceWithProduct();
  return res.status(200).json(result);
});

paymentRouter.post("/create-customer", async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email
      }
    });
    if (!user) throw new ErrorHandler({
      statusCode: HttpStatusCode.BAD_REQUEST,
      name: "UserNotFound",
      message: "Usuário não encontrado. Tente novamente."
    });
    const customer = await stripe.customers.create({
      email: req.body.email,
    });
    await prisma.userProfile.update({
      where: {
        user_id: user.id,
      },
      data: {
        payment_customer_id: customer.id
      }
    });
    return res.status(HttpStatusCode.OK).json({ customer });
  } catch (error: any) {
    throw new ErrorHandler({
      statusCode: HttpStatusCode.BAD_REQUEST,
      name: "UserNotFound",
      message: "Usuário não encontrado. Tente novamente."
    });
  }
});

paymentRouter.post("/create-subscription", async (req, res) => {
  // Simulate authenticated user. In practice this will be the
  // Stripe Customer ID related to the authenticated user.
  const customerId = req.cookies["customer"];

  // Create the subscription
  const priceId = req.body.priceId;

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: priceId,
      }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    if (!subscription) throw new ErrorHandler({
      statusCode: HttpStatusCode.BAD_REQUEST,
      name: "Erro ao finalizar a assinatura",
      message: "Houve algum erro ao criar a sua assinatura"
    });

    res.sendStatus(HttpStatusCode.OK).send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice,
    });
  } catch (error: any) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

export { paymentRouter };
