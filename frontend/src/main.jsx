import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import PrivateRoute from "./routes/PrivateRoute";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          element={<PrivateRoute />}
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
);