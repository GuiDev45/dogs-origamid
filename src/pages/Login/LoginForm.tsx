import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";

type TFormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const { handleSubmit, register } = useForm<TFormData>();

  const handleLoginSubmit = (formData: TFormData) => {
    fetch("https://dogsapi.origamid.dev/json/jwt-auth/v1/token", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
      });
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <Input
          label="Usuário"
          type="text"
          name="username"
          placeholder="Nome Usuário"
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Senha"
        />
        <Button type="submit">Entrar</Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
}
