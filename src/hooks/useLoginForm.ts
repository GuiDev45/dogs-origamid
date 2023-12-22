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
  const { setData, setLoading, loading, logout, data } = useAuth();

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
      setLoading(true);

      if (
        data.token &&
        data.tokenExpiration &&
        data.tokenExpiration < Date.now()
      ) {
        console.log("Token expirado. Fazendo logout...");
        logout();
        return;
      }

      const tokenResponse = await getToken({
        username: formData.username,
        password: formData.password,
      });

      console.log("Token obtido com sucesso:", tokenResponse.data.token);

      setData({
        token: tokenResponse.data.token,
        user: await getUser(tokenResponse.data.token),
        tokenExpiration: Date.now() + 60 * 60 * 1000,
      });

      reset();
    } catch (error) {
      console.error("Erro durante a autenticação:", error);
    } finally {
      setLoading(false);
    }
  };

  async function getUser(token: string) {
    try {
      const userResponse = await getUserData(token);
      return {
        username: userResponse.data.username,
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
