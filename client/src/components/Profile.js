// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "./Sidebar";
// import TabsComponent from "./Tabs";
// import Footer from "./Footer";

// function Profile() {
//     const navigate = useNavigate();
//     const [showEditProfile, setShowEditProfile] = useState(false);
//     const [products, setProducts] = useState([]);
//     const [pendingTrades, setPendingTrades] = useState([]);
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [currentPassword, setCurrentPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [notification, setNotification] = useState(null);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     alert("Unauthorized! Redirecting to login.");
//                     navigate("/login");
//                     return;
//                 }

//                 const response = await axios.get("http://localhost:8080/api/products", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 setProducts(response.data);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };

//         fetchProducts();
//     }, [navigate]);

    

//     const getTimeSinceListed = (createdAt) => {
//         const createdDate = new Date(createdAt);
//         const now = new Date();
//         const timeDiff = Math.floor((now - createdDate) / 1000); // Difference in seconds
    
//         if (timeDiff < 60) {
//             return `${timeDiff} seconds ago`;
//         } else if (timeDiff < 3600) {
//             return `${Math.floor(timeDiff / 60)} minutes ago`;
//         } else if (timeDiff < 86400) {
//             return `${Math.floor(timeDiff / 3600)} hours ago`;
//         } else if (timeDiff < 604800) {
//             return `${Math.floor(timeDiff / 86400)} days ago`;
//         } else if (timeDiff < 2629800) { // Approx. 1 month
//             return `${Math.floor(timeDiff / 604800)} weeks ago`;
//         } else if (timeDiff < 31557600) { // Approx. 1 year
//             return `${Math.floor(timeDiff / 2629800)} months ago`;
//         } else {
//             return `${Math.floor(timeDiff / 31557600)} years ago`;
//         }
//     };
    

//     const fetchPendingTrades = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get('http://localhost:8080/api/trade/pending', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             return response.data;
//         } catch (error) {
//             console.error('Error fetching pending trades:', error);
//             return [];
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             const pendingTrades = await fetchPendingTrades();
//             setPendingTrades(pendingTrades);
//         };
    
//         fetchData();
//     }, []);

//     const handleTradeRequestAction = async (tradeId, action) => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.post(
//                 `http://localhost:8080/api/trade/${action}/${tradeId}`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             alert(`Trade request ${action}ed successfully.`);
//             console.log('Trade action response:', response.data);
//             const updatedPendingTrades = await fetchPendingTrades();
//             setPendingTrades(updatedPendingTrades);
//         } catch (error) {
//             console.error(`Error ${action}ing trade request:`, error);
//             alert(`Failed to ${action} trade request. Please try again.`);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 alert("Unauthorized! Redirecting to login.");
//                 navigate("/login");
//                 return;
//             }

//             const response = await axios.put(
//                 "http://localhost:8080/api/update-profile",
//                 {
//                     username,
//                     email,
//                     currentPassword,
//                     newPassword,
//                 },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             if (response.status === 200) {
//                 setNotification("Profile updated successfully!");
//             } else {
//                 setNotification(response.data.message || "Update failed.");
//             }
//         } catch (error) {
//             console.error("Error updating profile:", error);
//             setNotification("Failed to update profile.");
//         }
//     };

//     const handleUpdateField = async (field, value) => {
//         if (!value) {
//             alert(`${field} cannot be empty.`);
//             return;
//         }

//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 alert("Unauthorized! Redirecting to login.");
//                 navigate("/login");
//                 return;
//             }

//             const response = await axios.put(
//                 "http://localhost:8080/api/update-profile",
//                 { field, value },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             if (response.status === 200) {
//                 alert(`${field} updated successfully!`);
//             } else {
//                 alert(response.data.message || "Update failed.");
//             }
//         } catch (error) {
//             console.error(`Error updating ${field}:`, error);
//             alert(`Failed to update ${field}.`);
//         }
//     };

//     return (
//         <div style={profilePageStyle}>
//         <div style={overlayStyle}></div> {/* Overlay for better text readability */}
//             <TabsComponent />
//             <div style={{ display: "flex", paddingTop: "64px" }}>
//                 <Sidebar onManageProfileClick={() => setShowEditProfile(true)} />
//                 <div style={contentStyle}>
//                     {!showEditProfile ? (
//                         <>

// <div>
//     <h2>Pending Trade Requests</h2>
//     {pendingTrades.length > 0 ? (
//         <table style={tableStyle}>
//             <thead>
//                 <tr>
//                     <th>Trade ID</th>
//                     <th>Requested Item</th>
//                     <th>Coins Offered</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {pendingTrades.map((trade) => (
//                     <tr key={trade.id}>
//                         <td>{trade.id}</td>
//                         <td>{trade.requested_item_id}</td>
//                         <td>{trade.coins_offered}</td>
//                         <td>
//                             <button
//                                 style={approveButton}
//                                 onClick={() => handleTradeRequestAction(trade.id, "accept")}
//                             >
//                                 Approve
//                             </button>
//                             <button
//                                 style={declineButton}
//                                 onClick={() => handleTradeRequestAction(trade.id, "decline")}
//                             >
//                                 Decline
//                             </button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     ) : (
//         <p>No pending trade requests.</p>
//     )}
// </div>
                        
//                             <h2>Your Products</h2>
//                             <table style={tableStyle}>
//                                 <thead>
//                                     <tr>
//                                         {/* <th>ID</th> */}
//                                         <th>Image</th>
//                                         <th>Product Name</th>
//                                         <th>Suitable Season</th>
//                                         <th>Description</th>
//                                         <th>Time Listed Since</th>
//                                         {/* <th>Priced At</th> */}
//                                         {/* <th>Trade Requests</th> */}
//                                         {/* <th>Actions</th> */}
                                        
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {products.map((product) => (
//                                         <tr key={product.id}>
//                                             {/* <td>{product.id}</td> */}
//                                             <td>
//                                                 {product.product_image ? (
//                                                     <img
//                                                         src={`http://localhost:8080/${product.product_image}`}
//                                                         alt={product.product_name}
//                                                         width="50"
//                                                     />
//                                                 ) : (
//                                                     "No Image"
//                                                 )}
//                                             </td>
//                                             <td>{product.product_name}</td>
//                                             <td>{product.suitable_season}</td>
//                                             <td>{product.product_description}</td>
//                                             <td>{getTimeSinceListed(product.created_at)}</td>
//                                             <td>{""}</td> {/* Priced At left blank as per instruction */}
//                                             {/* <td>
//                                                 {product.trade_requests && product.trade_requests.length > 0 ? (
//                                                     product.trade_requests.map((request) => (
//                                                         <div key={request.id} style={{ marginBottom: "10px" }}>
//                                                             <p>Request ID: {request.id}, Coins: {request.coins_offered}</p>
//                                                             <button
//                                                                 style={approveButton}
//                                                                 onClick={() => handleTradeRequestAction(product.id, request.id, "approve")}
//                                                             >
//                                                                 Approve
//                                                             </button>
//                                                             <button
//                                                                 style={declineButton}
//                                                                 onClick={() => handleTradeRequestAction(product.id, request.id, "decline")}
//                                                             >
//                                                                 Decline
//                                                             </button>
//                                                         </div>
//                                                     ))
//                                                 ) : (
//                                                     <p>No Trade Requests</p>
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 {product.trade_requests && product.trade_requests.length > 0 ? (
//                                                     <>
//                                                         <button
//                                                             style={approveButton}
//                                                             onClick={() => alert(`Approve clicked for product ID ${product.id}`)}
//                                                         >
//                                                             Approve
//                                                         </button>
//                                                         <button
//                                                             style={declineButton}
//                                                             onClick={() => alert(`Decline clicked for product ID ${product.id}`)}
//                                                         >
//                                                             Decline
//                                                         </button>
//                                                     </>
//                                                 ) : (
//                                                     <p>No Actions Available</p>
//                                                 )}
//                                             </td> */}
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>

                                        

//                         </>
//                     ) : (
//                         <div style={editProfileContainer}>
//                             <h2>✏ Edit Your Information</h2>
//                             <button style={backButton} onClick={() => setShowEditProfile(false)}>← Back to Profile</button>

//                             <form style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
//                                 <label>Username:</label>
//                                 <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//                                     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
//                                     <button type="button" onClick={() => handleUpdateField("username", username)}>Save</button>
//                                 </div>

//                                 <label>Email:</label>
//                                 <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//                                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                                     <button type="button" onClick={() => handleUpdateField("email", email)}>Save</button>
//                                 </div>

//                                 <label>New Password:</label>
//                                 <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//                                     <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//                                     <button type="button" onClick={() => handleUpdateField("password", newPassword)}>Save</button>
//                                 </div>
//                             </form>

//                             {notification && (
//                                 <div style={notificationStyle}>
//                                     {notification}
//                                     <button onClick={() => setNotification(null)}>X</button>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <Footer/>
//         </div>
//     );
// }

// // const contentStyle = {
// //     marginLeft: "270px",
// //     flex: 1,
// //     padding: "20px",
// //     display: "flex",
// //     flexDirection: "column",
// //     alignItems: "center",
// //     textAlign: "center",
// // };

// // const tableStyle = {
// //     width: "80%",
// //     borderCollapse: "collapse",
// //     marginBottom: "20px",
// //     textAlign: "left",
// // };

// const profilePageStyle = {
//     backgroundImage: "url('https://images.unsplash.com/photo-1735822081256-bc72ef6cbe59?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundAttachment: "fixed", // Keeps background fixed while scrolling
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingTop: "80px",
//     paddingBottom: "50px",
//     position: "relative",
//     zIndex: 1, // Ensures content is above the background
// };

// // Optional: Overlay for contrast (improves text readability)
// const overlayStyle = {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.2)", // Dark overlay (adjust opacity if needed)
//     zIndex: -1, // Keeps the overlay behind content
// };

// // Keeps everything centered & clean
// const contentStyle = {
//     marginLeft: "270px",
//     flex: 1,
//     padding: "20px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     textAlign: "center",
//     color: "#fff", // White text for better contrast against dark background
//     textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
//     fontFamily: "sans-serif",
// };

// // Table container with better spacing
// const tableContainerStyle = {
//     width: "100%",
//     marginTop: "20px",
//     display: "flex",
//     justifyContent: "center",
// };

// // Table styling with better column spacing
// const tableStyle = {
//     width: "85%",
//     borderCollapse: "separate",
//     borderSpacing: "20px 12px", // Adds spacing between columns & rows
//     textAlign: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.15)", // Lightened glassmorphism effect
//     backdropFilter: "blur(10px)",
//     borderRadius: "12px",
//     overflow: "hidden",
//     color: "#fff",
//     padding: "15px",
//     boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.25)", // Deeper shadow for depth
// };

// // Header row with modern styling
// const tableHeaderStyle = {
//     background: "rgba(0, 0, 0, 0.7)", // Darker header for contrast
//     color: "#FFD700", // Gold-colored text
//     fontSize: "20px",
//     padding: "18px",
//     textAlign: "center",
// };

// // Table row styling with increased row height
// const tableRowStyle = {
//     height: "70px", // More row height for spacing
//     transition: "all 0.3s ease-in-out",
//     textAlign: "center",
//     borderRadius: "12px",
// };

// // Hover effects for better readability
// const hoverRowStyle = {
//     transform: "scale(1.02)",
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
// };

// // Image styling (larger size & spacing)
// const imageStyle = {
//     width: "75px",
//     height: "75px",
//     borderRadius: "10px",
//     transition: "transform 0.3s ease-in-out",
//     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
//     margin: "5px",
// };


// const hoverImageStyle = {
//     transform: "scale(1.1)",
// };

    

// const approveButton = {
//     marginRight: "10px",
//     padding: "5px 10px",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
// };

// const declineButton = {
//     padding: "5px 10px",
//     backgroundColor: "#f44336",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
// };

// const editProfileContainer = {
//     width: "35%", // Adjust width for a balanced look
//     maxWidth: "480px", // Prevent it from getting too wide
//     minWidth: "350px", // Ensures it doesn't shrink too much
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.15)", // Transparent glass effect
//     backdropFilter: "blur(10px)", // Soft blur effect
//     padding: "50px 40px", // Balanced padding
//     borderRadius: "20px",
//     boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Depth shadow
//     textAlign: "center",
//     color: "#fff",
// };


// // Back Button Styling
// const backButton = {
//     marginBottom: "25px",
//     cursor: "pointer",
//     padding: "12px 24px",
//     border: "2px solid #007bff",
//     borderRadius: "25px",
//     backgroundColor: "rgba(255, 255, 255, 0.4)", // Transparent button
//     color: "#007bff",
//     fontWeight: "600",
//     fontSize: "16px",
//     transition: "all 0.3s ease",
// };

// // Hover effect for back button
// const backButtonHover = {
//     backgroundColor: "#007bff",
//     color: "white",
// };

// // Input field styling
// const inputFieldStyle = {
//     width: "100%",
//     padding: "12px",
//     border: "none",
//     borderRadius: "10px",
//     outline: "none",
//     backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent
//     color: "#fff",
//     fontSize: "16px",
//     textAlign: "left",
//     marginBottom: "15px",
// };

// // Save Button Styling
// const saveButtonStyle = {
//     padding: "10px 18px",
//     border: "none",
//     borderRadius: "8px",
//     backgroundColor: "#28a745", // Green color for success action
//     color: "white",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//     marginLeft: "10px",
// };

// // Adjusts hover effect for save button
// const saveButtonHover = {
//     backgroundColor: "#218838",
// };

// // Notification Message
// const notificationStyle = {
//     padding: "12px",
//     backgroundColor: "#4CAF50",
//     color: "#fff",
//     borderRadius: "8px",
//     fontWeight: "600",
//     marginTop: "15px",
// };


// export default Profile;

// "use client"

// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import Sidebar from "./Sidebar"
// import TabsComponent from "./Tabs"
// import Footer from "./Footer"

// function Profile() {
//   const navigate = useNavigate()
//   const [activeTab, setActiveTab] = useState("products")
//   const [showEditProfile, setShowEditProfile] = useState(false)
//   const [products, setProducts] = useState([])
//   const [pendingTrades, setPendingTrades] = useState([])
//   const [username, setUsername] = useState("")
//   const [email, setEmail] = useState("")
//   const [currentPassword, setCurrentPassword] = useState("")
//   const [newPassword, setNewPassword] = useState("")
//   const [notification, setNotification] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [userStats, setUserStats] = useState({
//     totalProducts: 0,
//     pendingRequests: 0,
//     completedTrades: 0,
//   })
//   const [hoveredRow, setHoveredRow] = useState(null)
//   const [expandedProduct, setExpandedProduct] = useState(null)

//   // Animation keyframes
//   const keyframes = `
//         @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes slideIn {
//             from { opacity: 0; transform: translateX(-20px); }
//             to { opacity: 1; transform: translateX(0); }
//         }
        
//         @keyframes pulse {
//             0% { transform: scale(1); }
//             50% { transform: scale(1.05); }
//             100% { transform: scale(1); }
//         }
        
//         @keyframes shimmer {
//             0% { background-position: -1000px 0; }
//             100% { background-position: 1000px 0; }
//         }
        
//         @keyframes scaleIn {
//             from { opacity: 0; transform: scale(0.9); }
//             to { opacity: 1; transform: scale(1); }
//         }
        
//         @keyframes fadeInUp {
//             from { opacity: 0; transform: translateY(10px); }
//             to { opacity: 1; transform: translateY(0); }
//         }
//     `

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true)
//         const token = localStorage.getItem("token")
//         if (!token) {
//           alert("Unauthorized! Redirecting to login.")
//           navigate("/login")
//           return
//         }

//         // Get the user ID of the logged-in user
//         const userResponse = await axios.get("http://localhost:8080/api/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         })

//         const userId = userResponse.data.id || userResponse.data.user_id
//         console.log("Current user ID:", userId)

//         // Get all products
//         const response = await axios.get("http://localhost:8080/api/products", {
//           headers: { Authorization: `Bearer ${token}` },
//         })

//         console.log("All products:", response.data)

//         // Filter to only show products owned by the current user
//         const myProducts = Array.isArray(response.data)
//           ? response.data.filter((product) => {
//               const productOwnerId = product.owner_id || product.user_id
//               console.log(`Product ID: ${product.id}, Owner ID: ${productOwnerId}`)
//               return productOwnerId == userId // Use loose equality to handle string/number comparison
//             })
//           : []

//         console.log("Filtered products:", myProducts)
//         setProducts(myProducts)
//         setUserStats((prev) => ({
//           ...prev,
//           totalProducts: myProducts.length,
//         }))
//         setLoading(false)
//       } catch (error) {
//         console.error("Error fetching products:", error)
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [navigate])

//   const getTimeSinceListed = (createdAt) => {
//     const createdDate = new Date(createdAt)
//     const now = new Date()
//     const timeDiff = Math.floor((now - createdDate) / 1000) // Difference in seconds

//     if (timeDiff < 60) {
//       return `${timeDiff} seconds ago`
//     } else if (timeDiff < 3600) {
//       return `${Math.floor(timeDiff / 60)} minutes ago`
//     } else if (timeDiff < 86400) {
//       return `${Math.floor(timeDiff / 3600)} hours ago`
//     } else if (timeDiff < 604800) {
//       return `${Math.floor(timeDiff / 86400)} days ago`
//     } else if (timeDiff < 2629800) {
//       // Approx. 1 month
//       return `${Math.floor(timeDiff / 604800)} weeks ago`
//     } else if (timeDiff < 31557600) {
//       // Approx. 1 year
//       return `${Math.floor(timeDiff / 2629800)} months ago`
//     } else {
//       return `${Math.floor(timeDiff / 31557600)} years ago`
//     }
//   }

//   const fetchPendingTrades = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.get("http://localhost:8080/api/trade/pending", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       return response.data
//     } catch (error) {
//       console.error("Error fetching pending trades:", error)
//       return []
//     }
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       const pendingTrades = await fetchPendingTrades()
//       setPendingTrades(pendingTrades)
//       setUserStats((prev) => ({
//         ...prev,
//         pendingRequests: pendingTrades.length,
//       }))
//     }

//     fetchData()
//   }, [])

//   const handleTradeRequestAction = async (tradeId, action) => {
//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.post(
//         `http://localhost:8080/api/trade/${action}/${tradeId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       )

//       // Show notification instead of alert
//       setNotification({
//         message: `Trade request ${action}ed successfully.`,
//         type: "success",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)

//       console.log("Trade action response:", response.data)
//       const updatedPendingTrades = await fetchPendingTrades()
//       setPendingTrades(updatedPendingTrades)

//       // Update stats
//       setUserStats((prev) => ({
//         ...prev,
//         pendingRequests: updatedPendingTrades.length,
//         completedTrades: action === "accept" ? prev.completedTrades + 1 : prev.completedTrades,
//       }))
//     } catch (error) {
//       console.error(`Error ${action}ing trade request:`, error)
//       setNotification({
//         message: `Failed to ${action} trade request. Please try again.`,
//         type: "error",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         setNotification({
//           message: "Unauthorized! Redirecting to login.",
//           type: "error",
//         })
//         setTimeout(() => {
//           navigate("/login")
//         }, 2000)
//         return
//       }

//       const response = await axios.put(
//         "http://localhost:8080/api/update-profile",
//         {
//           username,
//           email,
//           currentPassword,
//           newPassword,
//         },
//         { headers: { Authorization: `Bearer ${token}` } },
//       )

//       if (response.status === 200) {
//         setNotification({
//           message: "Profile updated successfully!",
//           type: "success",
//         })

//         // Clear form fields
//         setCurrentPassword("")
//         setNewPassword("")
//       } else {
//         setNotification({
//           message: response.data.message || "Update failed.",
//           type: "error",
//         })
//       }

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     } catch (error) {
//       console.error("Error updating profile:", error)
//       setNotification({
//         message: "Failed to update profile.",
//         type: "error",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     }
//   }

//   const handleUpdateField = async (field, value) => {
//     if (!value) {
//       setNotification({
//         message: `${field} cannot be empty.`,
//         type: "error",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//       return
//     }

//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         setNotification({
//           message: "Unauthorized! Redirecting to login.",
//           type: "error",
//         })
//         setTimeout(() => {
//           navigate("/login")
//         }, 2000)
//         return
//       }

//       const response = await axios.put(
//         "http://localhost:8080/api/update-profile",
//         { field, value },
//         { headers: { Authorization: `Bearer ${token}` } },
//       )

//       if (response.status === 200) {
//         setNotification({
//           message: `${field} updated successfully!`,
//           type: "success",
//         })
//       } else {
//         setNotification({
//           message: response.data.message || "Update failed.",
//           type: "error",
//         })
//       }

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     } catch (error) {
//       console.error(`Error updating ${field}:`, error)
//       setNotification({
//         message: `Failed to update ${field}.`,
//         type: "error",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     }
//   }

//   const getSeasonColor = (season) => {
//     switch (season?.toLowerCase()) {
//       case "spring":
//         return "#a8e6cf"
//       case "summer":
//         return "#ffdfba"
//       case "autumn":
//         return "#ffb7b2"
//       case "winter":
//         return "#b5c9df"
//       default:
//         return "#a0a0a0"
//     }
//   }

//   const getSeasonIcon = (season) => {
//     switch (season?.toLowerCase()) {
//       case "spring":
//         return "🌱"
//       case "summer":
//         return "☀️"
//       case "autumn":
//         return "🍂"
//       case "winter":
//         return "❄️"
//       default:
//         return "🌐"
//     }
//   }

//   if (loading) {
//     return (
//       <div style={profilePageStyle}>
//         <style dangerouslySetInnerHTML={{ __html: keyframes }} />
//         <div style={overlayStyle}></div>
//         <TabsComponent />
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//             width: "100%",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "2rem",
//               borderRadius: "12px",
//               backgroundColor: "rgba(255, 255, 255, 0.1)",
//               backdropFilter: "blur(10px)",
//               boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <div
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 border: "3px solid rgba(255, 255, 255, 0.3)",
//                 borderRadius: "50%",
//                 borderTopColor: "#ffffff",
//                 animation: "spin 1s linear infinite",
//                 marginBottom: "1rem",
//               }}
//             ></div>
//             <h2 style={{ color: "#fff", margin: "0" }}>Loading Profile...</h2>
//             <style>{`
//                             @keyframes spin {
//                                 0% { transform: rotate(0deg); }
//                                 100% { transform: rotate(360deg); }
//                             }
//                         `}</style>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div style={profilePageStyle}>
//       <style dangerouslySetInnerHTML={{ __html: keyframes }} />
//       <div style={overlayStyle}></div>
//       <TabsComponent />
//       <div style={{ display: "flex", paddingTop: "64px" }}>
//         <Sidebar onManageProfileClick={() => setShowEditProfile(true)} />
//         <div style={contentStyle}>
//           {!showEditProfile ? (
//             <>
//               {/* Profile Stats Section */}
//               <div
//                 style={{
//                   width: "100%",
//                   display: "flex",
//                   justifyContent: "center",
//                   marginBottom: "2rem",
//                   animation: "fadeIn 0.5s ease-out",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     justifyContent: "center",
//                     gap: "1.5rem",
//                     width: "100%",
//                     maxWidth: "1000px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       flex: "1 1 200px",
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "1.5rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "translateY(-5px)"
//                       e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)"
//                       e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
//                     }}
//                   >
//                     <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📦</div>
//                     <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "400" }}>Total Products</h3>
//                     <p style={{ margin: "0", fontSize: "2rem", fontWeight: "600" }}>{userStats.totalProducts}</p>
//                   </div>

//                   <div
//                     style={{
//                       flex: "1 1 200px",
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "1.5rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "translateY(-5px)"
//                       e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)"
//                       e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
//                     }}
//                   >
//                     <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>⏳</div>
//                     <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "400" }}>Pending Requests</h3>
//                     <p style={{ margin: "0", fontSize: "2rem", fontWeight: "600" }}>{userStats.pendingRequests}</p>
//                   </div>

//                   <div
//                     style={{
//                       flex: "1 1 200px",
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "1.5rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "translateY(-5px)"
//                       e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)"
//                       e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
//                     }}
//                   >
//                     <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🤝</div>
//                     <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "400" }}>Completed Trades</h3>
//                     <p style={{ margin: "0", fontSize: "2rem", fontWeight: "600" }}>{userStats.completedTrades}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Tab Navigation */}
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   marginBottom: "2rem",
//                   width: "100%",
//                   animation: "fadeIn 0.6s ease-out",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     backgroundColor: "rgba(255, 255, 255, 0.1)",
//                     backdropFilter: "blur(10px)",
//                     borderRadius: "30px",
//                     padding: "0.5rem",
//                     boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                   }}
//                 >
//                   <button
//                     onClick={() => setActiveTab("products")}
//                     style={{
//                       padding: "0.75rem 1.5rem",
//                       borderRadius: "25px",
//                       border: "none",
//                       backgroundColor: activeTab === "products" ? "rgba(255, 255, 255, 0.2)" : "transparent",
//                       color: "#fff",
//                       fontSize: "1rem",
//                       fontWeight: activeTab === "products" ? "500" : "400",
//                       cursor: "pointer",
//                       transition: "all 0.3s ease",
//                     }}
//                   >
//                     Your Products
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("trades")}
//                     style={{
//                       padding: "0.75rem 1.5rem",
//                       borderRadius: "25px",
//                       border: "none",
//                       backgroundColor: activeTab === "trades" ? "rgba(255, 255, 255, 0.2)" : "transparent",
//                       color: "#fff",
//                       fontSize: "1rem",
//                       fontWeight: activeTab === "trades" ? "500" : "400",
//                       cursor: "pointer",
//                       transition: "all 0.3s ease",
//                     }}
//                   >
//                     Pending Trades
//                   </button>
//                 </div>
//               </div>

//               {/* Content based on active tab */}
//               <div
//                 style={{
//                   width: "100%",
//                   maxWidth: "1200px",
//                   animation: activeTab === "products" ? "fadeInUp 0.7s ease-out" : "fadeInUp 0.7s ease-out",
//                   display: activeTab === "products" ? "block" : "none",
//                 }}
//               >
//                 <h2
//                   style={{
//                     fontSize: "2rem",
//                     fontWeight: "300",
//                     marginBottom: "1.5rem",
//                     textAlign: "center",
//                     color: "#fff",
//                   }}
//                 >
//                   Your Products
//                 </h2>

//                 {products.length > 0 ? (
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//                       gap: "1.5rem",
//                       padding: "0 1rem",
//                     }}
//                   >
//                     {products.map((product, index) => (
//                       <div
//                         key={product.id}
//                         style={{
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           backdropFilter: "blur(10px)",
//                           borderRadius: "12px",
//                           overflow: "hidden",
//                           boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           transition: "all 0.3s ease",
//                           animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
//                           transform: hoveredRow === product.id ? "translateY(-5px)" : "translateY(0)",
//                           boxShadow:
//                             hoveredRow === product.id
//                               ? "0 12px 25px rgba(0, 0, 0, 0.15)"
//                               : "0 8px 20px rgba(0, 0, 0, 0.1)",
//                         }}
//                         onMouseEnter={() => setHoveredRow(product.id)}
//                         onMouseLeave={() => setHoveredRow(null)}
//                         onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
//                       >
//                         <div
//                           style={{
//                             height: "180px",
//                             position: "relative",
//                             overflow: "hidden",
//                           }}
//                         >
//                           {product.product_image ? (
//                             <img
//                               src={`http://localhost:8080/${product.product_image}`}
//                               alt={product.product_name}
//                               style={{
//                                 width: "100%",
//                                 height: "100%",
//                                 objectFit: "cover",
//                                 transition: "transform 0.5s ease",
//                                 transform: hoveredRow === product.id ? "scale(1.05)" : "scale(1)",
//                               }}
//                             />
//                           ) : (
//                             <div
//                               style={{
//                                 width: "100%",
//                                 height: "100%",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 backgroundColor: "rgba(0, 0, 0, 0.1)",
//                                 fontSize: "3rem",
//                               }}
//                             >
//                               {getSeasonIcon(product.suitable_season)}
//                             </div>
//                           )}

//                           <div
//                             style={{
//                               position: "absolute",
//                               top: "1rem",
//                               right: "1rem",
//                               backgroundColor: getSeasonColor(product.suitable_season),
//                               color: "#fff",
//                               padding: "0.4rem 0.8rem",
//                               borderRadius: "20px",
//                               fontSize: "0.8rem",
//                               fontWeight: "500",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "0.3rem",
//                             }}
//                           >
//                             {getSeasonIcon(product.suitable_season)} {product.suitable_season}
//                           </div>
//                         </div>

//                         <div style={{ padding: "1.5rem" }}>
//                           <h3
//                             style={{
//                               margin: "0 0 0.5rem 0",
//                               fontSize: "1.2rem",
//                               fontWeight: "500",
//                               color: "#fff",
//                             }}
//                           >
//                             {product.product_name}
//                           </h3>

//                           <p
//                             style={{
//                               margin: "0 0 1rem 0",
//                               fontSize: "0.9rem",
//                               color: "rgba(255, 255, 255, 0.8)",
//                               display: expandedProduct === product.id ? "block" : "-webkit-box",
//                               WebkitLineClamp: "2",
//                               WebkitBoxOrient: "vertical",
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               lineHeight: "1.5",
//                             }}
//                           >
//                             {product.product_description}
//                           </p>

//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "space-between",
//                               alignItems: "center",
//                               marginTop: "1rem",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                                 color: "rgba(255, 255, 255, 0.7)",
//                                 fontSize: "0.85rem",
//                               }}
//                             >
//                               <svg
//                                 width="16"
//                                 height="16"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <circle cx="12" cy="12" r="10"></circle>
//                                 <polyline points="12 6 12 12 16 14"></polyline>
//                               </svg>
//                               {getTimeSinceListed(product.created_at)}
//                             </div>

//                             <button
//                               style={{
//                                 backgroundColor: "transparent",
//                                 border: "none",
//                                 color: "rgba(255, 255, 255, 0.7)",
//                                 cursor: "pointer",
//                                 fontSize: "0.85rem",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.3rem",
//                                 padding: "0.3rem 0.6rem",
//                                 borderRadius: "4px",
//                                 transition: "all 0.2s ease",
//                               }}
//                               onMouseEnter={(e) => {
//                                 e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                               }}
//                               onMouseLeave={(e) => {
//                                 e.currentTarget.style.backgroundColor = "transparent"
//                               }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 setExpandedProduct(expandedProduct === product.id ? null : product.id)
//                               }}
//                             >
//                               {expandedProduct === product.id ? (
//                                 <>
//                                   <svg
//                                     width="16"
//                                     height="16"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                   >
//                                     <polyline points="18 15 12 9 6 15"></polyline>
//                                   </svg>
//                                   Less
//                                 </>
//                               ) : (
//                                 <>
//                                   <svg
//                                     width="16"
//                                     height="16"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                   >
//                                     <polyline points="6 9 12 15 18 9"></polyline>
//                                   </svg>
//                                   More
//                                 </>
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div
//                     style={{
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "3rem 2rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       margin: "0 1rem",
//                     }}
//                   >
//                     <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📦</div>
//                     <h3 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "300", marginBottom: "1rem" }}>
//                       You haven't listed any products yet
//                     </h3>
//                     <p style={{ color: "rgba(255, 255, 255, 0.8)", maxWidth: "500px", margin: "0 auto 1.5rem" }}>
//                       Start listing your seasonal products to trade with others in the community.
//                     </p>
//                     <button
//                       onClick={() => navigate("/dashboard")}
//                       style={{
//                         padding: "0.8rem 1.5rem",
//                         backgroundColor: "rgba(255, 255, 255, 0.2)",
//                         color: "#fff",
//                         border: "none",
//                         borderRadius: "30px",
//                         fontSize: "1rem",
//                         cursor: "pointer",
//                         transition: "all 0.3s ease",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
//                         e.currentTarget.style.transform = "translateY(-2px)"
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
//                         e.currentTarget.style.transform = "translateY(0)"
//                       }}
//                     >
//                       Go to Dashboard
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Pending Trades Tab */}
//               <div
//                 style={{
//                   width: "100%",
//                   maxWidth: "1200px",
//                   animation: "fadeInUp 0.7s ease-out",
//                   display: activeTab === "trades" ? "block" : "none",
//                 }}
//               >
//                 <h2
//                   style={{
//                     fontSize: "2rem",
//                     fontWeight: "300",
//                     marginBottom: "1.5rem",
//                     textAlign: "center",
//                     color: "#fff",
//                   }}
//                 >
//                   Pending Trade Requests
//                 </h2>

//                 {pendingTrades.length > 0 ? (
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//                       gap: "1.5rem",
//                       padding: "0 1rem",
//                     }}
//                   >
//                     {pendingTrades.map((trade, index) => (
//                       <div
//                         key={trade.id}
//                         style={{
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           backdropFilter: "blur(10px)",
//                           borderRadius: "12px",
//                           overflow: "hidden",
//                           boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           transition: "all 0.3s ease",
//                           animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
//                           padding: "1.5rem",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.transform = "translateY(-5px)"
//                           e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = "translateY(0)"
//                           e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
//                         }}
//                       >
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "1rem",
//                             marginBottom: "1.5rem",
//                           }}
//                         >
//                           <div
//                             style={{
//                               width: "50px",
//                               height: "50px",
//                               borderRadius: "50%",
//                               backgroundColor: "rgba(255, 255, 255, 0.2)",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               fontSize: "1.5rem",
//                             }}
//                           >
//                             🔄
//                           </div>
//                           <div>
//                             <h3
//                               style={{
//                                 margin: "0 0 0.25rem 0",
//                                 fontSize: "1.2rem",
//                                 fontWeight: "500",
//                                 color: "#fff",
//                               }}
//                             >
//                               Trade Request #{trade.id}
//                             </h3>
//                             <p
//                               style={{
//                                 margin: "0",
//                                 fontSize: "0.9rem",
//                                 color: "rgba(255, 255, 255, 0.7)",
//                               }}
//                             >
//                               Item ID: {trade.requested_item_id}
//                             </p>
//                           </div>
//                         </div>

//                         <div
//                           style={{
//                             backgroundColor: "rgba(255, 255, 255, 0.05)",
//                             borderRadius: "8px",
//                             padding: "1rem",
//                             marginBottom: "1.5rem",
//                           }}
//                         >
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "space-between",
//                               marginBottom: "0.5rem",
//                             }}
//                           >
//                             <span style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.9rem" }}>Coins Offered</span>
//                             <span
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                                 color: "#fff",
//                                 fontWeight: "600",
//                                 fontSize: "1.2rem",
//                               }}
//                             >
//                               <svg
//                                 width="20"
//                                 height="20"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="#FFC107"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <circle cx="12" cy="12" r="10"></circle>
//                                 <circle cx="12" cy="12" r="3"></circle>
//                               </svg>
//                               {trade.coins_offered}
//                             </span>
//                           </div>
//                         </div>

//                         <div
//                           style={{
//                             display: "flex",
//                             gap: "1rem",
//                           }}
//                         >
//                           <button
//                             onClick={() => handleTradeRequestAction(trade.id, "accept")}
//                             style={{
//                               flex: 1,
//                               padding: "0.8rem",
//                               backgroundColor: "rgba(76, 175, 80, 0.2)",
//                               color: "#4CAF50",
//                               border: "1px solid rgba(76, 175, 80, 0.3)",
//                               borderRadius: "8px",
//                               fontSize: "0.9rem",
//                               fontWeight: "500",
//                               cursor: "pointer",
//                               transition: "all 0.3s ease",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               gap: "0.5rem",
//                             }}
//                             onMouseEnter={(e) => {
//                               e.currentTarget.style.backgroundColor = "rgba(76, 175, 80, 0.3)"
//                             }}
//                             onMouseLeave={(e) => {
//                               e.currentTarget.style.backgroundColor = "rgba(76, 175, 80, 0.2)"
//                             }}
//                           >
//                             <svg
//                               width="16"
//                               height="16"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <polyline points="20 6 9 17 4 12"></polyline>
//                             </svg>
//                             Accept
//                           </button>

//                           <button
//                             onClick={() => handleTradeRequestAction(trade.id, "decline")}
//                             style={{
//                               flex: 1,
//                               padding: "0.8rem",
//                               backgroundColor: "rgba(244, 67, 54, 0.2)",
//                               color: "#f44336",
//                               border: "1px solid rgba(244, 67, 54, 0.3)",
//                               borderRadius: "8px",
//                               fontSize: "0.9rem",
//                               fontWeight: "500",
//                               cursor: "pointer",
//                               transition: "all 0.3s ease",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               gap: "0.5rem",
//                             }}
//                             onMouseEnter={(e) => {
//                               e.currentTarget.style.backgroundColor = "rgba(244, 67, 54, 0.3)"
//                             }}
//                             onMouseLeave={(e) => {
//                               e.currentTarget.style.backgroundColor = "rgba(244, 67, 54, 0.2)"
//                             }}
//                           >
//                             <svg
//                               width="16"
//                               height="16"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <line x1="18" y1="6" x2="6" y2="18"></line>
//                               <line x1="6" y1="6" x2="18" y2="18"></line>
//                             </svg>
//                             Decline
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div
//                     style={{
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "3rem 2rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       margin: "0 1rem",
//                     }}
//                   >
//                     <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
//                     <h3 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "300", marginBottom: "1rem" }}>
//                       No pending trade requests
//                     </h3>
//                     <p style={{ color: "rgba(255, 255, 255, 0.8)", maxWidth: "500px", margin: "0 auto" }}>
//                       When someone wants to trade for one of your products, the request will appear here.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 animation: "scaleIn 0.5s ease-out",
//               }}
//             >
//               <div
//                 style={{
//                   width: "100%",
//                   maxWidth: "500px",
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                   backdropFilter: "blur(10px)",
//                   borderRadius: "12px",
//                   padding: "2.5rem",
//                   boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
//                   border: "1px solid rgba(255, 255, 255, 0.1)",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginBottom: "2rem",
//                   }}
//                 >
//                   <h2
//                     style={{
//                       fontSize: "1.8rem",
//                       fontWeight: "300",
//                       color: "#fff",
//                       margin: 0,
//                     }}
//                   >
//                     Edit Your Profile
//                   </h2>

//                   <button
//                     onClick={() => setShowEditProfile(false)}
//                     style={{
//                       backgroundColor: "transparent",
//                       border: "1px solid rgba(255, 255, 255, 0.3)",
//                       borderRadius: "30px",
//                       padding: "0.6rem 1.2rem",
//                       color: "#fff",
//                       fontSize: "0.9rem",
//                       cursor: "pointer",
//                       transition: "all 0.3s ease",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "0.5rem",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.backgroundColor = "transparent"
//                     }}
//                   >
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <line x1="19" y1="12" x2="5" y2="12"></line>
//                       <polyline points="12 19 5 12 12 5"></polyline>
//                     </svg>
//                     Back
//                   </button>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                   <div style={{ marginBottom: "1.5rem" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         marginBottom: "0.5rem",
//                         color: "rgba(255, 255, 255, 0.8)",
//                         fontSize: "0.9rem",
//                       }}
//                     >
//                       Username
//                     </label>
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "0.75rem",
//                       }}
//                     >
//                       <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         style={{
//                           flex: 1,
//                           padding: "0.8rem 1rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.05)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "1rem",
//                           outline: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
//                         }}
//                         placeholder="Enter username"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleUpdateField("username", username)}
//                         style={{
//                           padding: "0.8rem 1.2rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "0.9rem",
//                           cursor: "pointer",
//                           transition: "all 0.3s ease",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>

//                   <div style={{ marginBottom: "1.5rem" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         marginBottom: "0.5rem",
//                         color: "rgba(255, 255, 255, 0.8)",
//                         fontSize: "0.9rem",
//                       }}
//                     >
//                       Email
//                     </label>
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "0.75rem",
//                       }}
//                     >
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         style={{
//                           flex: 1,
//                           padding: "0.8rem 1rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.05)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "1rem",
//                           outline: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
//                         }}
//                         placeholder="Enter email"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleUpdateField("email", email)}
//                         style={{
//                           padding: "0.8rem 1.2rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "0.9rem",
//                           cursor: "pointer",
//                           transition: "all 0.3s ease",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>

//                   <div style={{ marginBottom: "1.5rem" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         marginBottom: "0.5rem",
//                         color: "rgba(255, 255, 255, 0.8)",
//                         fontSize: "0.9rem",
//                       }}
//                     >
//                       New Password
//                     </label>
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "0.75rem",
//                       }}
//                     >
//                       <input
//                         type="password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         style={{
//                           flex: 1,
//                           padding: "0.8rem 1rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.05)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "1rem",
//                           outline: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
//                         }}
//                         placeholder="Enter new password"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleUpdateField("password", newPassword)}
//                         style={{
//                           padding: "0.8rem 1.2rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "0.9rem",
//                           cursor: "pointer",
//                           transition: "all 0.3s ease",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Notification */}
//       {notification && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "2rem",
//             right: "2rem",
//             backgroundColor: notification.type === "success" ? "rgba(76, 175, 80, 0.9)" : "rgba(244, 67, 54, 0.9)",
//             color: "#fff",
//             padding: "1rem 1.5rem",
//             borderRadius: "8px",
//             boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
//             zIndex: 1000,
//             display: "flex",
//             alignItems: "center",
//             gap: "0.75rem",
//             animation: "fadeInUp 0.3s ease-out",
//           }}
//         >
//           {notification.type === "success" ? (
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//               <polyline points="22 4 12 14.01 9 11.01"></polyline>
//             </svg>
//           ) : (
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="12" cy="12" r="10"></circle>
//               <line x1="12" y1="8" x2="12" y2="12"></line>
//               <line x1="12" y1="16" x2="12.01" y2="16"></line>
//             </svg>
//           )}
//           {notification.message}
//         </div>
//       )}

//       <Footer />
//     </div>
//   )
// }

// // Styles
// const profilePageStyle = {
//   backgroundImage:
//     "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundAttachment: "fixed",
//   minHeight: "100vh",
//   display: "flex",
//   flexDirection: "column",
//   position: "relative",
//   zIndex: 1,
// }

// const overlayStyle = {
//   position: "absolute",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   zIndex: -1,
// }

// const contentStyle = {
//   marginLeft: "270px",
//   flex: 1,
//   padding: "20px",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   color: "#fff",
//   textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
//   fontFamily: "'Poppins', sans-serif",
// }

// export default Profile




// "use client"

// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import Sidebar from "./Sidebar"
// import TabsComponent from "./Tabs"
// import Footer from "./Footer"

// function Profile() {
//   const navigate = useNavigate()
//   const [activeTab, setActiveTab] = useState("products")
//   const [showEditProfile, setShowEditProfile] = useState(false)
//   const [products, setProducts] = useState([])
//   const [pendingTrades, setPendingTrades] = useState([])
//   const [username, setUsername] = useState("")
//   const [email, setEmail] = useState("")
//   const [currentPassword, setCurrentPassword] = useState("")
//   const [newPassword, setNewPassword] = useState("")
//   const [notification, setNotification] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [userStats, setUserStats] = useState({
//     totalProducts: 0,
//     pendingRequests: 0,
//     completedTrades: 0,
//   })
//   const [hoveredRow, setHoveredRow] = useState(null)
//   const [expandedProduct, setExpandedProduct] = useState(null)

//   // Animation keyframes
//   const keyframes = `
//         @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes slideIn {
//             from { opacity: 0; transform: translateX(-20px); }
//             to { opacity: 1; transform: translateX(0); }
//         }
        
//         @keyframes pulse {
//             0% { transform: scale(1); }
//             50% { transform: scale(1.05); }
//             100% { transform: scale(1); }
//         }
        
//         @keyframes shimmer {
//             0% { background-position: -1000px 0; }
//             100% { background-position: 1000px 0; }
//         }
        
//         @keyframes scaleIn {
//             from { opacity: 0; transform: scale(0.9); }
//             to { opacity: 1; transform: scale(1); }
//         }
        
//         @keyframes fadeInUp {
//             from { opacity: 0; transform: translateY(10px); }
//             to { opacity: 1; transform: translateY(0); }
//         }
//     `

//   // Simplified approach: fetch user profile and products in one useEffect
//   useEffect(() => {
//     const fetchUserDataAndProducts = async () => {
//       try {
//         setLoading(true)
//         const token = localStorage.getItem("token")

//         if (!token) {
//           alert("Unauthorized! Redirecting to login.")
//           navigate("/login")
//           return
//         }

//         // Step 1: Get user profile to get the user ID
//         const profileResponse = await axios.get("http://localhost:8080/api/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         })

//         console.log("User profile:", profileResponse.data)

//         // Extract user ID, handling different possible field names
//         const userId =
//           profileResponse.data.id ||
//           profileResponse.data.user_id ||
//           profileResponse.data._id ||
//           profileResponse.data.userId

//         console.log("Current user ID:", userId)

//         if (!userId) {
//           console.error("Could not determine user ID from profile response")
//           setLoading(false)
//           return
//         }

//         // Step 2: Get all products
//         const productsResponse = await axios.get("http://localhost:8080/api/products", {
//           headers: { Authorization: `Bearer ${token}` },
//         })

//         console.log("All products:", productsResponse.data)

//         // Step 3: Filter products to only show those owned by the current user
//         let userProducts = []

//         if (Array.isArray(productsResponse.data)) {
//           userProducts = productsResponse.data.filter((product) => {
//             // Try different possible property names for owner ID
//             const productOwnerId =
//               product.owner_id || product.user_id || product.userId || product.ownerId || product.created_by

//             // Convert both to strings for comparison to avoid type mismatches
//             return String(productOwnerId) === String(userId)
//           })
//         }

//         console.log("Filtered user products:", userProducts)

//         // Step 4: Update state with the filtered products
//         setProducts(userProducts)
//         setUserStats((prev) => ({
//           ...prev,
//           totalProducts: userProducts.length,
//         }))

//         // Step 5: Get pending trades
//         const tradesResponse = await axios.get("http://localhost:8080/api/trade/pending", {
//           headers: { Authorization: `Bearer ${token}` },
//         })

//         setPendingTrades(tradesResponse.data || [])
//         setUserStats((prev) => ({
//           ...prev,
//           pendingRequests: tradesResponse.data?.length || 0,
//         }))
//       } catch (error) {
//         console.error("Error fetching user data:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUserDataAndProducts()
//   }, [navigate])

//   const getTimeSinceListed = (createdAt) => {
//     const createdDate = new Date(createdAt)
//     const now = new Date()
//     const timeDiff = Math.floor((now - createdDate) / 1000) // Difference in seconds

//     if (timeDiff < 60) {
//       return `${timeDiff} seconds ago`
//     } else if (timeDiff < 3600) {
//       return `${Math.floor(timeDiff / 60)} minutes ago`
//     } else if (timeDiff < 86400) {
//       return `${Math.floor(timeDiff / 3600)} hours ago`
//     } else if (timeDiff < 604800) {
//       return `${Math.floor(timeDiff / 86400)} days ago`
//     } else if (timeDiff < 2629800) {
//       // Approx. 1 month
//       return `${Math.floor(timeDiff / 604800)} weeks ago`
//     } else if (timeDiff < 31557600) {
//       // Approx. 1 year
//       return `${Math.floor(timeDiff / 2629800)} months ago`
//     } else {
//       return `${Math.floor(timeDiff / 31557600)} years ago`
//     }
//   }

//   const handleTradeRequestAction = async (tradeId, action) => {
//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.post(
//         `http://localhost:8080/api/trade/${action}/${tradeId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       )

//       // Show notification instead of alert
//       setNotification({
//         message: `Trade request ${action}ed successfully.`,
//         type: "success",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)

//       console.log("Trade action response:", response.data)

//       // Update pending trades
//       const updatedTradesResponse = await axios.get("http://localhost:8080/api/trade/pending", {
//         headers: { Authorization: `Bearer ${token}` },
//       })

//       setPendingTrades(updatedTradesResponse.data || [])

//       // Update stats
//       setUserStats((prev) => ({
//         ...prev,
//         pendingRequests: updatedTradesResponse.data?.length || 0,
//         completedTrades: action === "accept" ? prev.completedTrades + 1 : prev.completedTrades,
//       }))
//     } catch (error) {
//       console.error(`Error ${action}ing trade request:`, error)
//       setNotification({
//         message: `Failed to ${action} trade request. Please try again.`,
//         type: "error",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         setNotification({
//           message: "Unauthorized! Redirecting to login.",
//           type: "error",
//         })
//         setTimeout(() => {
//           navigate("/login")
//         }, 2000)
//         return
//       }

//       const response = await axios.put(
//         "http://localhost:8080/api/update-profile",
//         {
//           username,
//           email,
//           currentPassword,
//           newPassword,
//         },
//         { headers: { Authorization: `Bearer ${token}` } },
//       )

//       if (response.status === 200) {
//         setNotification({
//           message: "Profile updated successfully!",
//           type: "success",
//         })

//         // Clear form fields
//         setCurrentPassword("")
//         setNewPassword("")
//       } else {
//         setNotification({
//           message: response.data.message || "Update failed.",
//           type: "error",
//         })
//       }

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     } catch (error) {
//       console.error("Error updating profile:", error)
//       setNotification({
//         message: "Failed to update profile.",
//         type: "error",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     }
//   }

//   const handleUpdateField = async (field, value) => {
//     if (!value) {
//       setNotification({
//         message: `${field} cannot be empty.`,
//         type: "error",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//       return
//     }

//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         setNotification({
//           message: "Unauthorized! Redirecting to login.",
//           type: "error",
//         })
//         setTimeout(() => {
//           navigate("/login")
//         }, 2000)
//         return
//       }

//       const response = await axios.put(
//         "http://localhost:8080/api/update-profile",
//         { field, value },
//         { headers: { Authorization: `Bearer ${token}` } },
//       )

//       if (response.status === 200) {
//         setNotification({
//           message: `${field} updated successfully!`,
//           type: "success",
//         })
//       } else {
//         setNotification({
//           message: response.data.message || "Update failed.",
//           type: "error",
//         })
//       }

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     } catch (error) {
//       console.error(`Error updating ${field}:`, error)
//       setNotification({
//         message: `Failed to update ${field}.`,
//         type: "error",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     }
//   }

//   const getSeasonColor = (season) => {
//     switch (season?.toLowerCase()) {
//       case "spring":
//         return "#a8e6cf"
//       case "summer":
//         return "#ffdfba"
//       case "autumn":
//         return "#ffb7b2"
//       case "winter":
//         return "#b5c9df"
//       default:
//         return "#a0a0a0"
//     }
//   }

//   const getSeasonIcon = (season) => {
//     switch (season?.toLowerCase()) {
//       case "spring":
//         return "🌱"
//       case "summer":
//         return "☀️"
//       case "autumn":
//         return "🍂"
//       case "winter":
//         return "❄️"
//       default:
//         return "🌐"
//     }
//   }

//   if (loading) {
//     return (
//       <div style={profilePageStyle}>
//         <style dangerouslySetInnerHTML={{ __html: keyframes }} />
//         <div style={overlayStyle}></div>
//         <TabsComponent />
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//             width: "100%",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "2rem",
//               borderRadius: "12px",
//               backgroundColor: "rgba(255, 255, 255, 0.1)",
//               backdropFilter: "blur(10px)",
//               boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <div
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 border: "3px solid rgba(255, 255, 255, 0.3)",
//                 borderRadius: "50%",
//                 borderTopColor: "#ffffff",
//                 animation: "spin 1s linear infinite",
//                 marginBottom: "1rem",
//               }}
//             ></div>
//             <h2 style={{ color: "#fff", margin: "0" }}>Loading Profile...</h2>
//             <style>{`
//                             @keyframes spin {
//                                 0% { transform: rotate(0deg); }
//                                 100% { transform: rotate(360deg); }
//                             }
//                         `}</style>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div style={profilePageStyle}>
//       <style dangerouslySetInnerHTML={{ __html: keyframes }} />
//       <div style={overlayStyle}></div>
//       <TabsComponent />
//       <div style={{ display: "flex", paddingTop: "64px" }}>
//         <Sidebar onManageProfileClick={() => setShowEditProfile(true)} />
//         <div style={contentStyle}>
//           {!showEditProfile ? (
//             <>
//               {/* Profile Stats Section */}
//               <div
//                 style={{
//                   width: "100%",
//                   display: "flex",
//                   justifyContent: "center",
//                   marginBottom: "2rem",
//                   animation: "fadeIn 0.5s ease-out",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     justifyContent: "center",
//                     gap: "1.5rem",
//                     width: "100%",
//                     maxWidth: "1000px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       flex: "1 1 200px",
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "1.5rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "translateY(-5px)"
//                       e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)"
//                       e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
//                     }}
//                   >
//                     <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📦</div>
//                     <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "400" }}>Total Products</h3>
//                     <p style={{ margin: "0", fontSize: "2rem", fontWeight: "600" }}>{userStats.totalProducts}</p>
//                   </div>

//                   <div
//                     style={{
//                       flex: "1 1 200px",
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "1.5rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "translateY(-5px)"
//                       e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)"
//                       e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
//                     }}
//                   >
//                     <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>⏳</div>
//                     <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "400" }}>Pending Requests</h3>
//                     <p style={{ margin: "0", fontSize: "2rem", fontWeight: "600" }}>{userStats.pendingRequests}</p>
//                   </div>

//                   <div
//                     style={{
//                       flex: "1 1 200px",
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "1.5rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "translateY(-5px)"
//                       e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)"
//                       e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
//                     }}
//                   >
//                     <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🤝</div>
//                     <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "400" }}>Completed Trades</h3>
//                     <p style={{ margin: "0", fontSize: "2rem", fontWeight: "600" }}>{userStats.completedTrades}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Tab Navigation */}
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   marginBottom: "2rem",
//                   width: "100%",
//                   animation: "fadeIn 0.6s ease-out",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     backgroundColor: "rgba(255, 255, 255, 0.1)",
//                     backdropFilter: "blur(10px)",
//                     borderRadius: "30px",
//                     padding: "0.5rem",
//                     boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                   }}
//                 >
//                   <button
//                     onClick={() => setActiveTab("products")}
//                     style={{
//                       padding: "0.75rem 1.5rem",
//                       borderRadius: "25px",
//                       border: "none",
//                       backgroundColor: activeTab === "products" ? "rgba(255, 255, 255, 0.2)" : "transparent",
//                       color: "#fff",
//                       fontSize: "1rem",
//                       fontWeight: activeTab === "products" ? "500" : "400",
//                       cursor: "pointer",
//                       transition: "all 0.3s ease",
//                     }}
//                   >
//                     Your Products
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("trades")}
//                     style={{
//                       padding: "0.75rem 1.5rem",
//                       borderRadius: "25px",
//                       border: "none",
//                       backgroundColor: activeTab === "trades" ? "rgba(255, 255, 255, 0.2)" : "transparent",
//                       color: "#fff",
//                       fontSize: "1rem",
//                       fontWeight: activeTab === "trades" ? "500" : "400",
//                       cursor: "pointer",
//                       transition: "all 0.3s ease",
//                     }}
//                   >
//                     Pending Trades
//                   </button>
//                 </div>
//               </div>

//               {/* Content based on active tab */}
//               <div
//                 style={{
//                   width: "100%",
//                   maxWidth: "1200px",
//                   animation: activeTab === "products" ? "fadeInUp 0.7s ease-out" : "fadeInUp 0.7s ease-out",
//                   display: activeTab === "products" ? "block" : "none",
//                 }}
//               >
//                 <h2
//                   style={{
//                     fontSize: "2rem",
//                     fontWeight: "300",
//                     marginBottom: "1.5rem",
//                     textAlign: "center",
//                     color: "#fff",
//                   }}
//                 >
//                   Your Products
//                 </h2>

//                 {products.length > 0 ? (
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//                       gap: "1.5rem",
//                       padding: "0 1rem",
//                     }}
//                   >
//                     {products.map((product, index) => (
//                       <div
//                         key={product.id}
//                         style={{
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           backdropFilter: "blur(10px)",
//                           borderRadius: "12px",
//                           overflow: "hidden",
//                           boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           transition: "all 0.3s ease",
//                           animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
//                           transform: hoveredRow === product.id ? "translateY(-5px)" : "translateY(0)",
//                           boxShadow:
//                             hoveredRow === product.id
//                               ? "0 12px 25px rgba(0, 0, 0, 0.15)"
//                               : "0 8px 20px rgba(0, 0, 0, 0.1)",
//                         }}
//                         onMouseEnter={() => setHoveredRow(product.id)}
//                         onMouseLeave={() => setHoveredRow(null)}
//                         onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
//                       >
//                         <div
//                           style={{
//                             height: "180px",
//                             position: "relative",
//                             overflow: "hidden",
//                           }}
//                         >
//                           {product.product_image ? (
//                             <img
//                               src={`http://localhost:8080/${product.product_image}`}
//                               alt={product.product_name}
//                               style={{
//                                 width: "100%",
//                                 height: "100%",
//                                 objectFit: "cover",
//                                 transition: "transform 0.5s ease",
//                                 transform: hoveredRow === product.id ? "scale(1.05)" : "scale(1)",
//                               }}
//                             />
//                           ) : (
//                             <div
//                               style={{
//                                 width: "100%",
//                                 height: "100%",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 backgroundColor: "rgba(0, 0, 0, 0.1)",
//                                 fontSize: "3rem",
//                               }}
//                             >
//                               {getSeasonIcon(product.suitable_season)}
//                             </div>
//                           )}

//                           <div
//                             style={{
//                               position: "absolute",
//                               top: "1rem",
//                               right: "1rem",
//                               backgroundColor: getSeasonColor(product.suitable_season),
//                               color: "#fff",
//                               padding: "0.4rem 0.8rem",
//                               borderRadius: "20px",
//                               fontSize: "0.8rem",
//                               fontWeight: "500",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "0.3rem",
//                             }}
//                           >
//                             {getSeasonIcon(product.suitable_season)} {product.suitable_season}
//                           </div>
//                         </div>

//                         <div style={{ padding: "1.5rem" }}>
//                           <h3
//                             style={{
//                               margin: "0 0 0.5rem 0",
//                               fontSize: "1.2rem",
//                               fontWeight: "500",
//                               color: "#fff",
//                             }}
//                           >
//                             {product.product_name}
//                           </h3>

//                           <p
//                             style={{
//                               margin: "0 0 1rem 0",
//                               fontSize: "0.9rem",
//                               color: "rgba(255, 255, 255, 0.8)",
//                               display: expandedProduct === product.id ? "block" : "-webkit-box",
//                               WebkitLineClamp: "2",
//                               WebkitBoxOrient: "vertical",
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               lineHeight: "1.5",
//                             }}
//                           >
//                             {product.product_description}
//                           </p>

//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "space-between",
//                               alignItems: "center",
//                               marginTop: "1rem",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                                 color: "rgba(255, 255, 255, 0.7)",
//                                 fontSize: "0.85rem",
//                               }}
//                             >
//                               <svg
//                                 width="16"
//                                 height="16"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <circle cx="12" cy="12" r="10"></circle>
//                                 <polyline points="12 6 12 12 16 14"></polyline>
//                               </svg>
//                               {getTimeSinceListed(product.created_at)}
//                             </div>

//                             <button
//                               style={{
//                                 backgroundColor: "transparent",
//                                 border: "none",
//                                 color: "rgba(255, 255, 255, 0.7)",
//                                 cursor: "pointer",
//                                 fontSize: "0.85rem",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.3rem",
//                                 padding: "0.3rem 0.6rem",
//                                 borderRadius: "4px",
//                                 transition: "all 0.2s ease",
//                               }}
//                               onMouseEnter={(e) => {
//                                 e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                               }}
//                               onMouseLeave={(e) => {
//                                 e.currentTarget.style.backgroundColor = "transparent"
//                               }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 setExpandedProduct(expandedProduct === product.id ? null : product.id)
//                               }}
//                             >
//                               {expandedProduct === product.id ? (
//                                 <>
//                                   <svg
//                                     width="16"
//                                     height="16"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                   >
//                                     <polyline points="18 15 12 9 6 15"></polyline>
//                                   </svg>
//                                   Less
//                                 </>
//                               ) : (
//                                 <>
//                                   <svg
//                                     width="16"
//                                     height="16"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                   >
//                                     <polyline points="6 9 12 15 18 9"></polyline>
//                                   </svg>
//                                   More
//                                 </>
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div
//                     style={{
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "3rem 2rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       margin: "0 1rem",
//                     }}
//                   >
//                     <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📦</div>
//                     <h3 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "300", marginBottom: "1rem" }}>
//                       You haven't listed any products yet
//                     </h3>
//                     <p style={{ color: "rgba(255, 255, 255, 0.8)", maxWidth: "500px", margin: "0 auto 1.5rem" }}>
//                       Start listing your seasonal products to trade with others in the community.
//                     </p>
//                     <button
//                       onClick={() => navigate("/dashboard")}
//                       style={{
//                         padding: "0.8rem 1.5rem",
//                         backgroundColor: "rgba(255, 255, 255, 0.2)",
//                         color: "#fff",
//                         border: "none",
//                         borderRadius: "30px",
//                         fontSize: "1rem",
//                         cursor: "pointer",
//                         transition: "all 0.3s ease",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
//                         e.currentTarget.style.transform = "translateY(-2px)"
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
//                         e.currentTarget.style.transform = "translateY(0)"
//                       }}
//                     >
//                       Go to Dashboard
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Pending Trades Tab */}
//               <div
//                 style={{
//                   width: "100%",
//                   maxWidth: "1200px",
//                   animation: "fadeInUp 0.7s ease-out",
//                   display: activeTab === "trades" ? "block" : "none",
//                 }}
//               >
//                 <h2
//                   style={{
//                     fontSize: "2rem",
//                     fontWeight: "300",
//                     marginBottom: "1.5rem",
//                     textAlign: "center",
//                     color: "#fff",
//                   }}
//                 >
//                   Pending Trade Requests
//                 </h2>

//                 {pendingTrades.length > 0 ? (
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//                       gap: "1.5rem",
//                       padding: "0 1rem",
//                     }}
//                   >
//                     {pendingTrades.map((trade, index) => (
//                       <div
//                         key={trade.id}
//                         style={{
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           backdropFilter: "blur(10px)",
//                           borderRadius: "12px",
//                           overflow: "hidden",
//                           boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           transition: "all 0.3s ease",
//                           animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
//                           padding: "1.5rem",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.transform = "translateY(-5px)"
//                           e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = "translateY(0)"
//                           e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
//                         }}
//                       >
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "1rem",
//                             marginBottom: "1.5rem",
//                           }}
//                         >
//                           <div
//                             style={{
//                               width: "50px",
//                               height: "50px",
//                               borderRadius: "50%",
//                               backgroundColor: "rgba(255, 255, 255, 0.2)",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               fontSize: "1.5rem",
//                             }}
//                           >
//                             🔄
//                           </div>
//                           <div>
//                             <h3
//                               style={{
//                                 margin: "0 0 0.25rem 0",
//                                 fontSize: "1.2rem",
//                                 fontWeight: "500",
//                                 color: "#fff",
//                               }}
//                             >
//                               Trade Request #{trade.id}
//                             </h3>
//                             <p
//                               style={{
//                                 margin: "0",
//                                 fontSize: "0.9rem",
//                                 color: "rgba(255, 255, 255, 0.7)",
//                               }}
//                             >
//                               Item ID: {trade.requested_item_id}
//                             </p>
//                           </div>
//                         </div>

//                         <div
//                           style={{
//                             backgroundColor: "rgba(255, 255, 255, 0.05)",
//                             borderRadius: "8px",
//                             padding: "1rem",
//                             marginBottom: "1.5rem",
//                           }}
//                         >
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "space-between",
//                               marginBottom: "0.5rem",
//                             }}
//                           >
//                             <span style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.9rem" }}>Coins Offered</span>
//                             <span
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                                 color: "#fff",
//                                 fontWeight: "600",
//                                 fontSize: "1.2rem",
//                               }}
//                             >
//                               <svg
//                                 width="20"
//                                 height="20"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="#FFC107"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <circle cx="12" cy="12" r="10"></circle>
//                                 <circle cx="12" cy="12" r="3"></circle>
//                               </svg>
//                               {trade.coins_offered}
//                             </span>
//                           </div>
//                         </div>

//                         <div
//                           style={{
//                             display: "flex",
//                             gap: "1rem",
//                           }}
//                         >
//                           <button
//                             onClick={() => handleTradeRequestAction(trade.id, "accept")}
//                             style={{
//                               flex: 1,
//                               padding: "0.8rem",
//                               backgroundColor: "rgba(76, 175, 80, 0.2)",
//                               color: "#4CAF50",
//                               border: "1px solid rgba(76, 175, 80, 0.3)",
//                               borderRadius: "8px",
//                               fontSize: "0.9rem",
//                               fontWeight: "500",
//                               cursor: "pointer",
//                               transition: "all 0.3s ease",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               gap: "0.5rem",
//                             }}
//                             onMouseEnter={(e) => {
//                               e.currentTarget.style.backgroundColor = "rgba(76, 175, 80, 0.3)"
//                             }}
//                             onMouseLeave={(e) => {
//                               e.currentTarget.style.backgroundColor = "rgba(76, 175, 80, 0.2)"
//                             }}
//                           >
//                             <svg
//                               width="16"
//                               height="16"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <polyline points="20 6 9 17 4 12"></polyline>
//                             </svg>
//                             Accept
//                           </button>

//                           <button
//                             onClick={() => handleTradeRequestAction(trade.id, "decline")}
//                             style={{
//                               flex: 1,
//                               padding: "0.8rem",
//                               backgroundColor: "rgba(244, 67, 54, 0.2)",
//                               color: "#f44336",
//                               border: "1px solid rgba(244, 67, 54, 0.3)",
//                               borderRadius: "8px",
//                               fontSize: "0.9rem",
//                               fontWeight: "500",
//                               cursor: "pointer",
//                               transition: "all 0.3s ease",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               gap: "0.5rem",
//                             }}
//                             onMouseEnter={(e) => {
//                               e.currentTarget.style.backgroundColor = "rgba(244, 67, 54, 0.3)"
//                             }}
//                             onMouseLeave={(e) => {
//                               e.currentTarget.style.backgroundColor = "rgba(244, 67, 54, 0.2)"
//                             }}
//                           >
//                             <svg
//                               width="16"
//                               height="16"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <line x1="18" y1="6" x2="6" y2="18"></line>
//                               <line x1="6" y1="6" x2="18" y2="18"></line>
//                             </svg>
//                             Decline
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div
//                     style={{
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "3rem 2rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       margin: "0 1rem",
//                     }}
//                   >
//                     <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
//                     <h3 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "300", marginBottom: "1rem" }}>
//                       No pending trade requests
//                     </h3>
//                     <p style={{ color: "rgba(255, 255, 255, 0.8)", maxWidth: "500px", margin: "0 auto" }}>
//                       When someone wants to trade for one of your products, the request will appear here.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 animation: "scaleIn 0.5s ease-out",
//               }}
//             >
//               <div
//                 style={{
//                   width: "100%",
//                   maxWidth: "500px",
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                   backdropFilter: "blur(10px)",
//                   borderRadius: "12px",
//                   padding: "2.5rem",
//                   boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
//                   border: "1px solid rgba(255, 255, 255, 0.1)",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginBottom: "2rem",
//                   }}
//                 >
//                   <h2
//                     style={{
//                       fontSize: "1.8rem",
//                       fontWeight: "300",
//                       color: "#fff",
//                       margin: 0,
//                     }}
//                   >
//                     Edit Your Profile
//                   </h2>

//                   <button
//                     onClick={() => setShowEditProfile(false)}
//                     style={{
//                       backgroundColor: "transparent",
//                       border: "1px solid rgba(255, 255, 255, 0.3)",
//                       borderRadius: "30px",
//                       padding: "0.6rem 1.2rem",
//                       color: "#fff",
//                       fontSize: "0.9rem",
//                       cursor: "pointer",
//                       transition: "all 0.3s ease",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "0.5rem",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.backgroundColor = "transparent"
//                     }}
//                   >
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <line x1="19" y1="12" x2="5" y2="12"></line>
//                       <polyline points="12 19 5 12 12 5"></polyline>
//                     </svg>
//                     Back
//                   </button>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                   <div style={{ marginBottom: "1.5rem" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         marginBottom: "0.5rem",
//                         color: "rgba(255, 255, 255, 0.8)",
//                         fontSize: "0.9rem",
//                       }}
//                     >
//                       Username
//                     </label>
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "0.75rem",
//                       }}
//                     >
//                       <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         style={{
//                           flex: 1,
//                           padding: "0.8rem 1rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.05)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "1rem",
//                           outline: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
//                         }}
//                         placeholder="Enter username"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleUpdateField("username", username)}
//                         style={{
//                           padding: "0.8rem 1.2rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "0.9rem",
//                           cursor: "pointer",
//                           transition: "all 0.3s ease",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>

//                   <div style={{ marginBottom: "1.5rem" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         marginBottom: "0.5rem",
//                         color: "rgba(255, 255, 255, 0.8)",
//                         fontSize: "0.9rem",
//                       }}
//                     >
//                       Email
//                     </label>
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "0.75rem",
//                       }}
//                     >
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         style={{
//                           flex: 1,
//                           padding: "0.8rem 1rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.05)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "1rem",
//                           outline: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
//                         }}
//                         placeholder="Enter email"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleUpdateField("email", email)}
//                         style={{
//                           padding: "0.8rem 1.2rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "0.9rem",
//                           cursor: "pointer",
//                           transition: "all 0.3s ease",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>

//                   <div style={{ marginBottom: "1.5rem" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         marginBottom: "0.5rem",
//                         color: "rgba(255, 255, 255, 0.8)",
//                         fontSize: "0.9rem",
//                       }}
//                     >
//                       New Password
//                     </label>
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "0.75rem",
//                       }}
//                     >
//                       <input
//                         type="password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         style={{
//                           flex: 1,
//                           padding: "0.8rem 1rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.05)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "1rem",
//                           outline: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
//                         }}
//                         placeholder="Enter new password"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleUpdateField("password", newPassword)}
//                         style={{
//                           padding: "0.8rem 1.2rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "0.9rem",
//                           cursor: "pointer",
//                           transition: "all 0.3s ease",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Notification */}
//       {notification && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "2rem",
//             right: "2rem",
//             backgroundColor: notification.type === "success" ? "rgba(76, 175, 80, 0.9)" : "rgba(244, 67, 54, 0.9)",
//             color: "#fff",
//             padding: "1rem 1.5rem",
//             borderRadius: "8px",
//             boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
//             zIndex: 1000,
//             display: "flex",
//             alignItems: "center",
//             gap: "0.75rem",
//             animation: "fadeInUp 0.3s ease-out",
//           }}
//         >
//           {notification.type === "success" ? (
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//               <polyline points="22 4 12 14.01 9 11.01"></polyline>
//             </svg>
//           ) : (
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="12" cy="12" r="10"></circle>
//               <line x1="12" y1="8" x2="12" y2="12"></line>
//               <line x1="12" y1="16" x2="12.01" y2="16"></line>
//             </svg>
//           )}
//           {notification.message}
//         </div>
//       )}

//       <Footer />
//     </div>
//   )
// }

// // Styles
// const profilePageStyle = {
//   backgroundImage:
//     "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundAttachment: "fixed",
//   minHeight: "100vh",
//   display: "flex",
//   flexDirection: "column",
//   position: "relative",
//   zIndex: 1,
// }

// const overlayStyle = {
//   position: "absolute",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   zIndex: -1,
// }

// const contentStyle = {
//   marginLeft: "270px",
//   flex: 1,
//   padding: "20px",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   color: "#fff",
//   textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
//   fontFamily: "'Poppins', sans-serif",
// }

// export default Profile




"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Sidebar from "./Sidebar"
import TabsComponent from "./Tabs"
import Footer from "./Footer"

function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("products")
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [products, setProducts] = useState([])
  const [pendingTrades, setPendingTrades] = useState([])
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [notification, setNotification] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userStats, setUserStats] = useState({
    totalProducts: 0,
    pendingRequests: 0,
    completedTrades: 0,
  })
  const [hoveredRow, setHoveredRow] = useState(null)
  const [expandedProduct, setExpandedProduct] = useState(null)

  // Animation keyframes
  const keyframes = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }
        
        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `

  // Simplified approach: fetch user profile and products in one useEffect
  useEffect(() => {
    const fetchUserDataAndProducts = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")

        if (!token) {
          alert("Unauthorized! Redirecting to login.")
          navigate("/login")
          return
        }

        // Step 1: Get user profile to get the user ID
        const profileResponse = await axios.get("http://localhost:8080/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })

        console.log("User profile:", profileResponse.data)

        // Extract user ID, handling different possible field names
        const userId =
          profileResponse.data.id ||
          profileResponse.data.user_id ||
          profileResponse.data._id ||
          profileResponse.data.userId

        console.log("Current user ID:", userId)

        if (!userId) {
          console.error("Could not determine user ID from profile response")
          setLoading(false)
          return
        }

        // Step 2: Get all products
        const productsResponse = await axios.get("http://localhost:8080/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        })

        console.log("All products:", productsResponse.data)

        // Step 3: Filter products to only show those owned by the current user
        let userProducts = []

        if (Array.isArray(productsResponse.data)) {
          userProducts = productsResponse.data.filter((product) => {
            // Try different possible property names for owner ID
            const productOwnerId =
              product.owner_id || product.user_id || product.userId || product.ownerId || product.created_by

            // Convert both to strings for comparison to avoid type mismatches
            return String(productOwnerId) === String(userId)
          })
        }

        console.log("Filtered user products:", userProducts)

        // Step 4: Update state with the filtered products
        setProducts(userProducts)
        setUserStats((prev) => ({
          ...prev,
          totalProducts: userProducts.length,
        }))

        // Step 5: Get pending trades
        const tradesResponse = await axios.get("http://localhost:8080/api/trade/pending", {
          headers: { Authorization: `Bearer ${token}` },
        })

        setPendingTrades(tradesResponse.data || [])
        setUserStats((prev) => ({
          ...prev,
          pendingRequests: tradesResponse.data?.length || 0,
        }))
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserDataAndProducts()
  }, [navigate])

  const getTimeSinceListed = (createdAt) => {
    const createdDate = new Date(createdAt)
    const now = new Date()
    const timeDiff = Math.floor((now - createdDate) / 1000) // Difference in seconds

    if (timeDiff < 60) {
      return `${timeDiff} seconds ago`
    } else if (timeDiff < 3600) {
      return `${Math.floor(timeDiff / 60)} minutes ago`
    } else if (timeDiff < 86400) {
      return `${Math.floor(timeDiff / 3600)} hours ago`
    } else if (timeDiff < 604800) {
      return `${Math.floor(timeDiff / 86400)} days ago`
    } else if (timeDiff < 2629800) {
      // Approx. 1 month
      return `${Math.floor(timeDiff / 604800)} weeks ago`
    } else if (timeDiff < 31557600) {
      // Approx. 1 year
      return `${Math.floor(timeDiff / 2629800)} months ago`
    } else {
      return `${Math.floor(timeDiff / 31557600)} years ago`
    }
  }

  const handleTradeRequestAction = async (tradeId, action) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        `http://localhost:8080/api/trade/${action}/${tradeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      // Show notification instead of alert
      setNotification({
        message: `Trade request ${action}ed successfully.`,
        type: "success",
      })

      setTimeout(() => {
        setNotification(null)
      }, 3000)

      console.log("Trade action response:", response.data)

      // Update pending trades
      const updatedTradesResponse = await axios.get("http://localhost:8080/api/trade/pending", {
        headers: { Authorization: `Bearer ${token}` },
      })

      setPendingTrades(updatedTradesResponse.data || [])

      // Update stats
      setUserStats((prev) => ({
        ...prev,
        pendingRequests: updatedTradesResponse.data?.length || 0,
        completedTrades: action === "accept" ? prev.completedTrades + 1 : prev.completedTrades,
      }))
    } catch (error) {
      console.error(`Error ${action}ing trade request:`, error)
      setNotification({
        message: `Failed to ${action} trade request. Please try again.`,
        type: "error",
      })

      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setNotification({
          message: "Unauthorized! Redirecting to login.",
          type: "error",
        })
        setTimeout(() => {
          navigate("/login")
        }, 2000)
        return
      }

      const response = await axios.put(
        "http://localhost:8080/api/update-profile",
        {
          username,
          email,
          currentPassword,
          newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      if (response.status === 200) {
        setNotification({
          message: "Profile updated successfully!",
          type: "success",
        })

        // Clear form fields
        setCurrentPassword("")
        setNewPassword("")
      } else {
        setNotification({
          message: response.data.message || "Update failed.",
          type: "error",
        })
      }

      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (error) {
      console.error("Error updating profile:", error)
      setNotification({
        message: "Failed to update profile.",
        type: "error",
      })

      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleUpdateField = async (field, value) => {
    if (!value) {
      setNotification({
        message: `${field} cannot be empty.`,
        type: "error",
      })

      setTimeout(() => {
        setNotification(null)
      }, 3000)
      return
    }

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setNotification({
          message: "Unauthorized! Redirecting to login.",
          type: "error",
        })
        setTimeout(() => {
          navigate("/login")
        }, 2000)
        return
      }

      const response = await axios.put(
        "http://localhost:8080/api/update-profile",
        { field, value },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      if (response.status === 200) {
        setNotification({
          message: `${field} updated successfully!`,
          type: "success",
        })
      } else {
        setNotification({
          message: response.data.message || "Update failed.",
          type: "error",
        })
      }

      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (error) {
      console.error(`Error updating ${field}:`, error)
      setNotification({
        message: `Failed to update ${field}.`,
        type: "error",
      })

      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const getSeasonColor = (season) => {
    switch (season?.toLowerCase()) {
      case "spring":
        return "#a8e6cf"
      case "summer":
        return "#ffdfba"
      case "autumn":
        return "#ffb7b2"
      case "winter":
        return "#b5c9df"
      default:
        return "#a0a0a0"
    }
  }

  const getSeasonIcon = (season) => {
    switch (season?.toLowerCase()) {
      case "spring":
        return "🌱"
      case "summer":
        return "☀️"
      case "autumn":
        return "🍂"
      case "winter":
        return "❄️"
      default:
        return "🌐"
    }
  }

  if (loading) {
    return (
      <div style={profilePageStyle}>
        <style dangerouslySetInnerHTML={{ __html: keyframes }} />
        <div style={overlayStyle}></div>
        <TabsComponent />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              borderRadius: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                border: "3px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "50%",
                borderTopColor: "#ffffff",
                animation: "spin 1s linear infinite",
                marginBottom: "1rem",
              }}
            ></div>
            <h2 style={{ color: "#fff", margin: "0" }}>Loading Profile...</h2>
            <style>{`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={profilePageStyle}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div style={overlayStyle}></div>
      <TabsComponent />
      <div style={{ display: "flex", paddingTop: "64px" }}>
        <Sidebar onManageProfileClick={() => setShowEditProfile(true)} />
        <div style={contentStyle}>
          {!showEditProfile ? (
            <>
              {/* Profile Stats Section */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "2rem",
                  animation: "fadeIn 0.5s ease-out",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "1.5rem",
                    width: "100%",
                    maxWidth: "1000px",
                  }}
                >
                  <div
                    style={{
                      flex: "1 1 200px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      textAlign: "center",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)"
                      e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📦</div>
                    <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "400" }}>Total Products</h3>
                    <p style={{ margin: "0", fontSize: "2rem", fontWeight: "600" }}>{userStats.totalProducts}</p>
                  </div>

                  <div
                    style={{
                      flex: "1 1 200px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      textAlign: "center",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)"
                      e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>⏳</div>
                    <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "400" }}>Pending Requests</h3>
                    <p style={{ margin: "0", fontSize: "2rem", fontWeight: "600" }}>{userStats.pendingRequests}</p>
                  </div>

                  <div
                    style={{
                      flex: "1 1 200px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      textAlign: "center",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)"
                      e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🤝</div>
                    <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "400" }}>Completed Trades</h3>
                    <p style={{ margin: "0", fontSize: "2rem", fontWeight: "600" }}>{userStats.completedTrades}</p>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "2rem",
                  width: "100%",
                  animation: "fadeIn 0.6s ease-out",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "30px",
                    padding: "0.5rem",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <button
                    onClick={() => setActiveTab("products")}
                    style={{
                      padding: "0.75rem 1.5rem",
                      borderRadius: "25px",
                      border: "none",
                      backgroundColor: activeTab === "products" ? "rgba(255, 255, 255, 0.2)" : "transparent",
                      color: "#fff",
                      fontSize: "1rem",
                      fontWeight: activeTab === "products" ? "500" : "400",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Your Products
                  </button>
                  <button
                    onClick={() => setActiveTab("trades")}
                    style={{
                      padding: "0.75rem 1.5rem",
                      borderRadius: "25px",
                      border: "none",
                      backgroundColor: activeTab === "trades" ? "rgba(255, 255, 255, 0.2)" : "transparent",
                      color: "#fff",
                      fontSize: "1rem",
                      fontWeight: activeTab === "trades" ? "500" : "400",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Pending Trades
                  </button>
                </div>
              </div>

              {/* Content based on active tab */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "1200px",
                  animation: activeTab === "products" ? "fadeInUp 0.7s ease-out" : "fadeInUp 0.7s ease-out",
                  display: activeTab === "products" ? "block" : "none",
                }}
              >
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: "300",
                    marginBottom: "1.5rem",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Your Products
                </h2>

                {products.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: "1.5rem",
                      padding: "0 1rem",
                    }}
                  >
                    {products.map((product, index) => (
                      <div
                        key={product.id}
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(10px)",
                          borderRadius: "12px",
                          overflow: "hidden",
                          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          transition: "all 0.3s ease",
                          animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                          transform: hoveredRow === product.id ? "translateY(-5px)" : "translateY(0)",
                          boxShadow:
                            hoveredRow === product.id
                              ? "0 12px 25px rgba(0, 0, 0, 0.15)"
                              : "0 8px 20px rgba(0, 0, 0, 0.1)",
                        }}
                        onMouseEnter={() => setHoveredRow(product.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                      >
                        <div
                          style={{
                            height: "180px",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          {product.product_image ? (
                            <img
                              src={`http://localhost:8080/${product.product_image}`}
                              alt={product.product_name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.5s ease",
                                transform: hoveredRow === product.id ? "scale(1.05)" : "scale(1)",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                fontSize: "3rem",
                              }}
                            >
                              {getSeasonIcon(product.suitable_season)}
                            </div>
                          )}

                          <div
                            style={{
                              position: "absolute",
                              top: "1rem",
                              right: "1rem",
                              backgroundColor: getSeasonColor(product.suitable_season),
                              color: "#fff",
                              padding: "0.4rem 0.8rem",
                              borderRadius: "20px",
                              fontSize: "0.8rem",
                              fontWeight: "500",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.3rem",
                            }}
                          >
                            {getSeasonIcon(product.suitable_season)} {product.suitable_season}
                          </div>
                        </div>

                        <div style={{ padding: "1.5rem" }}>
                          <h3
                            style={{
                              margin: "0 0 0.5rem 0",
                              fontSize: "1.2rem",
                              fontWeight: "500",
                              color: "#fff",
                            }}
                          >
                            {product.product_name}
                          </h3>

                          <p
                            style={{
                              margin: "0 0 1rem 0",
                              fontSize: "0.9rem",
                              color: "rgba(255, 255, 255, 0.8)",
                              display: expandedProduct === product.id ? "block" : "-webkit-box",
                              WebkitLineClamp: "2",
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              lineHeight: "1.5",
                            }}
                          >
                            {product.product_description}
                          </p>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "1rem",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                color: "rgba(255, 255, 255, 0.7)",
                                fontSize: "0.85rem",
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              {getTimeSinceListed(product.created_at)}
                            </div>

                            <button
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                                color: "rgba(255, 255, 255, 0.7)",
                                cursor: "pointer",
                                fontSize: "0.85rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                padding: "0.3rem 0.6rem",
                                borderRadius: "4px",
                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent"
                              }}
                              onClick={(e) => {
                                e.stopPropagation()
                                setExpandedProduct(expandedProduct === product.id ? null : product.id)
                              }}
                            >
                              {expandedProduct === product.id ? (
                                <>
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                  </svg>
                                  Less
                                </>
                              ) : (
                                <>
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                  </svg>
                                  More
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      padding: "3rem 2rem",
                      textAlign: "center",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      margin: "0 1rem",
                    }}
                  >
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📦</div>
                    <h3 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "300", marginBottom: "1rem" }}>
                      You haven't listed any products yet
                    </h3>
                    <p style={{ color: "rgba(255, 255, 255, 0.8)", maxWidth: "500px", margin: "0 auto 1.5rem" }}>
                      Start listing your seasonal products to trade with others in the community.
                    </p>
                    <button
                      onClick={() => navigate("/dashboard")}
                      style={{
                        padding: "0.8rem 1.5rem",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "30px",
                        fontSize: "1rem",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
                        e.currentTarget.style.transform = "translateY(-2px)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
                        e.currentTarget.style.transform = "translateY(0)"
                      }}
                    >
                      Go to Dashboard
                    </button>
                  </div>
                )}
              </div>

              {/* Pending Trades Tab */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "1200px",
                  animation: "fadeInUp 0.7s ease-out",
                  display: activeTab === "trades" ? "block" : "none",
                }}
              >
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: "300",
                    marginBottom: "1.5rem",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Pending Trade Requests
                </h2>

                {pendingTrades.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                      gap: "1.5rem",
                      padding: "0 1rem",
                    }}
                  >
                    {pendingTrades.map((trade, index) => (
                      <div
                        key={trade.id}
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(10px)",
                          borderRadius: "12px",
                          overflow: "hidden",
                          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          transition: "all 0.3s ease",
                          animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                          padding: "1.5rem",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-5px)"
                          e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)"
                          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            marginBottom: "1.5rem",
                          }}
                        >
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(255, 255, 255, 0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "1.5rem",
                            }}
                          >
                            🔄
                          </div>
                          <div>
                            <h3
                              style={{
                                margin: "0 0 0.25rem 0",
                                fontSize: "1.2rem",
                                fontWeight: "500",
                                color: "#fff",
                              }}
                            >
                              Trade Request #{trade.id}
                            </h3>
                            <p
                              style={{
                                margin: "0",
                                fontSize: "0.9rem",
                                color: "rgba(255, 255, 255, 0.7)",
                              }}
                            >
                              Item ID: {trade.requested_item_id}
                            </p>
                          </div>
                        </div>

                        <div
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "8px",
                            padding: "1rem",
                            marginBottom: "1.5rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <span style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.9rem" }}>Coins Offered</span>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                color: "#fff",
                                fontWeight: "600",
                                fontSize: "1.2rem",
                              }}
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#FFC107"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              {trade.coins_offered}
                            </span>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                          }}
                        >
                          <button
                            onClick={() => handleTradeRequestAction(trade.id, "accept")}
                            style={{
                              flex: 1,
                              padding: "0.8rem",
                              backgroundColor: "rgba(76, 175, 80, 0.2)",
                              color: "#4CAF50",
                              border: "1px solid rgba(76, 175, 80, 0.3)",
                              borderRadius: "8px",
                              fontSize: "0.9rem",
                              fontWeight: "500",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.5rem",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "rgba(76, 175, 80, 0.3)"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "rgba(76, 175, 80, 0.2)"
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Accept
                          </button>

                          <button
                            onClick={() => handleTradeRequestAction(trade.id, "decline")}
                            style={{
                              flex: 1,
                              padding: "0.8rem",
                              backgroundColor: "rgba(244, 67, 54, 0.2)",
                              color: "#f44336",
                              border: "1px solid rgba(244, 67, 54, 0.3)",
                              borderRadius: "8px",
                              fontSize: "0.9rem",
                              fontWeight: "500",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.5rem",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "rgba(244, 67, 54, 0.3)"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "rgba(244, 67, 54, 0.2)"
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      padding: "3rem 2rem",
                      textAlign: "center",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      margin: "0 1rem",
                    }}
                  >
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
                    <h3 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "300", marginBottom: "1rem" }}>
                      No pending trade requests
                    </h3>
                    <p style={{ color: "rgba(255, 255, 255, 0.8)", maxWidth: "500px", margin: "0 auto" }}>
                      When someone wants to trade for one of your products, the request will appear here.
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                animation: "scaleIn 0.5s ease-out",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: "2.5rem",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "2rem",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: "300",
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    Edit Your Profile
                  </h2>

                  <button
                    onClick={() => setShowEditProfile(false)}
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "30px",
                      padding: "0.6rem 1.2rem",
                      color: "#fff",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "0.9rem",
                      }}
                    >
                      Username
                    </label>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                      }}
                    >
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                          flex: 1,
                          padding: "0.8rem 1rem",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                          color: "#fff",
                          fontSize: "1rem",
                          outline: "none",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
                          e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"
                          e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
                        }}
                        placeholder="Enter username"
                      />
                      <button
                        type="button"
                        onClick={() => handleUpdateField("username", username)}
                        style={{
                          padding: "0.8rem 1.2rem",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "8px",
                          color: "#fff",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "0.9rem",
                      }}
                    >
                      Email
                    </label>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                      }}
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          flex: 1,
                          padding: "0.8rem 1rem",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                          color: "#fff",
                          fontSize: "1rem",
                          outline: "none",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
                          e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"
                          e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
                        }}
                        placeholder="Enter email"
                      />
                      <button
                        type="button"
                        onClick={() => handleUpdateField("email", email)}
                        style={{
                          padding: "0.8rem 1.2rem",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "8px",
                          color: "#fff",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "0.9rem",
                      }}
                    >
                      New Password
                    </label>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                      }}
                    >
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{
                          flex: 1,
                          padding: "0.8rem 1rem",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                          color: "#fff",
                          fontSize: "1rem",
                          outline: "none",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
                          e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"
                          e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
                        }}
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => handleUpdateField("password", newPassword)}
                        style={{
                          padding: "0.8rem 1.2rem",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "8px",
                          color: "#fff",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            backgroundColor: notification.type === "success" ? "rgba(76, 175, 80, 0.9)" : "rgba(244, 67, 54, 0.9)",
            color: "#fff",
            padding: "1rem 1.5rem",
            borderRadius: "8px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            animation: "fadeInUp 0.3s ease-out",
          }}
        >
          {notification.type === "success" ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          )}
          {notification.message}
        </div>
      )}

      <Footer />
    </div>
  )
}

