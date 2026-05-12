import axios from "axios";

const API = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/students`
  : "http://localhost:5000/api/students";

export const getStudents = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const addStudent = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const updateStudent = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};