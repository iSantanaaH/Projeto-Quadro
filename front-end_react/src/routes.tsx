{/* Pages */}
import LoginPage from "./pages/Login";
import HomePage from "./HomePage";
import RegisterPage from "./pages/Register";

import { Route, Routes } from "react-router";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrar" element={<RegisterPage />} />
        </Routes>
    );
};

export default AppRoutes;