// Styles
const profilePageStyle = {
  backgroundImage:
    "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  zIndex: 1,
}

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: -1,
}

const contentStyle = {
  marginLeft: "270px",
  flex: 1,
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "#fff",
  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
  fontFamily: "'Poppins', sans-serif",
}

export default Profile


// "use client"

// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import Sidebar from "./Sidebar"
// import TabsComponent from "./Tabs"
// import Footer from "./Footer"

// function Profile() {
//   const navigate = useNavigate()
//   const [activeTab, setActiveTab] = useState("products")
//   const [showEditProfile, setShowEditProfile] = useState(false)
//   const [products, setProducts] = useState([])
//   const [pendingTrades, setPendingTrades] = useState([])
//   const [username, setUsername] = useState("")
//   const [email, setEmail] = useState("")
//   const [currentPassword, setCurrentPassword] = useState("")
//   const [newPassword, setNewPassword] = useState("")
//   const [notification, setNotification] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [userStats, setUserStats] = useState({
//     totalProducts: 0,
//     pendingRequests: 0,
//     completedTrades: 0,
//   })
//   const [hoveredRow, setHoveredRow] = useState(null)
//   const [expandedProduct, setExpandedProduct] = useState(null)

//   // Animation keyframes
//   const keyframes = `
//         @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes slideIn {
//             from { opacity: 0; transform: translateX(-20px); }
//             to { opacity: 1; transform: translateX(0); }
//         }
        
