import { Route, Routes } from "react-router";

import LandingLayout from "../layouts/LandingLayout";
import LandingPage from "./routes/LandingPage";
import About from "./routes/About";
import Login from "./routes/Login";
import ResortIndex from "./routes/ResortIndex";
import Dashboard from "./routes/Dashboard";
import PageNotFound from "./routes/error/PageNotFound";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<LandingLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/resorts" element={<ResortIndex />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        
        </Routes>
    );
}