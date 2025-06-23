import axios from "./axios";

const handleLoginApi = async (username, password) => {
  const res = await axios.post("/auth/login", {
    username,
    password,
  });
  return res;
};

const getUserProfile = async (token) => {
  const res = await axios.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export { handleLoginApi, getUserProfile };
