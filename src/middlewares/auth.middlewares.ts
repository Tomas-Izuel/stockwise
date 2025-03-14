import { Context, Next } from "hono";
import { verify } from "hono/jwt";

const SECRET_KEY = process.env.JWT_SECRET || "tu-clave-secreta";

export async function authMiddleware(c: Context, next: Next) {
  try {
    const token = c.req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return c.json({ message: "Token no proporcionado" }, 401);
    }

    const payload = await verify(token, SECRET_KEY);
    c.set("user", payload);
    await next();
  } catch (error) {
    return c.json({ message: "Token inválido" }, 401);
  }
}
