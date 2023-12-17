import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../contexts/authHooks";
import { loginSchema } from "../models/schema";
import { getToken, getUserData } from "../services/apiService";

type TFormData = {
  username: string;
  password: string;
};

export const useLoginForm = () => {
  const { setData, setLoading, loading } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginSubmit: SubmitHandler<TFormData> = async (formData) => {
    try {
      // Desabilitar o botão antes de iniciar a solicitação assíncrona
      setLoading(true);

      const tokenResponse = await getToken({
        username: formData.username,
        password: formData.password,
      });

      // Atualizar o contexto de autenticação com os dados (token e user)
      setData({
        token: tokenResponse.data.token,
        user: await getUser(tokenResponse.data.token),
      });

      // Limpar os campos do formulário após sucesso
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      // Independente de sucesso ou falha, reabilitar o botão
      setLoading(false);
    }
  };

  async function getUser(token: string) {
    try {
      const userResponse = await getUserData(token);

      // Retornar os dados do usuário
      return {
        username: userResponse.data.username,
        // Outras informações do usuário, se necessário
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return {
    handleSubmit: handleSubmit(handleLoginSubmit),
    register,
    errors,
    loading,
  };
};
