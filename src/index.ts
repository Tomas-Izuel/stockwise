import { Hono } from "hono";
import { connectDB } from "./config/database";
import { authRoutes } from "./routes/auth.route";
import { userRoutes } from "./routes/user.route";
import { logger } from "hono/logger";
import { trackerTypeRoutes } from "./routes/tracker_type.route";
import { trackerRoutes } from "./routes/tracker.route";

const app = new Hono();

connectDB();

app.use(logger());
app.route("/api/auth", authRoutes);
app.route("/api/user", userRoutes);
app.route("/api/tracker-type", trackerTypeRoutes);
app.route("/api/tracker", trackerRoutes);

export default app;