//         @keyframes pulse {
//             0% { transform: scale(1); }
//             50% { transform: scale(1.05); }
//             100% { transform: scale(1); }
//         }
        
//         @keyframes shimmer {
//             0% { background-position: -1000px 0; }
//             100% { background-position: 1000px 0; }
//         }
        
//         @keyframes scaleIn {
//             from { opacity: 0; transform: scale(0.9); }
//             to { opacity: 1; transform: scale(1); }
//         }
        
//         @keyframes fadeInUp {
//             from { opacity: 0; transform: translateY(10px); }
//             to { opacity: 1; transform: translateY(0); }
//         }
//     `

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem("token")
//         if (!token) {
//           alert("Unauthorized! Redirecting to login.")
//           navigate("/login")
//           return
//         }

//         const response = await axios.get("http://localhost:8080/api/products", {
//           headers: { Authorization: `Bearer ${token}` },
//         })

//         setProducts(response.data)
//         setUserStats((prev) => ({
//           ...prev,
//           totalProducts: response.data.length,
//         }))
//         setLoading(false)
//       } catch (error) {
//         console.error("Error fetching products:", error)
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [navigate])

//   const getTimeSinceListed = (createdAt) => {
//     const createdDate = new Date(createdAt)
//     const now = new Date()
//     const timeDiff = Math.floor((now - createdDate) / 1000) // Difference in seconds

