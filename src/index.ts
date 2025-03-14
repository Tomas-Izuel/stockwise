import { Hono } from "hono";
import { connectDB } from "./config/database";
import { authRoutes } from "./routes/auth.route";

const app = new Hono();

connectDB();

app.route("/api/auth", authRoutes);

export default app;
