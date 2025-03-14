import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  UserLoginDtoSchema,
  UserRegisterDtoSchema,
} from "../schemas/user.schema";
import { AuthService } from "../services/auth.service";

const router = new Hono();

const authService = new AuthService();

router.post(
  "/register",
  zValidator("json", UserRegisterDtoSchema),
  async (c) => {
    const data = c.req.valid("json");
    const user = await authService.register(data);
    return c.json(user);
  }
);
router.post("/login", zValidator("json", UserLoginDtoSchema), async (c) => {
  const data = c.req.valid("json");
  const user = await authService.login(data.email, data.password);
  return c.json(user);
});

export { router as authRoutes };
