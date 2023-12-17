import { getToken } from "./apiService";

type TFormData = {
  username: string;
  password: string;
};

export const login = async (
  formData: TFormData,
  setLoading: (loading: boolean) => void,
): Promise<string> => {
  setLoading(true);

  try {
    const tokenResponse = await getToken({
      username: formData.username,
      password: formData.password,
    });

    const token = tokenResponse.data.token;
    return token;
  } finally {
    setLoading(false);
  }
};