//     if (timeDiff < 60) {
//       return `${timeDiff} seconds ago`
//     } else if (timeDiff < 3600) {
//       return `${Math.floor(timeDiff / 60)} minutes ago`
//     } else if (timeDiff < 86400) {
//       return `${Math.floor(timeDiff / 3600)} hours ago`
//     } else if (timeDiff < 604800) {
//       return `${Math.floor(timeDiff / 86400)} days ago`
//     } else if (timeDiff < 2629800) {
//       // Approx. 1 month
//       return `${Math.floor(timeDiff / 604800)} weeks ago`
//     } else if (timeDiff < 31557600) {
//       // Approx. 1 year
//       return `${Math.floor(timeDiff / 2629800)} months ago`
//     } else {
//       return `${Math.floor(timeDiff / 31557600)} years ago`
//     }
//   }

//   const fetchPendingTrades = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.get("http://localhost:8080/api/trade/pending", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       return response.data
//     } catch (error) {
//       console.error("Error fetching pending trades:", error)
//       return []
//     }
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       const pendingTrades = await fetchPendingTrades()
//       setPendingTrades(pendingTrades)
//       setUserStats((prev) => ({
//         ...prev,
//         pendingRequests: pendingTrades.length,
//       }))
//     }

//     fetchData()
//   }, [])

