import { getToken, getUserData } from "./apiService";

type TFormData = {
  username: string;
  password: string;
};

type User = {
  username: string;
};

export const login = async (
  formData: TFormData,
  setLoading: (loading: boolean) => void,
  setData: (data: {
    token: string | null;
    user: User | null;
    tokenExpiration: number | null;
  }) => void,
): Promise<string> => {
  setLoading(true);

  try {
    const tokenResponse = await getToken({
      username: formData.username,
      password: formData.password,
    });

    const token = tokenResponse.data.token;
    const tokenExpiration = Date.now() + 60 * 60 * 1000;
    setData({
      token,
      user: await getUser(token),
      tokenExpiration,
    });

    return token;
  } finally {
    setLoading(false);
  }
};
const getUser = async (token: string): Promise<User | null> => {
  try {
    const userResponse = await getUserData(token);
    return {
      username: userResponse.data.username,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const logout = (
  setData: (data: { token: string | null; user: User | null }) => void,
) => {
  setData({ token: null, user: null });
  localStorage.removeItem("token");
};
