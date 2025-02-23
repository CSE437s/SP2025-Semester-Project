import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import TabsComponent from "./Tabs";
import Footer from "./Footer";

function Profile() {
    const navigate = useNavigate();
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [products, setProducts] = useState([]);
    const [pendingTrades, setPendingTrades] = useState([]);
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

    const fetchPendingTrades = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/trade/pending', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching pending trades:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const pendingTrades = await fetchPendingTrades();
            setPendingTrades(pendingTrades);
        };
    
        fetchData();
    }, []);

    const handleTradeRequestAction = async (tradeId, action) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:8080/api/trade/${action}/${tradeId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(`Trade request ${action}ed successfully.`);
            console.log('Trade action response:', response.data);
            const updatedPendingTrades = await fetchPendingTrades();
            setPendingTrades(updatedPendingTrades);
        } catch (error) {
            console.error(`Error ${action}ing trade request:`, error);
            alert(`Failed to ${action} trade request. Please try again.`);
        }
    };

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

<div>
    <h2>Pending Trade Requests</h2>
    {pendingTrades.length > 0 ? (
        <table style={tableStyle}>
            <thead>
                <tr>
                    <th>Trade ID</th>
                    <th>Requested Item</th>
                    <th>Coins Offered</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {pendingTrades.map((trade) => (
                    <tr key={trade.id}>
                        <td>{trade.id}</td>
                        <td>{trade.requested_item_id}</td>
                        <td>{trade.coins_offered}</td>
                        <td>
                            <button
                                style={approveButton}
                                onClick={() => handleTradeRequestAction(trade.id, "accept")}
                            >
                                Approve
                            </button>
                            <button
                                style={declineButton}
                                onClick={() => handleTradeRequestAction(trade.id, "decline")}
                            >
                                Decline
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <p>No pending trade requests.</p>
    )}
</div>
                        
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
                                        <th>Priced At</th>
                                        <th>Trade Requests</th>
                                        <th>Actions</th>
                                        
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
                                            <td>{""}</td> {/* Priced At left blank as per instruction */}
                                            <td>
                                                {product.trade_requests && product.trade_requests.length > 0 ? (
                                                    product.trade_requests.map((request) => (
                                                        <div key={request.id} style={{ marginBottom: "10px" }}>
                                                            <p>Request ID: {request.id}, Coins: {request.coins_offered}</p>
                                                            <button
                                                                style={approveButton}
                                                                onClick={() => handleTradeRequestAction(product.id, request.id, "approve")}
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                style={declineButton}
                                                                onClick={() => handleTradeRequestAction(product.id, request.id, "decline")}
                                                            >
                                                                Decline
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No Trade Requests</p>
                                                )}
                                            </td>
                                            <td>
                                                {product.trade_requests && product.trade_requests.length > 0 ? (
                                                    <>
                                                        <button
                                                            style={approveButton}
                                                            onClick={() => alert(`Approve clicked for product ID ${product.id}`)}
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            style={declineButton}
                                                            onClick={() => alert(`Decline clicked for product ID ${product.id}`)}
                                                        >
                                                            Decline
                                                        </button>
                                                    </>
                                                ) : (
                                                    <p>No Actions Available</p>
                                                )}
                                            </td>
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
            <Footer/>
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

const approveButton = {
    marginRight: "10px",
    padding: "5px 10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

const declineButton = {
    padding: "5px 10px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

const editProfileContainer = {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
};

const backButton = {
    marginBottom: "20px",
    cursor: "pointer",
    padding: "10px 20px",
    border: "1px solid #007bff",
    borderRadius: "25px",
    backgroundColor: "white",
    color: "#007bff",
    fontWeight: "600",
    transition: "all 0.3s ease",
};

const notificationStyle = {
    padding: "10px",
    backgroundColor: "lightgreen",
    color: "black",
    borderRadius: "5px",
    marginTop: "10px",
};

export default Profile;
