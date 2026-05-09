import {
  Navigate,
  Outlet,
} from "react-router-dom";

export default function PrivateRoute() {

  const userInfo =
    JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    );

  return userInfo
    ? <Outlet />
    : <Navigate to="/" />;
}