import request from "supertest";
import app from "../src/backend/appForTest"; // we need a small exportable app for tests

describe("Tickets API", () => {
  it("GET /api/tickets returns 200", async () => {
    const res = await request(app).get("/api/tickets");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("tickets");
  });
});
