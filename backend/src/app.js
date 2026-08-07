import express from "express";
import routes from "./routes/index.routes.js";
import { errorMiddleware } from "./shared/middleware/error.middleware.js"

const app = express();

app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

export default app;
