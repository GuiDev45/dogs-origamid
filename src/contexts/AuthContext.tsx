import React, { createContext, useState } from "react";

type User = {
  username: string;
  // Outras informações do usuário, se necessário
};

export type AuthContextProps = {
  data: {
    token: string | null;
    user: User | null;
  };
  loading: boolean;
  setData: (data: { token: string | null; user: User | null }) => void;
  setLoading: (loading: boolean) => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<{ token: string | null; user: User | null }>(
    {
      token: null,
      user: null,
    },
  );
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ data, loading, setData, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
