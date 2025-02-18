import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser, logout } from "./services/auth";
import LoginPage from "./components/LoginPage";
import CreateAccountPage from "./components/CreateAccountPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import HomePage from "./components/HomePage";
import { Button, Container, Typography } from "@mui/material";
import ChangePasswordPage from "./components/ChangePasswordPage";
import MapComponent from "./components/MapComponent";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      setUser(userData);
      setLoading(false);
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (window.location.hostname === "localhost") {
    window.location.replace(
      `http://127.0.0.1:${window.location.port}${window.location.pathname}${window.location.search}`
    );
  }

  return (
    <Container>
      {user ? (
        <>
          <Typography variant="h5">Welcome, {user.username}!</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
          <MapComponent />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<CreateAccountPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      )}
    </Container>
  );
}

export default App;
