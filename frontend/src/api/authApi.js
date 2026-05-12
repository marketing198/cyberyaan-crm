import axios from "axios";

const API = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/auth`
  : "http://localhost:5000/api/auth";

export const loginUser =
  async (userData) => {

    const response =
      await axios.post(
        `${API}/login`,
        userData
      );

    return response.data;
  };