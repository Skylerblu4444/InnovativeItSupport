import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Portal() {
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => {
    async function load() {
      try {
        const p = await api("/auth/verify", { method: "GET", headers: { Authorization: "Bearer " + (localStorage.getItem("token") || "") }});
        setProfile(p.user);
      } catch (e) {
        console.log("not logged in");
      }
    }
    load();
  }, []);
  return (
    <main style={{ padding: 24 }}>
      <h1>Client Portal</h1>
      {profile ? <pre>{JSON.stringify(profile, null, 2)}</pre> : <p>Please log in.</p>}
    </main>
  );
}
