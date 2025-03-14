import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { AuthService } from "../services/auth.service";

const router = new Hono();

const authService = new AuthService();

router.get("/me", authMiddleware, async (c) => {
  const payload = c.get("jwtPayload");
  const profile = await authService.getProfile(payload.sub);
  return c.json(profile);
});

export { router as userRoutes };
