import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate =
    useNavigate();

  const userInfo =
    JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    );

  const logoutHandler = () => {

    localStorage.removeItem(
      "userInfo"
    );

    navigate("/");
  };

  return (
    <div className="bg-white shadow-md rounded-2xl px-6 py-4 flex items-center justify-between">

      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          Cyberyaan CRM
        </h1>

        <p className="text-gray-500 font-medium mt-1">

          Welcome,
          {" "}
          {userInfo?.name || "Admin"}

        </p>

      </div>

      <button
        onClick={logoutHandler}
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
      >
        Logout
      </button>

    </div>
  );
}