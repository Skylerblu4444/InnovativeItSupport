import { Router } from "express";
import { supabase } from "../supabase";
import { ensureAuth } from "../middleware/auth";
import { z } from "zod";

const router = Router();

// simple schema
const commentSchema = z.object({
  ticket_id: z.string().uuid(),
  body: z.string().min(1)
});

router.post("/", ensureAuth, async (req, res) => {
  const parse = commentSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.errors });

  const user = (req as any).user;
  const payload = {
    ticket_id: parse.data.ticket_id,
    body: parse.data.body,
    author_id: user.id,
    created_at: new Date().toISOString()
  };

  const { data, error } = await supabase.from("ticket_comments").insert(payload).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ comment: data });
});

router.get("/ticket/:id", ensureAuth, async (req, res) => {
  const ticketId = req.params.id;
  const { data, error } = await supabase.from("ticket_comments").select("*").eq("ticket_id", ticketId).order("created_at", { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ comments: data });
});

export default router;
