import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import TabsComponent from "./Tabs";

function Profile() {
    const navigate = useNavigate();
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
        bio: "",
        location: "",
        birthdate: "1990-01-01",
        dateJoined: "2023-06-15",
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    alert("Unauthorized! Redirecting to login.");
                    navigate("/login");
                    return;
                }

                const sampleUserData = {
                    username: "john_doe",
                    name: "John Doe",
                    password: "",
                    confirmPassword: "",
                    bio: "I love trading vintage items.",
                    location: "New York",
                    birthdate: "1990-05-15",
                    dateJoined: "2022-01-10",
                };

                setUserData(sampleUserData);
            } catch (error) {
                console.error("Profile error:", error);
                alert("Session expired. Please log in again.");
                navigate("/login");
            }
        };

        fetchProfileData();
    }, [navigate]);

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <TabsComponent />
            <div style={{ display: "flex", paddingTop: "64px" }}>
                <Sidebar onManageProfileClick={() => setShowEditProfile(true)} />
                <div style={contentStyle}>
                    {!showEditProfile ? (
                        <>
                            <h2>Your Trading Timeline</h2>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th>Number</th>
                                        <th>Item</th>
                                        <th>Trade With</th>
                                        <th>Trade Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Vintage Watch</td>
                                        <td>Alice</td>
                                        <td>2024-01-10</td>
                                        <td>Completed</td>
                                        <td><button>View</button></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Comic Book</td>
                                        <td>Bob</td>
                                        <td>2024-02-01</td>
                                        <td>Pending</td>
                                        <td><button>View</button></td>
                                    </tr>
                                </tbody>
                            </table>
                            <h2>Your Wishlist Items</h2>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th>Number</th>
                                        <th>Item</th>
                                        <th>Trade With</th>
                                        <th>Trade Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Vintage Watch</td>
                                        <td>Alice</td>
                                        <td>2024-01-10</td>
                                        <td>Completed</td>
                                        <td><button>View</button></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Comic Book</td>
                                        <td>Bob</td>
                                        <td>2024-02-01</td>
                                        <td>Pending</td>
                                        <td><button>View</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <div style={editProfileContainer}>
                            <h2>✏ Edit Your Information</h2>
                            <button style={backButton} onClick={() => setShowEditProfile(false)}>← Back to Profile</button>
                            
                            <form style={formStyle}>
                                <div style={inputRowStyle}>
                                    <label>Username</label>
                                    <input type="text" name="username" value={userData.username} onChange={handleInputChange} />
                                </div>

                                <div style={inputRowStyle}>
                                    <label>Name</label>
                                    <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
                                </div>

                                <div style={inputRowStyle}>
                                    <label>Password</label>
                                    <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
                                </div>

                                <div style={inputRowStyle}>
                                    <label>Confirm Password</label>
                                    <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleInputChange} />
                                </div>

                                <button style={saveButton}>Change Password ✔</button>
                                <p style={successMessage}>Password changed successfully ✔✔</p>

                                <div style={inputRowStyle}>
                                    <label>Bio</label>
                                    <textarea name="bio" value={userData.bio} onChange={handleInputChange} />
                                </div>

                                <div style={inputRowStyle}>
                                    <label>Location</label>
                                    <input type="text" name="location" value={userData.location} onChange={handleInputChange} />
                                </div>

                                <button style={saveButton}>Save Changes ✔</button>
                                <p style={successMessage}>Changes saved successfully ✔✔</p>

                                <div style={inputRowStyle}>
                                    <label>Birthdate</label>
                                    <input type="text" value={userData.birthdate} disabled />
                                </div>

                                <div style={inputRowStyle}>
                                    <label>Date Joined</label>
                                    <input type="text" value={userData.dateJoined} disabled />
                                </div>

                                <p>Terms of Service and Privacy Policy</p>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const contentStyle = {
    marginLeft: "270px",
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
};

const tableStyle = {
    width: "80%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    textAlign: "left",
};

const editProfileContainer = {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const formStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
};

const inputRowStyle = {
    display: "flex",
    flexDirection: "column",
};

const saveButton = {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

const successMessage = {
    color: "green",
};

const backButton = {
    marginBottom: "15px",
    cursor: "pointer",
};

export default Profile;