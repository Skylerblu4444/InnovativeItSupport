export const API_BASE = typeof window !== "undefined" ? (window.__API_BASE || "http://localhost:4000/api") : process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export async function api(path: string, opts: any = {}) {
  const url = `${API_BASE}${path}`;
  const headers = Object.assign({ "Content-Type": "application/json" }, opts.headers || {});
  const finalOpts = Object.assign({}, opts, { headers });
  if (finalOpts.body && typeof finalOpts.body !== "string") finalOpts.body = JSON.stringify(finalOpts.body);
  const res = await fetch(url, finalOpts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}
