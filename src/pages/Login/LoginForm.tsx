import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../models/schema";
import axios from "axios";

type TFormData = {
  identifier: string;
  password: string;
};

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginSubmit = async (formData: TFormData) => {
    try {
      const response = await axios.post(
        "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
        {
          identifier: formData.identifier,
          password: formData.password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        },
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <Input
          label="Usuário ou E-mail"
          type="text"
          {...register("identifier")}
        />
        {errors.identifier && (
          <p className="text-red-500 text-xl mt-1">
            {errors.identifier.message}
          </p>
        )}
        <Input label="Senha" type="password" {...register("password")} />
        {errors.password && (
          <p className="text-red-500 text-xl mt-1">{errors.password.message}</p>
        )}
        <Button type="submit">Entrar</Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
}
