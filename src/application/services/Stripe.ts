import { STRIPE_DEV_API_KEY, STRIPE_LIVE_API_KEY, TS_NODE_ENV } from '@/main/config';
import { Stripe } from 'stripe';

export class StripeService {
  stripe: Stripe

  constructor() {
    this.stripe = new Stripe((TS_NODE_ENV ? STRIPE_DEV_API_KEY : STRIPE_LIVE_API_KEY), { 
      apiVersion: '2022-11-15',
      appInfo: {
        name: 'Promogate',
        version: '1.0.0'
      },
      typescript: true
    });
  }

  static instance() {
    return new Stripe((TS_NODE_ENV ? STRIPE_DEV_API_KEY : STRIPE_LIVE_API_KEY), { 
      apiVersion: '2022-11-15',
      appInfo: {
        name: 'Promogate',
        version: '1.0.0'
      },
      typescript: true
    });
  }

  async getPriceWithProduct() {
    const price = await this.stripe.prices.retrieve('price_1NSL0kKikQgs1L84CUzx8KmU', { 
      expand: ['product']
    });
    const product = {
      priceId: price.id,
      amount: (price.unit_amount as number / 100),
    };

    return product;
  }
}