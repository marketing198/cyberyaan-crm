import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";

export default function Login() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const data =
          await loginUser(
            formData
          );

        localStorage.setItem(
          "userInfo",
          JSON.stringify(data)
        );

        navigate("/dashboard");

      } catch (error) {

        alert(
          "Invalid Credentials"
        );
      }
    };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-center">

          Cyberyaan CRM Login

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}