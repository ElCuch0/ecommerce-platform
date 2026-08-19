import express from "express";
import cors from "cors";
import routes from "./routes/index.routes.js";
import errorMiddleware from "./shared/middleware/error.middleware.js";
import { env } from "./config/env.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: env.corsOrigin, credentials: true }));

app.use("/api", routes);

app.use(errorMiddleware);

export default app;
