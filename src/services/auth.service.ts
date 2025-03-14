import { sign } from "hono/jwt";
import { User } from "../models/user.model";

const SECRET_KEY = process.env.JWT_SECRET || "tu-clave-secreta";

export class AuthService {
  async register(userData: { email: string; password: string; name: string }) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Usuario ya existe");
    }

    const hashedPassword = await Bun.password.hash(userData.password);
    const user = await User.create({
      ...userData,
      password: hashedPassword,
    });

    const token = await this.generateToken(user);
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isValidPassword = await Bun.password.verify(password, user.password);
    if (!isValidPassword) {
      throw new Error("Contraseña incorrecta");
    }

    const token = await this.generateToken(user);
    return { user, token };
  }

  async getProfile(userId: string) {
    const user = await User.findById(userId).select("-password"); // Excluimos el password
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  }

  private async generateToken(user: any) {
    const payload = {
      sub: user._id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 horas
    };
    return await sign(payload, SECRET_KEY);
  }
}
