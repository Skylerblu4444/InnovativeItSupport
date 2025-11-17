export const API_BASE = "http://localhost:4000/api";

export async function api(path: string, opts: any = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts
  });
  return res.json();
}
