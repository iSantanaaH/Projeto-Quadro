import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

{
  /* Estilos */
}
import "./index.css";
import AppRoutes from "./routes";
import { CardProvider } from "./components/Context/CardContext";

switch (window.location.pathname) {
  case "/":
    document.body.classList.add("body-with-background");
    break;
  case "/login":
  case "/registrar":
    document.body.classList.add("body-background-pages");
    break;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <CardProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CardProvider>
);
