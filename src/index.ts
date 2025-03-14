import { Hono } from "hono";
import { connectDB } from "./config/database";
import { authRoutes } from "./routes/auth.route";
import { userRoutes } from "./routes/user.route";

const app = new Hono();

connectDB();

app.route("/api/auth", authRoutes);
app.route("/api/user", userRoutes);

export default app;
