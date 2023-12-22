import React from "react";
import { getUserData, validateToken } from "../services/apiService";
import { useNavigate } from "react-router-dom";

type User = {
  username: string;
};

export type AuthContextProps = {
  data: {
    token: string | null;
    user: User | null;
    tokenExpiration: number | null;
  };
  loading: boolean;
  error: string | null;
  setData: (data: {
    token: string | null;
    user: User | null;
    tokenExpiration: number | null;
  }) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [data, setData] = React.useState<{
    token: string | null;
    user: User | null;
    tokenExpiration: number | null;
  }>({
    token: localStorage.getItem("token") || null,
    user: null,
    tokenExpiration: null,
  });
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const autoLogin = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          await validateToken(storedToken);
          const userDataResponse = await getUserData(storedToken);
          setData({
            token: storedToken,
            user: {
              username: userDataResponse.data.username,
            },
            tokenExpiration: Date.now() + 60 * 60 * 1000,
          });

          localStorage.setItem("token", storedToken);

          setError(null);
        } catch (error) {
          console.error("Erro durante autoLogin:", error);
          setError(
            "Erro durante o login. Verifique suas credenciais e tente novamente.",
          );
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    autoLogin();
  }, []);

  const setAuthData = (newData: {
    token: string | null;
    user: User | null;
    tokenExpiration: number | null;
  }) => {
    setData(newData);
    if (newData.token) {
      localStorage.setItem("token", newData.token);
      navigate("/conta");
    } else {
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    setData({ token: null, user: null, tokenExpiration: null });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        data,
        loading,
        error,
        setData: setAuthData,
        setLoading,
        setError,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
