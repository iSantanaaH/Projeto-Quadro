import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

{/* Estilos */}
import "./index.css";
import AppRoutes from "./routes";

switch (window.location.pathname) {
  case "/login":
  case "/registrar":
    break;
  default:
    document.body.classList.add("body-with-background");
    break;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </React.StrictMode>
);
