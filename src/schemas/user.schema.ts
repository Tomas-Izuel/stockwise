import { z } from "zod";

export const UserRegisterDtoSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const UserLoginDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type UserRegisterDto = z.infer<typeof UserRegisterDtoSchema>;
export type UserLoginDto = z.infer<typeof UserLoginDtoSchema>;
