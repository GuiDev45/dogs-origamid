import { Link } from "react-router-dom";
import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";
import { useLoginForm } from "../../hooks/useLoginForm";

export default function LoginForm() {
  const { handleSubmit, register, errors, loading } = useLoginForm();

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" {...register("username")} />
        {errors.username && (
          <p className="text-red-500 text-xl mt-1">{errors.username.message}</p>
        )}
        <Input label="Senha" type="password" {...register("password")} />
        {errors.password && (
          <p className="text-red-500 text-xl mt-1">{errors.password.message}</p>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
}
