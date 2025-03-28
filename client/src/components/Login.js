import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer"; // Adjust the path based on your folder structure

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/login", form); // Pointing to backend
            alert(response.data.message);

            // Save token to localStorage
            localStorage.setItem("token", response.data.token);

            // Redirect to dashboard
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4">Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
            <Footer/>
        </Container>
        
    );
}

export default Login;