//   const handleTradeRequestAction = async (tradeId, action) => {
//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.post(
//         `http://localhost:8080/api/trade/${action}/${tradeId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       )

//       // Show notification instead of alert
//       setNotification({
//         message: `Trade request ${action}ed successfully.`,
//         type: "success",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)

//       console.log("Trade action response:", response.data)
//       const updatedPendingTrades = await fetchPendingTrades()
//       setPendingTrades(updatedPendingTrades)

//       // Update stats
//       setUserStats((prev) => ({
//         ...prev,
//         pendingRequests: updatedPendingTrades.length,
//         completedTrades: action === "accept" ? prev.completedTrades + 1 : prev.completedTrades,
//       }))
//     } catch (error) {
//       console.error(`Error ${action}ing trade request:`, error)
//       setNotification({
//         message: `Failed to ${action} trade request. Please try again.`,
//         type: "error",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         setNotification({
//           message: "Unauthorized! Redirecting to login.",
//           type: "error",
//         })
//         setTimeout(() => {
//           navigate("/login")
//         }, 2000)
//         return
//       }

//       const response = await axios.put(
//         "http://localhost:8080/api/update-profile",
//         {
//           username,
//           email,
//           currentPassword,
//           newPassword,
//         },
//         { headers: { Authorization: `Bearer ${token}` } },
//       )

