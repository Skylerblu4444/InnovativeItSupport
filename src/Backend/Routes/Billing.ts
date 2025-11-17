import { Router } from "express";
import { createCustomer, createSubscription } from "../services/billing";

const router = Router();

router.post("/create-customer", async (req, res) => {
  try {
    const { email } = req.body;
    const customer = await createCustomer(email);
    res.json({ customer });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/subscribe", async (req, res) => {
  try {
    const { customerId, priceId } = req.body;
    const subscription = await createSubscription(customerId, priceId);
    res.json({ subscription });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
