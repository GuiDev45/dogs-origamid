import { z } from "zod";

const required = {
  required_error: "Campo obrigatório",
};

export const loginSchema = z.object({
  username: z
    .string(required)
    .min(3, "O usuário precisa ter ao menos 3 dígitos"),

  password: z.string(required).min(3, "A senha precisa ter ao menos 3 dígitos"),
});
