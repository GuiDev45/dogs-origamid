import axios from "axios";

type TServiceLogin = {
  username: string;
  password: string;
};

export const API_URL = "https://dogsapi.origamid.dev/json";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getToken = (body: TServiceLogin) =>
  api.post("/jwt-auth/v1/token", body);

export const validateToken = (token: string) =>
  api.post(
    "/jwt-auth/v1/token/validate",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

export const getUserData = (token: string) =>
  api.get("/api/user", { headers: { Authorization: `Bearer ${token}` } });
