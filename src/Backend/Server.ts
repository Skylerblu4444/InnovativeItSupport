import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import ticketsRouter from "./routes/tickets";
import authRouter from "./routes/auth";
import healthRouter from "./routes/health";
import billingRouter from "./routes/billing";
import commentsRouter from "./routes/comments";
import devicesRouter from "./routes/devices";
import webhooksRouter from "./routes/webhooks";
import { requestLogger } from "./middleware/logger";
import logger from "./middleware/loggerWinston";

dotenv.config();

const app = express();

// NOTE:
// stripe webhook handler expects raw body for signature verification. We mount the webhooks route
// BEFORE the json parser and use a custom raw reader inside that route. Other routes use express.json().
app.use(cors());
app.use(helmet());
app.use(requestLogger);

// mount webhooks first (it contains its own raw reader)
app.use("/api/webhooks", webhooksRouter);

// JSON parser for all other routes
app.use(express.json({ limit: "1mb" }));

// simple request logger (console + winston)
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/devices", devicesRouter);
app.use("/api/billing", billingRouter);

// basic error handler
app.use((err: any, req: any, res: any, next: any) => {
  logger.error(err.stack || err.message || err);
  res.status(err.status || 500).json({ error: err.message || "Internal error" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  logger.info(`Server listening on ${port}`);
  console.log(`Server listening on ${port}`);
});
