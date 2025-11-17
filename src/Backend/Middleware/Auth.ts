import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { supabase } from "../supabase";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

/**
 * Try to verify with Supabase first (via auth.getUser),
 * otherwise, if the server issues local JWTs, verify them.
 *
 * Sets req.user = { id, email, role }
 */
export async function ensureAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
    const token = authHeader.replace("Bearer ", "").trim();

    // try Supabase
    try {
      const { data, error } = await supabase.auth.getUser(token);
      if (!error && data?.user) {
        (req as any).user = {
          id: data.user.id,
          email: (data.user.email as string) || null,
        };
        return next();
      }
    } catch (e) {
      // ignore and fall through
    }

    // fallback to local JWT
    const payload = jwt.verify(token, JWT_SECRET) as any;
    (req as any).user = { id: payload.sub, email: payload.email, role: payload.role || "client" };
    return next();
  } catch (err: any) {
    console.error("Auth error:", err.message || err);
    return res.status(401).json({ error: "Invalid token" });
  }
}

/** Helper to enforce role(s) */
export function requireRole(...allowed: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    if (!allowed.length) return next();
    // role detection uses Supabase profile table ideally; here we expect role in JWT or profile
    const role = user.role || (req as any).profile?.role || "client";
    if (!allowed.includes(role)) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}
