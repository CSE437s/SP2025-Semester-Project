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
            {/* <div style={profilePictureStyle}></div> */}

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

// // Styles
// const sidebarStyle = {
//     width: "250px",
//     height: "100vh",
//     backgroundColor: "#f4f4f4",
//     padding: "20px",
//     position: "fixed",
//     left: 0,
//     top: "64px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
// };

// // const profilePictureStyle = {
// //     width: "80px",
// //     height: "80px",
// //     backgroundColor: "#ccc",
// //     borderRadius: "50%",
// //     marginBottom: "10px",
// // };

// const buttonStyle = {
//     backgroundColor: "#ff5722",
//     color: "#fff",
//     padding: "10px 15px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginBottom: "15px",
// };

// const sidebarStyle = {
//     width: "270px",
//     height: "100vh",
//     backgroundColor: "#ffffff", // Clean white background
//     padding: "20px",
//     position: "fixed",
//     left: 0,
//     top: "64px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     boxShadow: "4px 0 8px rgba(0, 0, 0, 0.1)", // Slightly stronger shadow for depth
//     borderRadius: "0px 20px 20px 0px", // Rounded right edges for smoothness
//     borderRight: "3px solid #ddd", // Soft border to separate from main content
// };

// // Profile button
// const buttonStyle = {
//     backgroundColor: "#ff5722",
//     color: "#fff",
//     padding: "12px 20px",
//     border: "none",
//     borderRadius: "25px", // Rounded button for modern UI
//     cursor: "pointer",
//     marginBottom: "20px",
//     transition: "background 0.3s ease",
//     fontWeight: "bold",
//     fontSize: "14px",
//     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
// };

// // Hover effect for button
// buttonStyle[":hover"] = {
//     backgroundColor: "#e64a19",
// };

// // User info container
// const userInfoStyle = {
//     width: "100%",
//     marginTop: "20px",
//     textAlign: "left",
//     backgroundColor: "#f9f9f9",
//     padding: "15px",
//     borderRadius: "10px",
//     boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
//     fontSize: "14px",
// };

// // Name and Member Since styling
// const textStyle = {
//     color: "#333",
//     fontWeight: "bold",
//     marginBottom: "8px",
// };

const sidebarStyle = {
    width: "260px",
    height: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Light glass effect
    // backdropFilter: "blur(10px)", // Smooth frosted glass effect
    padding: "25px",
    position: "fixed",
    left: 0,
    top: "64px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.5)", // Adds depth
    borderRadius: "15px 0 0 15px", // Rounded edges on left side
    textAlign: "center",
    color: "#fff",
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
    fontFamily: "sans-serif",
};

// Manage Profile Button Styling
const buttonStyle = {
    backgroundColor: "#ff5722",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    marginTop: "10px",
    width: "80%",
};

// Button hover effect
const buttonHoverStyle = {
    backgroundColor: "#e64a19",
};

// User Info Container Styling
const userInfoStyle = {
    width: "100%",
    marginTop: "20px",
    textAlign: "left",
    padding: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Subtle background
    borderRadius: "10px",
    padding: "15px",
};

// User Name & Member Since Icons
const iconStyle = {
    marginRight: "10px",
    fontSize: "18px",
};


export default Sidebar;
