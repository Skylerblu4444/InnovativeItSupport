import express from "express";
import ticketsRouter from "./routes/tickets";
import healthRouter from "./routes/health";

const app = express();
app.use(express.json());
app.use("/api/health", healthRouter);
app.use("/api/tickets", ticketsRouter);

export default app;
