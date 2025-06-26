import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import bodyParser from "body-parser";

// initialize express :
const app = express();

// Connect to DB
await connectDB();

// Middlewares (Global)
app.use(cors());

// 👉 Only use this for other routes
app.use(express.json());

// 👉 Special middleware for webhooks BEFORE /webhooks route
app.post("/webhooks", bodyParser.raw({ type: "application/json" }), clerkWebhooks);

// Normal Routes
app.get("/", (req, res) => res.send("API Working"));
app.get("/debug-sentry", () => {
  throw new Error("Sentry error!");
});

const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
