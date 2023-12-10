import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../models/schema";
import { getToken, getUserData } from "../../services/apiService";

type TFormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginSubmit = async (formData: TFormData) => {
    try {
      const tokenResponse = await getToken({
        username: formData.username,
        password: formData.password,
      });

      console.log(tokenResponse.data);

      // Limpa os campos do formulário após sucesso
      reset();

      // Obtem o usuário após obter o token
      await getUser(tokenResponse.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  async function getUser(token: string) {
    try {
      const userResponse = await getUserData(token);

      console.log(userResponse.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <Input label="Usuário" type="text" {...register("username")} />
        {errors.username && (
          <p className="text-red-500 text-xl mt-1">{errors.username.message}</p>
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
