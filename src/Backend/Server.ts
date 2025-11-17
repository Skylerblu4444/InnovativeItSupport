import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import ticketsRouter from "./routes/tickets";
import authRouter from "./routes/auth";
import healthRouter from "./routes/health";
import { requestLogger } from "./middleware/logger";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(requestLogger);

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/tickets", ticketsRouter);

// basic error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal error" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