//       if (response.status === 200) {
//         setNotification({
//           message: "Profile updated successfully!",
//           type: "success",
//         })

//         // Clear form fields
//         setCurrentPassword("")
//         setNewPassword("")
//       } else {
//         setNotification({
//           message: response.data.message || "Update failed.",
//           type: "error",
//         })
//       }

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     } catch (error) {
//       console.error("Error updating profile:", error)
//       setNotification({
//         message: "Failed to update profile.",
//         type: "error",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     }
//   }

//   const handleUpdateField = async (field, value) => {
//     if (!value) {
//       setNotification({
//         message: `${field} cannot be empty.`,
//         type: "error",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//       return
//     }

//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         setNotification({
//           message: "Unauthorized! Redirecting to login.",
//           type: "error",
//         })
//         setTimeout(() => {
//           navigate("/login")
//         }, 2000)
//         return
//       }

//       const response = await axios.put(
//         "http://localhost:8080/api/update-profile",
//         { field, value },
//         { headers: { Authorization: `Bearer ${token}` } },
//       )

//       if (response.status === 200) {
//         setNotification({
//           message: `${field} updated successfully!`,
//           type: "success",
//         })
//       } else {
//         setNotification({
//           message: response.data.message || "Update failed.",
//           type: "error",
//         })
//       }

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     } catch (error) {
//       console.error(`Error updating ${field}:`, error)
//       setNotification({
//         message: `Failed to update ${field}.`,
//         type: "error",
//       })

//       setTimeout(() => {
//         setNotification(null)
//       }, 3000)
//     }
//   }

//   const getSeasonColor = (season) => {
//     switch (season?.toLowerCase()) {
//       case "spring":
//         return "#a8e6cf"
//       case "summer":
//         return "#ffdfba"
//       case "autumn":
//         return "#ffb7b2"
//       case "winter":
//         return "#b5c9df"
//       default:
//         return "#a0a0a0"
//     }
//   }

//   const getSeasonIcon = (season) => {
//     switch (season?.toLowerCase()) {
//       case "spring":
//         return "🌱"
//       case "summer":
//         return "☀️"
//       case "autumn":
//         return "🍂"
//       case "winter":
//         return "❄️"
//       default:
//         return "🌐"
//     }
//   }

//   if (loading) {
//     return (
//       <div style={profilePageStyle}>
//         <style dangerouslySetInnerHTML={{ __html: keyframes }} />
//         <div style={overlayStyle}></div>
//         <TabsComponent />
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//             width: "100%",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "2rem",
//               borderRadius: "12px",
//               backgroundColor: "rgba(255, 255, 255, 0.1)",
//               backdropFilter: "blur(10px)",
//               boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <div
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 border: "3px solid rgba(255, 255, 255, 0.3)",
//                 borderRadius: "50%",
//                 borderTopColor: "#ffffff",
//                 animation: "spin 1s linear infinite",
//                 marginBottom: "1rem",
//               }}
//             ></div>
//             <h2 style={{ color: "#fff", margin: "0" }}>Loading Profile...</h2>
//             <style>{`
//                             @keyframes spin {
//                                 0% { transform: rotate(0deg); }
//                                 100% { transform: rotate(360deg); }
//                             }
//                         `}</style>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div style={profilePageStyle}>
//       <style dangerouslySetInnerHTML={{ __html: keyframes }} />
//       <div style={overlayStyle}></div>
//       <TabsComponent />
//       <div style={{ display: "flex", paddingTop: "64px" }}>
//         <Sidebar onManageProfileClick={() => setShowEditProfile(true)} />
//         <div style={contentStyle}>
//           {!showEditProfile ? (
//             <>
//               {/* Profile Stats Section */}
//               <div
//                 style={{
//                   width: "100%",
//                   display: "flex",
//                   justifyContent: "center",
//                   marginBottom: "2rem",
//                   animation: "fadeIn 0.5s ease-out",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     justifyContent: "center",
//                     gap: "1.5rem",
//                     width: "100%",
//                     maxWidth: "1000px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       flex: "1 1 200px",
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "1.5rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "translateY(-5px)"
//                       e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)"
//                       e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
//                     }}
//                   >
//                     <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📦</div>
//                     <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "400" }}>Total Products</h3>
//                     <p style={{ margin: "0", fontSize: "2rem", fontWeight: "600" }}>{userStats.totalProducts}</p>
//                   </div>

//                   <div
//                     style={{
//                       flex: "1 1 200px",
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "1.5rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "translateY(-5px)"
//                       e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)"
//                       e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
//                     }}
//                   >
//                     <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>⏳</div>
//                     <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "400" }}>Pending Requests</h3>
//                     <p style={{ margin: "0", fontSize: "2rem", fontWeight: "600" }}>{userStats.pendingRequests}</p>
//                   </div>

//                   <div
//                     style={{
//                       flex: "1 1 200px",
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "1.5rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "translateY(-5px)"
//                       e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)"
//                       e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
//                     }}
//                   >
//                     <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🤝</div>
//                     <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "400" }}>Completed Trades</h3>
//                     <p style={{ margin: "0", fontSize: "2rem", fontWeight: "600" }}>{userStats.completedTrades}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Tab Navigation */}
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   marginBottom: "2rem",
//                   width: "100%",
//                   animation: "fadeIn 0.6s ease-out",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     backgroundColor: "rgba(255, 255, 255, 0.1)",
//                     backdropFilter: "blur(10px)",
//                     borderRadius: "30px",
//                     padding: "0.5rem",
//                     boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                   }}
//                 >
//                   <button
//                     onClick={() => setActiveTab("products")}
//                     style={{
//                       padding: "0.75rem 1.5rem",
//                       borderRadius: "25px",
//                       border: "none",
//                       backgroundColor: activeTab === "products" ? "rgba(255, 255, 255, 0.2)" : "transparent",
//                       color: "#fff",
//                       fontSize: "1rem",
//                       fontWeight: activeTab === "products" ? "500" : "400",
//                       cursor: "pointer",
//                       transition: "all 0.3s ease",
//                     }}
//                   >
//                     Your Products
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("trades")}
//                     style={{
//                       padding: "0.75rem 1.5rem",
//                       borderRadius: "25px",
//                       border: "none",
//                       backgroundColor: activeTab === "trades" ? "rgba(255, 255, 255, 0.2)" : "transparent",
//                       color: "#fff",
//                       fontSize: "1rem",
//                       fontWeight: activeTab === "trades" ? "500" : "400",
//                       cursor: "pointer",
//                       transition: "all 0.3s ease",
//                     }}
//                   >
//                     Pending Trades
//                   </button>
//                 </div>
//               </div>

