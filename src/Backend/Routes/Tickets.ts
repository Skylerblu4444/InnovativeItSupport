import { Router } from "express";
import { supabase } from "../supabase";
import { z } from "zod";

const router = Router();

const createTicketSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  client_id: z.string().uuid().optional(),
  priority: z.number().min(1).max(5).optional()
});

/**
 * Create ticket
 */
router.post("/", async (req, res) => {
  const parse = createTicketSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.errors });

  const payload = {
    title: parse.data.title,
    description: parse.data.description || "",
    client_id: parse.data.client_id || null,
    priority: parse.data.priority || 3
  };

  const { data, error } = await supabase.from("tickets").insert(payload).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ ticket: data });
});

/**
 * List tickets (simple)
 */
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("tickets").select("*").order("created_at", { ascending: false }).limit(100);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ tickets: data });
});

/**
 * Patch ticket
 */
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  updates.updated_at = new Date().toISOString();
  const { data, error } = await supabase.from("tickets").update(updates).eq("id", id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ ticket: data });
});

export default router;
