import axios from "axios";

const API = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/auth`
  : "https://cyberyaan-backend-crm.onrender.com/api/auth";

export const loginUser =
  async (userData) => {

    const response =
      await axios.post(
        `${API}/login`,
        userData
      );

    return response.data;
  };