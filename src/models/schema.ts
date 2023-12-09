import { z } from "zod";

const required = {
  required_error: "Campo obrigatório",
};

export const loginSchema = z.object({
  identifier: z.string(required).refine(
    (data) => {
      return data.length >= 3;
    },
    {
      message:
        "O nome deve ter pelo menos 3 caracteres ou você pode inserir um e-mail válido.",
    },
  ),
  password: z.string(required).min(8, "A senha precisa ter ao menos 8 dígitos"),
});
