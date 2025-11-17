import { Router } from "express";
import { supabase } from "../supabase";
import { z } from "zod";
import { ensureAuth } from "../middleware/auth";

const router = Router();

/**
 * Device report schema: lightweight telemetry from agent
 */
const reportSchema = z.object({
  device_id: z.string().min(1),
  hostname: z.string().optional(),
  os: z.string().optional(),
  cpu: z.any().optional(),
  memory: z.any().optional(),
  disk: z.any().optional(),
  client_id: z.string().uuid().optional()
});

router.post("/report", async (req, res) => {
  // agent may not have a user token; allow unauthenticated but validate payload
  const parse = reportSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.errors });

  const payload = {
    id: parse.data.device_id,
    hostname: parse.data.hostname || null,
    os: parse.data.os || null,
    cpu: parse.data.cpu || null,
    memory: parse.data.memory || null,
    disk: parse.data.disk || null,
    client_id: parse.data.client_id || null,
    last_seen: new Date().toISOString(),
    meta: {
      reported_at: new Date().toISOString()
    }
  };

  // upsert into devices table
  const { data, error } = await supabase.from("devices").upsert(payload, { onConflict: ["id"] }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ device: data });
});

router.get("/", ensureAuth, async (req, res) => {
  const { data, error } = await supabase.from("devices").select("*").order("last_seen", { ascending: false }).limit(500);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ devices: data });
});

export default router;
