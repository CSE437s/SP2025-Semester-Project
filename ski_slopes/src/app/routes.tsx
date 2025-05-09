import { Route, Routes } from "react-router-dom";

import LandingLayout from "../layouts/LandingLayout";
import LandingPage from "./routes/LandingPage";
import About from "./routes/About";
import Login from "./routes/Login";
import ResortIndex from "./routes/ResortIndex";
import Dashboard from "./routes/Dashboard";
import UserPage from "./routes/UserPage";
import Render from "./routes/Render";
import PageNotFound from "./routes/error/PageNotFound";

// 🆕 Import individual resort pages
import JacksonHole from "./routes/JacksonHole";
import Telluride from "./routes/Telluride";
import MtBaker from "./routes/MtBaker";
import Snowbird from "./routes/Snowbird";

// import AuthCallback from "./AuthCallback";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resorts" element={<ResortIndex />} />
        <Route path="/render" element={<Render />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<UserPage />} />

        {/* 🆕 Individual resort pages */}
        <Route path="/resorts/jackson-hole" element={<JacksonHole />} />
        <Route path="/resorts/telluride" element={<Telluride />} />
        <Route path="/resorts/mt-baker" element={<MtBaker />} />
        <Route path="/resorts/snowbird" element={<Snowbird />} />

        {/* <Route path="/auth/callback" element={<AuthCallback />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