//               {/* Content based on active tab */}
//               <div
//                 style={{
//                   width: "100%",
//                   maxWidth: "1200px",
//                   animation: activeTab === "products" ? "fadeInUp 0.7s ease-out" : "fadeInUp 0.7s ease-out",
//                   display: activeTab === "products" ? "block" : "none",
//                 }}
//               >
//                 <h2
//                   style={{
//                     fontSize: "2rem",
//                     fontWeight: "300",
//                     marginBottom: "1.5rem",
//                     textAlign: "center",
//                     color: "#fff",
//                   }}
//                 >
//                   Your Products
//                 </h2>

//                 {products.length > 0 ? (
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//                       gap: "1.5rem",
//                       padding: "0 1rem",
//                     }}
//                   >
//                     {products.map((product, index) => (
//                       <div
//                         key={product.id}
//                         style={{
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           backdropFilter: "blur(10px)",
//                           borderRadius: "12px",
//                           overflow: "hidden",
//                           boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           transition: "all 0.3s ease",
//                           animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
//                           transform: hoveredRow === product.id ? "translateY(-5px)" : "translateY(0)",
//                           boxShadow:
//                             hoveredRow === product.id
//                               ? "0 12px 25px rgba(0, 0, 0, 0.15)"
//                               : "0 8px 20px rgba(0, 0, 0, 0.1)",
//                         }}
//                         onMouseEnter={() => setHoveredRow(product.id)}
//                         onMouseLeave={() => setHoveredRow(null)}
//                         onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
//                       >
//                         <div
//                           style={{
//                             height: "180px",
//                             position: "relative",
//                             overflow: "hidden",
//                           }}
//                         >
//                           {product.product_image ? (
//                             <img
//                               src={`http://localhost:8080/${product.product_image}`}
//                               alt={product.product_name}
//                               style={{
//                                 width: "100%",
//                                 height: "100%",
//                                 objectFit: "cover",
//                                 transition: "transform 0.5s ease",
//                                 transform: hoveredRow === product.id ? "scale(1.05)" : "scale(1)",
//                               }}
//                             />
//                           ) : (
//                             <div
//                               style={{
//                                 width: "100%",
//                                 height: "100%",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 backgroundColor: "rgba(0, 0, 0, 0.1)",
//                                 fontSize: "3rem",
//                               }}
//                             >
//                               {getSeasonIcon(product.suitable_season)}
//                             </div>
//                           )}

