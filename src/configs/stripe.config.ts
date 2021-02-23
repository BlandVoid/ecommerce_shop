import Stripe from "stripe"

import { keys } from "./keys.config"

export const stripe = new Stripe(keys.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
})
