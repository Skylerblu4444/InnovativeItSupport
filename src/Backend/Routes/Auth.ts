import { Router } from "express";
import { supabase } from "../supabase";
const router = Router();

/**
 * NOTE: Use Supabase client-side auth in the long term.
 * This route provides basic server-side token verification if needed.
 */
router.get("/verify", async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "missing token" });
  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) return res.status(401).json({ error: error.message });
    res.json({ user: data.user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
