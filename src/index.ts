import { Hono } from "hono";
import { connectDB } from "./config/database";
import { authRoutes } from "./routes/auth.route";
import { userRoutes } from "./routes/user.route";
import { logger } from "hono/logger";

const app = new Hono();

connectDB();

app.use(logger());
app.route("/api/auth", authRoutes);
app.route("/api/user", userRoutes);

export default app;
