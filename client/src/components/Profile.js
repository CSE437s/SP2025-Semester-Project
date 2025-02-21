import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import TabsComponent from "./Tabs";

function Profile() {
    const navigate = useNavigate();
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [products, setProducts] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Unauthorized! Redirecting to login.");
                    navigate("/login");
                    return;
                }

                const response = await axios.get("http://localhost:8080/api/products", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Unauthorized! Redirecting to login.");
                navigate("/login");
                return;
            }

            const response = await axios.put(
                "http://localhost:8080/api/update-profile",
                {
                    username,
                    email,
                    currentPassword,
                    newPassword,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                setNotification("Profile updated successfully!");
            } else {
                setNotification(response.data.message || "Update failed.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setNotification("Failed to update profile.");
        }
    };

    const handleUpdateField = async (field, value) => {
        if (!value) {
            alert(`${field} cannot be empty.`);
            return;
        }
    
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Unauthorized! Redirecting to login.");
                navigate("/login");
                return;
            }
    
            const response = await axios.put(
                "http://localhost:8080/api/update-profile",
                { field, value },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            if (response.status === 200) {
                alert(`${field} updated successfully!`);
            } else {
                alert(response.data.message || "Update failed.");
            }
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
            alert(`Failed to update ${field}.`);
        }
    };
    

    return (
        <div>
            <TabsComponent />
            <div style={{ display: "flex", paddingTop: "64px" }}>
                <Sidebar onManageProfileClick={() => setShowEditProfile(true)} />
                <div style={contentStyle}>
                    {!showEditProfile ? (
                        <>
                            <h2>Your Products</h2>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product Name</th>
                                        <th>Suitable Season</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.product_name}</td>
                                            <td>{product.suitable_season}</td>
                                            <td>{product.product_description}</td>
                                            <td>
                                                {product.product_image ? (
                                                    <img
                                                        src={`http://localhost:8080/${product.product_image}`}
                                                        alt={product.product_name}
                                                        width="50"
                                                    />
                                                ) : (
                                                    "No Image"
                                                )}
                                            </td>
                                            <td>{new Date(product.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <div style={editProfileContainer}>
                            <h2>✏ Edit Your Information</h2>
                            <button style={backButton} onClick={() => setShowEditProfile(false)}>← Back to Profile</button>

                            <form style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                            <label>Username:</label>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                <button type="button" onClick={() => handleUpdateField("username", username)}>Save</button>
                            </div>

                            <label>Email:</label>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <button type="button" onClick={() => handleUpdateField("email", email)}>Save</button>
                            </div>

                            <label>New Password:</label>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                <button type="button" onClick={() => handleUpdateField("password", newPassword)}>Save</button>
                            </div>
                            </form>


                            {notification && (
                                <div style={notificationStyle}>
                                    {notification}
                                    <button onClick={() => setNotification(null)}>X</button>
                                </div>
                            )}
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

const backButton = {
    marginBottom: "15px",
    cursor: "pointer",
};

const saveButton = {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
};

const notificationStyle = {
    padding: "10px",
    backgroundColor: "lightgreen",
    color: "black",
    borderRadius: "5px",
    marginTop: "10px",
};

export default Profile;
