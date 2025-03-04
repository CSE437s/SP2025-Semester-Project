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

    

    const getTimeSinceListed = (createdAt) => {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const timeDiff = Math.floor((now - createdDate) / 1000); // Difference in seconds
    
        if (timeDiff < 60) {
            return `${timeDiff} seconds ago`;
        } else if (timeDiff < 3600) {
            return `${Math.floor(timeDiff / 60)} minutes ago`;
        } else if (timeDiff < 86400) {
            return `${Math.floor(timeDiff / 3600)} hours ago`;
        } else if (timeDiff < 604800) {
            return `${Math.floor(timeDiff / 86400)} days ago`;
        } else if (timeDiff < 2629800) { // Approx. 1 month
            return `${Math.floor(timeDiff / 604800)} weeks ago`;
        } else if (timeDiff < 31557600) { // Approx. 1 year
            return `${Math.floor(timeDiff / 2629800)} months ago`;
        } else {
            return `${Math.floor(timeDiff / 31557600)} years ago`;
        }
    };
    

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
        <div style={profilePageStyle}>
        <div style={overlayStyle}></div> {/* Overlay for better text readability */}
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
                                        {/* <th>ID</th> */}
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Suitable Season</th>
                                        <th>Description</th>
                                        <th>Time Listed Since</th>
                                        {/* <th>Priced At</th> */}
                                        {/* <th>Trade Requests</th> */}
                                        {/* <th>Actions</th> */}
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            {/* <td>{product.id}</td> */}
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
                                            <td>{product.product_name}</td>
                                            <td>{product.suitable_season}</td>
                                            <td>{product.product_description}</td>
                                            <td>{getTimeSinceListed(product.created_at)}</td>
                                            <td>{""}</td> {/* Priced At left blank as per instruction */}
                                            {/* <td>
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
                                            </td> */}
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

// const contentStyle = {
//     marginLeft: "270px",
//     flex: 1,
//     padding: "20px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     textAlign: "center",
// };

// const tableStyle = {
//     width: "80%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     textAlign: "left",
// };

const profilePageStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1735822081256-bc72ef6cbe59?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed", // Keeps background fixed while scrolling
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "80px",
    paddingBottom: "50px",
    position: "relative",
    zIndex: 1, // Ensures content is above the background
};

// Optional: Overlay for contrast (improves text readability)
const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Dark overlay (adjust opacity if needed)
    zIndex: -1, // Keeps the overlay behind content
};

// Keeps everything centered & clean
const contentStyle = {
    marginLeft: "270px",
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    color: "#fff", // White text for better contrast against dark background
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
    fontFamily: "sans-serif",
};

// Table container with better spacing
const tableContainerStyle = {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
};

// Table styling with better column spacing
const tableStyle = {
    width: "85%",
    borderCollapse: "separate",
    borderSpacing: "20px 12px", // Adds spacing between columns & rows
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Lightened glassmorphism effect
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    overflow: "hidden",
    color: "#fff",
    padding: "15px",
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.25)", // Deeper shadow for depth
};

// Header row with modern styling
const tableHeaderStyle = {
    background: "rgba(0, 0, 0, 0.7)", // Darker header for contrast
    color: "#FFD700", // Gold-colored text
    fontSize: "20px",
    padding: "18px",
    textAlign: "center",
};

// Table row styling with increased row height
const tableRowStyle = {
    height: "70px", // More row height for spacing
    transition: "all 0.3s ease-in-out",
    textAlign: "center",
    borderRadius: "12px",
};

// Hover effects for better readability
const hoverRowStyle = {
    transform: "scale(1.02)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
};

// Image styling (larger size & spacing)
const imageStyle = {
    width: "75px",
    height: "75px",
    borderRadius: "10px",
    transition: "transform 0.3s ease-in-out",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    margin: "5px",
};


const hoverImageStyle = {
    transform: "scale(1.1)",
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
    width: "35%", // Adjust width for a balanced look
    maxWidth: "480px", // Prevent it from getting too wide
    minWidth: "350px", // Ensures it doesn't shrink too much
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Transparent glass effect
    backdropFilter: "blur(10px)", // Soft blur effect
    padding: "50px 40px", // Balanced padding
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Depth shadow
    textAlign: "center",
    color: "#fff",
};


// Back Button Styling
const backButton = {
    marginBottom: "25px",
    cursor: "pointer",
    padding: "12px 24px",
    border: "2px solid #007bff",
    borderRadius: "25px",
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Transparent button
    color: "#007bff",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s ease",
};

// Hover effect for back button
const backButtonHover = {
    backgroundColor: "#007bff",
    color: "white",
};

// Input field styling
const inputFieldStyle = {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    outline: "none",
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent
    color: "#fff",
    fontSize: "16px",
    textAlign: "left",
    marginBottom: "15px",
};

// Save Button Styling
const saveButtonStyle = {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#28a745", // Green color for success action
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginLeft: "10px",
};

// Adjusts hover effect for save button
const saveButtonHover = {
    backgroundColor: "#218838",
};

// Notification Message
const notificationStyle = {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    borderRadius: "8px",
    fontWeight: "600",
    marginTop: "15px",
};


export default Profile;
