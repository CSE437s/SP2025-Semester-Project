import React, { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = ({ onManageProfileClick }) => {
    const [user, setUser] = useState({ username: "", memberSince: "" });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) return;

                const response = await axios.get("http://localhost:8080/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser({
                    username: response.data.username || "User",
                    memberSince: response.data.created_at 
                        ? new Date(response.data.created_at).toLocaleDateString() 
                        : "Unknown",
                });
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div style={sidebarStyle}>
            <div style={profilePictureStyle}></div>

            <h2>Hello, {user.username}!</h2>

            <button style={buttonStyle} onClick={onManageProfileClick}>
                Manage Your Profile
            </button>

            <div style={{ width: "100%", marginTop: "20px", textAlign: "left" }}>
                <p><strong>📛 NAME:</strong> {user.username}</p>
                
                <p><strong>📅 MEMBER SINCE:</strong> {user.memberSince}</p>
            </div>
        </div>
    );
};

// Styles
const sidebarStyle = {
    width: "250px",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: "64px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
};

const profilePictureStyle = {
    width: "80px",
    height: "80px",
    backgroundColor: "#ccc",
    borderRadius: "50%",
    marginBottom: "10px",
};

const buttonStyle = {
    backgroundColor: "#ff5722",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "15px",
};

export default Sidebar;
