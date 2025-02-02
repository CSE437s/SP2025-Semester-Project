import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    alert("Unauthorized! Redirecting to login.");
                    navigate("/login");
                    return;
                }

                const response = await axios.get("http://localhost:8080/api/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log(response.data);
            } catch (error) {
                console.error("Dashboard error:", error);
                alert("Session expired. Please log in again.");
                navigate("/login");
            }
        };

        fetchDashboard();
    }, [navigate]);

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
        </div>
    );
}

export default Dashboard;
