import { Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Students } from "../pages/Students";
import { Drives } from "../pages/Drives";
import { ForgotPassword } from "../pages/ForgotPassword";

// const PrivateRoute = ({ children }: { children: JSX.Element }) => {
const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Route */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Private Routes */}
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />

            <Route
                path="/students"
                element={
                    <PrivateRoute>
                        <Students />
                    </PrivateRoute>
                }
            />

            <Route
                path="/drives"
                element={
                    <PrivateRoute>
                        <Drives />
                    </PrivateRoute>
                }
            />

        </Routes>
    );
};

export default PrivateRoute;