//                           <div
//                             style={{
//                               position: "absolute",
//                               top: "1rem",
//                               right: "1rem",
//                               backgroundColor: getSeasonColor(product.suitable_season),
//                               color: "#fff",
//                               padding: "0.4rem 0.8rem",
//                               borderRadius: "20px",
//                               fontSize: "0.8rem",
//                               fontWeight: "500",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "0.3rem",
//                             }}
//                           >
//                             {getSeasonIcon(product.suitable_season)} {product.suitable_season}
//                           </div>
//                         </div>

//                         <div style={{ padding: "1.5rem" }}>
//                           <h3
//                             style={{
//                               margin: "0 0 0.5rem 0",
//                               fontSize: "1.2rem",
//                               fontWeight: "500",
//                               color: "#fff",
//                             }}
//                           >
//                             {product.product_name}
//                           </h3>

//                           <p
//                             style={{
//                               margin: "0 0 1rem 0",
//                               fontSize: "0.9rem",
//                               color: "rgba(255, 255, 255, 0.8)",
//                               display: expandedProduct === product.id ? "block" : "-webkit-box",
//                               WebkitLineClamp: "2",
//                               WebkitBoxOrient: "vertical",
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               lineHeight: "1.5",
//                             }}
//                           >
//                             {product.product_description}
//                           </p>

//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "space-between",
//                               alignItems: "center",
//                               marginTop: "1rem",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                                 color: "rgba(255, 255, 255, 0.7)",
//                                 fontSize: "0.85rem",
//                               }}
//                             >
//                               <svg
//                                 width="16"
//                                 height="16"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <circle cx="12" cy="12" r="10"></circle>
//                                 <polyline points="12 6 12 12 16 14"></polyline>
//                               </svg>
//                               {getTimeSinceListed(product.created_at)}
//                             </div>

//                             <button
//                               style={{
//                                 backgroundColor: "transparent",
//                                 border: "none",
//                                 color: "rgba(255, 255, 255, 0.7)",
//                                 cursor: "pointer",
//                                 fontSize: "0.85rem",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.3rem",
//                                 padding: "0.3rem 0.6rem",
//                                 borderRadius: "4px",
//                                 transition: "all 0.2s ease",
//                               }}
//                               onMouseEnter={(e) => {
//                                 e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                               }}
//                               onMouseLeave={(e) => {
//                                 e.currentTarget.style.backgroundColor = "transparent"
//                               }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 setExpandedProduct(expandedProduct === product.id ? null : product.id)
//                               }}
//                             >
//                               {expandedProduct === product.id ? (
//                                 <>
//                                   <svg
//                                     width="16"
//                                     height="16"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                   >
//                                     <polyline points="18 15 12 9 6 15"></polyline>
//                                   </svg>
//                                   Less
//                                 </>
//                               ) : (
//                                 <>
//                                   <svg
//                                     width="16"
//                                     height="16"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                   >
//                                     <polyline points="6 9 12 15 18 9"></polyline>
//                                   </svg>
//                                   More
//                                 </>
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div
//                     style={{
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "3rem 2rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       margin: "0 1rem",
//                     }}
//                   >
//                     <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📦</div>
//                     <h3 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "300", marginBottom: "1rem" }}>
//                       You haven't listed any products yet
//                     </h3>
//                     <p style={{ color: "rgba(255, 255, 255, 0.8)", maxWidth: "500px", margin: "0 auto 1.5rem" }}>
//                       Start listing your seasonal products to trade with others in the community.
//                     </p>
//                     <button
//                       onClick={() => navigate("/dashboard")}
//                       style={{
//                         padding: "0.8rem 1.5rem",
//                         backgroundColor: "rgba(255, 255, 255, 0.2)",
//                         color: "#fff",
//                         border: "none",
//                         borderRadius: "30px",
//                         fontSize: "1rem",
//                         cursor: "pointer",
//                         transition: "all 0.3s ease",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
//                         e.currentTarget.style.transform = "translateY(-2px)"
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
//                         e.currentTarget.style.transform = "translateY(0)"
//                       }}
//                     >
//                       Go to Dashboard
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Pending Trades Tab */}
//               <div
//                 style={{
//                   width: "100%",
//                   maxWidth: "1200px",
//                   animation: "fadeInUp 0.7s ease-out",
//                   display: activeTab === "trades" ? "block" : "none",
//                 }}
//               >
//                 <h2
//                   style={{
//                     fontSize: "2rem",
//                     fontWeight: "300",
//                     marginBottom: "1.5rem",
//                     textAlign: "center",
//                     color: "#fff",
//                   }}
//                 >
//                   Pending Trade Requests
//                 </h2>

//                 {pendingTrades.length > 0 ? (
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//                       gap: "1.5rem",
//                       padding: "0 1rem",
//                     }}
//                   >
//                     {pendingTrades.map((trade, index) => (
//                       <div
//                         key={trade.id}
//                         style={{
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           backdropFilter: "blur(10px)",
//                           borderRadius: "12px",
//                           overflow: "hidden",
//                           boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           transition: "all 0.3s ease",
//                           animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
//                           padding: "1.5rem",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.transform = "translateY(-5px)"
//                           e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.15)"
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = "translateY(0)"
//                           e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
//                         }}
//                       >
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "1rem",
//                             marginBottom: "1.5rem",
//                           }}
//                         >
//                           <div
//                             style={{
//                               width: "50px",
//                               height: "50px",
//                               borderRadius: "50%",
//                               backgroundColor: "rgba(255, 255, 255, 0.2)",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               fontSize: "1.5rem",
//                             }}
//                           >
//                             🔄
//                           </div>
//                           <div>
//                             <h3
//                               style={{
//                                 margin: "0 0 0.25rem 0",
//                                 fontSize: "1.2rem",
//                                 fontWeight: "500",
//                                 color: "#fff",
//                               }}
//                             >
//                               Trade Request #{trade.id}
//                             </h3>
//                             <p
//                               style={{
//                                 margin: "0",
//                                 fontSize: "0.9rem",
//                                 color: "rgba(255, 255, 255, 0.7)",
//                               }}
//                             >
//                               Item ID: {trade.requested_item_id}
//                             </p>
//                           </div>
//                         </div>

//                         <div
//                           style={{
//                             backgroundColor: "rgba(255, 255, 255, 0.05)",
//                             borderRadius: "8px",
//                             padding: "1rem",
//                             marginBottom: "1.5rem",
//                           }}
//                         >
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "space-between",
//                               marginBottom: "0.5rem",
//                             }}
//                           >
//                             <span style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.9rem" }}>Coins Offered</span>
//                             <span
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                                 color: "#fff",
//                                 fontWeight: "600",
//                                 fontSize: "1.2rem",
//                               }}
//                             >
//                               <svg
//                                 width="20"
//                                 height="20"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="#FFC107"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <circle cx="12" cy="12" r="10"></circle>
//                                 <circle cx="12" cy="12" r="3"></circle>
//                               </svg>
//                               {trade.coins_offered}
//                             </span>
//                           </div>
//                         </div>

//                         <div
//                           style={{
//                             display: "flex",
//                             gap: "1rem",
//                           }}
//                         >
//                           <button
//                             onClick={() => handleTradeRequestAction(trade.id, "accept")}
//                             style={{
//                               flex: 1,
//                               padding: "0.8rem",
//                               backgroundColor: "rgba(76, 175, 80, 0.2)",
//                               color: "#4CAF50",
//                               border: "1px solid rgba(76, 175, 80, 0.3)",
//                               borderRadius: "8px",
//                               fontSize: "0.9rem",
//                               fontWeight: "500",
//                               cursor: "pointer",
//                               transition: "all 0.3s ease",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               gap: "0.5rem",
//                             }}
//                             onMouseEnter={(e) => {
//                               e.currentTarget.style.backgroundColor = "rgba(76, 175, 80, 0.3)"
//                             }}
//                             onMouseLeave={(e) => {
//                               e.currentTarget.style.backgroundColor = "rgba(76, 175, 80, 0.2)"
//                             }}
//                           >
//                             <svg
//                               width="16"
//                               height="16"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <polyline points="20 6 9 17 4 12"></polyline>
//                             </svg>
//                             Accept
//                           </button>

//                           <button
//                             onClick={() => handleTradeRequestAction(trade.id, "decline")}
//                             style={{
//                               flex: 1,
//                               padding: "0.8rem",
//                               backgroundColor: "rgba(244, 67, 54, 0.2)",
//                               color: "#f44336",
//                               border: "1px solid rgba(244, 67, 54, 0.3)",
//                               borderRadius: "8px",
//                               fontSize: "0.9rem",
//                               fontWeight: "500",
//                               cursor: "pointer",
//                               transition: "all 0.3s ease",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               gap: "0.5rem",
//                             }}
//                             onMouseEnter={(e) => {
//                               e.currentTarget.style.backgroundColor = "rgba(244, 67, 54, 0.3)"
//                             }}
//                             onMouseLeave={(e) => {
//                               e.currentTarget.style.backgroundColor = "rgba(244, 67, 54, 0.2)"
//                             }}
//                           >
//                             <svg
//                               width="16"
//                               height="16"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <line x1="18" y1="6" x2="6" y2="18"></line>
//                               <line x1="6" y1="6" x2="18" y2="18"></line>
//                             </svg>
//                             Decline
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div
//                     style={{
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                       backdropFilter: "blur(10px)",
//                       borderRadius: "12px",
//                       padding: "3rem 2rem",
//                       textAlign: "center",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       margin: "0 1rem",
//                     }}
//                   >
//                     <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
//                     <h3 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "300", marginBottom: "1rem" }}>
//                       No pending trade requests
//                     </h3>
//                     <p style={{ color: "rgba(255, 255, 255, 0.8)", maxWidth: "500px", margin: "0 auto" }}>
//                       When someone wants to trade for one of your products, the request will appear here.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 animation: "scaleIn 0.5s ease-out",
//               }}
//             >
//               <div
//                 style={{
//                   width: "100%",
//                   maxWidth: "500px",
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                   backdropFilter: "blur(10px)",
//                   borderRadius: "12px",
//                   padding: "2.5rem",
//                   boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
//                   border: "1px solid rgba(255, 255, 255, 0.1)",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginBottom: "2rem",
//                   }}
//                 >
//                   <h2
//                     style={{
//                       fontSize: "1.8rem",
//                       fontWeight: "300",
//                       color: "#fff",
//                       margin: 0,
//                     }}
//                   >
//                     Edit Your Profile
//                   </h2>

//                   <button
//                     onClick={() => setShowEditProfile(false)}
//                     style={{
//                       backgroundColor: "transparent",
//                       border: "1px solid rgba(255, 255, 255, 0.3)",
//                       borderRadius: "30px",
//                       padding: "0.6rem 1.2rem",
//                       color: "#fff",
//                       fontSize: "0.9rem",
//                       cursor: "pointer",
//                       transition: "all 0.3s ease",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "0.5rem",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.backgroundColor = "transparent"
//                     }}
//                   >
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <line x1="19" y1="12" x2="5" y2="12"></line>
//                       <polyline points="12 19 5 12 12 5"></polyline>
//                     </svg>
//                     Back
//                   </button>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                   <div style={{ marginBottom: "1.5rem" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         marginBottom: "0.5rem",
//                         color: "rgba(255, 255, 255, 0.8)",
//                         fontSize: "0.9rem",
//                       }}
//                     >
//                       Username
//                     </label>
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "0.75rem",
//                       }}
//                     >
//                       <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         style={{
//                           flex: 1,
//                           padding: "0.8rem 1rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.05)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "1rem",
//                           outline: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
//                         }}
//                         placeholder="Enter username"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleUpdateField("username", username)}
//                         style={{
//                           padding: "0.8rem 1.2rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "0.9rem",
//                           cursor: "pointer",
//                           transition: "all 0.3s ease",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>

//                   <div style={{ marginBottom: "1.5rem" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         marginBottom: "0.5rem",
//                         color: "rgba(255, 255, 255, 0.8)",
//                         fontSize: "0.9rem",
//                       }}
//                     >
//                       Email
//                     </label>
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "0.75rem",
//                       }}
//                     >
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         style={{
//                           flex: 1,
//                           padding: "0.8rem 1rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.05)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "1rem",
//                           outline: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
//                         }}
//                         placeholder="Enter email"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleUpdateField("email", email)}
//                         style={{
//                           padding: "0.8rem 1.2rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "0.9rem",
//                           cursor: "pointer",
//                           transition: "all 0.3s ease",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>

//                   <div style={{ marginBottom: "1.5rem" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         marginBottom: "0.5rem",
//                         color: "rgba(255, 255, 255, 0.8)",
//                         fontSize: "0.9rem",
//                       }}
//                     >
//                       New Password
//                     </label>
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "0.75rem",
//                       }}
//                     >
//                       <input
//                         type="password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         style={{
//                           flex: 1,
//                           padding: "0.8rem 1rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.05)",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "1rem",
//                           outline: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"
//                           e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
//                         }}
//                         placeholder="Enter new password"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleUpdateField("password", newPassword)}
//                         style={{
//                           padding: "0.8rem 1.2rem",
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontSize: "0.9rem",
//                           cursor: "pointer",
//                           transition: "all 0.3s ease",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
//                         }}
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Notification */}
//       {notification && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "2rem",
//             right: "2rem",
//             backgroundColor: notification.type === "success" ? "rgba(76, 175, 80, 0.9)" : "rgba(244, 67, 54, 0.9)",
//             color: "#fff",
//             padding: "1rem 1.5rem",
//             borderRadius: "8px",
//             boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
//             zIndex: 1000,
//             display: "flex",
//             alignItems: "center",
//             gap: "0.75rem",
//             animation: "fadeInUp 0.3s ease-out",
//           }}
//         >
//           {notification.type === "success" ? (
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//               <polyline points="22 4 12 14.01 9 11.01"></polyline>
//             </svg>
//           ) : (
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="12" cy="12" r="10"></circle>
//               <line x1="12" y1="8" x2="12" y2="12"></line>
//               <line x1="12" y1="16" x2="12.01" y2="16"></line>
//             </svg>
//           )}
//           {notification.message}
//         </div>
//       )}

//       <Footer />
//     </div>
//   )
// }

// // Styles
// const profilePageStyle = {
//   backgroundImage:
//     "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundAttachment: "fixed",
//   minHeight: "100vh",
//   display: "flex",
//   flexDirection: "column",
//   position: "relative",
//   zIndex: 1,
// }

// const overlayStyle = {
//   position: "absolute",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   zIndex: -1,
// }

// const contentStyle = {
//   marginLeft: "270px",
//   flex: 1,
//   padding: "20px",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   color: "#fff",
//   textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
//   fontFamily: "'Poppins', sans-serif",
// }

// export default Profile

