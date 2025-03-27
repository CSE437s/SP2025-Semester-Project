// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import TabsComponent from "./Tabs";
// import Footer from "./Footer";

// function ProductPage() {
//     const { season } = useParams();
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [coinAmount, setCoinAmount] = useState(0);

//     const handleTradeClick = async (product) => {
//         setSelectedProduct(product);
//         setShowModal(true);
    
//         try {
//             const response = await axios.get('http://localhost:8080/api/ebay', {
//                 params: {
//                     keywords: product.product_name
//                 }
//             });
    
//             console.log('eBay API Response:', response.data);
    
//             // Handle the simplified response
//             if (response.data.price) {
//                 setSelectedProduct(prevProduct => ({
//                     ...prevProduct,
//                     ebayPrice: response.data.price
//                 }));
//             } else {
//                 console.log('No price found for:', product.product_name);
//             }
//         } catch (error) {
//             console.error('Error fetching eBay product price:', error);
//         }
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//         setSelectedProduct(null);
//         setCoinAmount(0);
//     };

//     const handleTradeSubmit = async () => {
//         try {
//             const token = localStorage.getItem('token'); // Retrieve token for authentication
//             const receiverId = selectedProduct.owner_id; // ID of the item owner
//             const requestedItemId = selectedProduct.id; // ID of the item being requested
//             const coinsOffered = coinAmount; // Number of coins offered
    
//             // Log the payload for debugging
//             console.log('Sending payload:', {
//                 receiverId,
//                 requestedItemId,
//                 coinsOffered,
//             });
    
//             const response = await axios.post(
//                 'http://localhost:8080/api/trade/request',
//                 {
//                     receiverId,
//                     requestedItemId,
//                     coinsOffered,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Send token for authentication
//                     },
//                 }
//             );
    
//             alert(`Trade request submitted for ${selectedProduct.product_name} with ${coinAmount} coins.`);
//             handleCloseModal();
//             console.log('Trade request created successfully:', response.data);
//         } catch (error) {
//             console.error('Error submitting trade request:', error);
//             if (error.response && error.response.data.error) {
//                 alert(error.response.data.error); // Display the error message from the backend
//             } else {
//                 alert('Failed to submit trade request. Please try again.');
//             }
//         }
//     };

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     alert("Unauthorized! Redirecting to login.");
//                     navigate("/login");
//                     return;
//                 }

//                 const response = await axios.get(`http://localhost:8080/api/products/${season}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 setProducts(response.data);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//                 alert("Failed to fetch products. Please try again.");
//                 navigate("/login");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, [season, navigate]);

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div>
//             <TabsComponent />
//             <div style={{ paddingTop: "64px", height:"100%",
//                 backgroundImage: "url('https://images.unsplash.com/photo-1735822081256-bc72ef6cbe59?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
//                 display: "flex", flexDirection: "row" }}>
//                 <div style={{ width: "100%", padding: "40px" }}>
//                     <h2>{season.charAt(0).toUpperCase() + season.slice(1)} Products</h2>
//                     <p>Browse the best products available for {season}.</p>
//                 </div>

//                 <div style={{ width: "70%", padding: "20px" }}>
//                     <div style={{ marginBottom: "20px", textAlign: "center" }}>
//                         <h2>All {season.charAt(0).toUpperCase() + season.slice(1)} Products</h2>
//                     </div>
//                     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
//                         {products.length > 0 ? (
//                             products.map((product) => (
//                                 <div key={product.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", textAlign: "center", backgroundColor: "#f9f9f9" }}>
//                                     {product.product_image && (
//                                         <img
//                                             src={`http://localhost:8080/${product.product_image}`}
//                                             alt={product.product_name}
//                                             style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }}
//                                         />
//                                     )}
//                                     <h3>{product.product_name}</h3>
//                                     <p style={{ fontSize: "14px", color: "#555" }}>
//                                         <strong>Description:</strong> {product.product_description}
//                                     </p>
//                                     <button
//                                         onClick={() => handleTradeClick(product)}
//                                         style={{
//                                             marginTop: "10px",
//                                             padding: "10px 20px",
//                                             backgroundColor: "#4CAF50",
//                                             color: "white",
//                                             border: "none",
//                                             borderRadius: "5px",
//                                             cursor: "pointer",
//                                         }}
//                                     >
//                                         Trade
//                                     </button>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No products found for {season}.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {showModal && (
//                 <div
//                     style={{
//                         position: "fixed",
//                         top: 0,
//                         left: 0,
//                         width: "100%",
//                         height: "100%",
//                         backgroundColor: "rgba(0,0,0,0.5)",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                     }}
//                 >
//                     <div
//                         style={{
//                             backgroundColor: "white",
//                             padding: "30px",
//                             borderRadius: "8px",
//                             width: "400px",
//                             textAlign: "center",
//                         }}
//                     >
//                         <h2>Trade Request</h2>
//                         <p>Trading for: <strong>{selectedProduct?.product_name}</strong></p>
//                             {selectedProduct?.ebayPrice && (
//                                 <p>Average eBay Price: <strong>${selectedProduct.ebayPrice}</strong></p>
//                             )}
//                         <p>Enter the number of coins you would like to trade:</p>
//                         <input
//                             type="text" // Keep type as text for custom validation
//                             value={coinAmount}
//                             onChange={(e) => {
//                                 const value = e.target.value;
//                                 // Check if the value is a positive integer
//                                 if (/^[1-9]\d*$|^0$/.test(value) || value === "") {
//                                     setCoinAmount(value);
//                                 }
//                             }}
//                             style={{
//                                 width: "100%",
//                                 padding: "10px",
//                                 margin: "10px 0",
//                                 borderRadius: "5px",
//                                 border: "1px solid #ddd",
//                             }}
//                             min="0"
//                         />
//                         <button
//                             onClick={handleTradeSubmit}
//                             style={{
//                                 marginTop: "10px",
//                                 padding: "10px 20px",
//                                 backgroundColor: "#4CAF50",
//                                 color: "white",
//                                 border: "none",
//                                 borderRadius: "5px",
//                                 cursor: "pointer",
//                                 width: "100%",
//                             }}
//                         >
//                             Submit Trade
//                         </button>
//                         <button
//                             onClick={handleCloseModal}
//                             style={{
//                                 marginTop: "10px",
//                                 padding: "10px 20px",
//                                 backgroundColor: "#f44336",
//                                 color: "white",
//                                 border: "none",
//                                 borderRadius: "5px",
//                                 cursor: "pointer",
//                                 width: "100%",
//                             }}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         <Footer/>
//         </div>
        
//     );
// }

// export default ProductPage;
// "use client"

// import { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import axios from "axios"
// import TabsComponent from "./Tabs"
// import Footer from "./Footer"

// // Season-specific styling
// const seasonStyles = {
//   spring: {
//     primary: "#a8e6cf",
//     secondary: "#55b895",
//     gradient: "linear-gradient(135deg, rgba(168, 230, 207, 0.8), rgba(85, 184, 149, 0.8))",
//     bgImage:
//       "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
//     icon: "🌱",
//     description: "Refresh your style with our spring collection. Perfect for the season of renewal and growth.",
//   },
//   summer: {
//     primary: "#ffdfba",
//     secondary: "#ffb347",
//     gradient: "linear-gradient(135deg, rgba(255, 223, 186, 0.8), rgba(255, 179, 71, 0.8))",
//     bgImage:
//       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
//     icon: "☀️",
//     description: "Stay cool with our summer essentials. Designed for those hot days and warm nights.",
//   },
//   autumn: {
//     primary: "#ffb7b2",
//     secondary: "#e67a73",
//     gradient: "linear-gradient(135deg, rgba(255, 183, 178, 0.8), rgba(230, 122, 115, 0.8))",
//     bgImage:
//       "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
//     icon: "🍂",
//     description: "Embrace the change with autumn favorites. Perfect for the colorful transition season.",
//   },
//   winter: {
//     primary: "#b5c9df",
//     secondary: "#7d9bc1",
//     gradient: "linear-gradient(135deg, rgba(181, 201, 223, 0.8), rgba(125, 155, 193, 0.8))",
//     bgImage:
//       "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
//     icon: "❄️",
//     description: "Stay warm with our winter collection. Designed for comfort during the coldest months.",
//   },
// }

// function ProductPage() {
//   const { season } = useParams()
//   const navigate = useNavigate()
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedProduct, setSelectedProduct] = useState(null)
//   const [coinAmount, setCoinAmount] = useState(0)
//   const [activeFilter, setActiveFilter] = useState("all")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortOption, setSortOption] = useState("default")
//   const [hoveredProduct, setHoveredProduct] = useState(null)
//   const [modalAnimation, setModalAnimation] = useState("")

//   // Get season-specific styling
//   const currentSeasonStyle = seasonStyles[season] || seasonStyles.spring

//   const handleTradeClick = async (product) => {
//     setSelectedProduct(product)
//     setModalAnimation("scale-in")
//     setShowModal(true)

//     try {
//       const response = await axios.get("http://localhost:8080/api/ebay", {
//         params: {
//           keywords: product.product_name,
//         },
//       })

//       console.log("eBay API Response:", response.data)

//       // Handle the simplified response
//       if (response.data.price) {
//         setSelectedProduct((prevProduct) => ({
//           ...prevProduct,
//           ebayPrice: response.data.price,
//         }))
//       } else {
//         console.log("No price found for:", product.product_name)
//       }
//     } catch (error) {
//       console.error("Error fetching eBay product price:", error)
//     }
//   }

//   const handleCloseModal = () => {
//     setModalAnimation("scale-out")
//     setTimeout(() => {
//       setShowModal(false)
//       setSelectedProduct(null)
//       setCoinAmount(0)
//     }, 300)
//   }

//   const handleTradeSubmit = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       const receiverId = selectedProduct.owner_id
//       const requestedItemId = selectedProduct.id
//       const coinsOffered = coinAmount

//       console.log("Sending payload:", {
//         receiverId,
//         requestedItemId,
//         coinsOffered,
//       })

//       const response = await axios.post(
//         "http://localhost:8080/api/trade/request",
//         {
//           receiverId,
//           requestedItemId,
//           coinsOffered,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       )

//       alert(`Trade request submitted for ${selectedProduct.product_name} with ${coinAmount} coins.`)
//       handleCloseModal()
//       console.log("Trade request created successfully:", response.data)
//     } catch (error) {
//       console.error("Error submitting trade request:", error)
//       if (error.response && error.response.data.error) {
//         alert(error.response.data.error)
//       } else {
//         alert("Failed to submit trade request. Please try again.")
//       }
//     }
//   }

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem("token")
//         if (!token) {
//           alert("Unauthorized! Redirecting to login.")
//           navigate("/login")
//           return
//         }

//         const response = await axios.get(`http://localhost:8080/api/products/${season}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })

//         setProducts(response.data)
//       } catch (error) {
//         console.error("Error fetching products:", error)
//         alert("Failed to fetch products. Please try again.")
//         navigate("/login")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [season, navigate])

//   // Filter and sort products
//   const filteredProducts = products.filter((product) => {
//     if (searchTerm && !product.product_name.toLowerCase().includes(searchTerm.toLowerCase())) {
//       return false
//     }

//     if (activeFilter !== "all") {
//       // This is a placeholder - you would need to add categories to your products
//       return product.category === activeFilter
//     }

//     return true
//   })

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortOption === "name-asc") {
//       return a.product_name.localeCompare(b.product_name)
//     } else if (sortOption === "name-desc") {
//       return b.product_name.localeCompare(a.product_name)
//     } else if (sortOption === "newest") {
//       return new Date(b.created_at) - new Date(a.created_at)
//     } else if (sortOption === "oldest") {
//       return new Date(a.created_at) - new Date(b.created_at)
//     }
//     return 0
//   })

//   // Animation keyframes
//   const keyframes = `
//     @keyframes fadeIn {
//       from { opacity: 0; transform: translateY(20px); }
//       to { opacity: 1; transform: translateY(0); }
//     }
    
//     @keyframes scaleIn {
//       from { opacity: 0; transform: scale(0.9); }
//       to { opacity: 1; transform: scale(1); }
//     }
    
//     @keyframes scaleOut {
//       from { opacity: 1; transform: scale(1); }
//       to { opacity: 0; transform: scale(0.9); }
//     }
    
//     @keyframes shimmer {
//       0% { background-position: -1000px 0; }
//       100% { background-position: 1000px 0; }
//     }
    
//     @keyframes float {
//       0% { transform: translateY(0px); }
//       50% { transform: translateY(-10px); }
//       100% { transform: translateY(0px); }
//     }
//   `

//   if (loading) {
//     return (
//       <div>
//         <TabsComponent />
//         <div
//           style={{
//             paddingTop: "64px",
//             height: "100vh",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             background: `url(${currentSeasonStyle.bgImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             position: "relative",
//           }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               backgroundColor: "rgba(0, 0, 0, 0.5)",
//               zIndex: 1,
//             }}
//           ></div>

//           <div
//             style={{
//               position: "relative",
//               zIndex: 2,
//               textAlign: "center",
//               padding: "2rem",
//               borderRadius: "12px",
//               backgroundColor: "rgba(255, 255, 255, 0.9)",
//               backdropFilter: "blur(10px)",
//               boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <div
//               style={{
//                 display: "inline-block",
//                 width: "50px",
//                 height: "50px",
//                 border: `3px solid ${currentSeasonStyle.primary}`,
//                 borderRadius: "50%",
//                 borderTopColor: currentSeasonStyle.secondary,
//                 animation: "spin 1s linear infinite",
//                 marginBottom: "1rem",
//               }}
//             ></div>
//             <h2 style={{ color: "#333", margin: "0" }}>
//               Loading {season.charAt(0).toUpperCase() + season.slice(1)} Products...
//             </h2>
//             <style>{`
//               @keyframes spin {
//                 0% { transform: rotate(0deg); }
//                 100% { transform: rotate(360deg); }
//               }
//             `}</style>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//       <style dangerouslySetInnerHTML={{ __html: keyframes }} />
//       <TabsComponent />

//       {/* Hero Section */}
//       <div
//         style={{
//           paddingTop: "64px",
//           height: "50vh",
//           backgroundImage: `url(${currentSeasonStyle.bgImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed",
//           position: "relative",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           textAlign: "center",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: currentSeasonStyle.gradient,
//             zIndex: 1,
//           }}
//         ></div>

//         <div
//           style={{
//             position: "relative",
//             zIndex: 2,
//             maxWidth: "800px",
//             padding: "0 2rem",
//           }}
//         >
//           <div
//             style={{
//               fontSize: "4rem",
//               marginBottom: "1rem",
//               animation: "float 3s ease-in-out infinite",
//             }}
//           >
//             {currentSeasonStyle.icon}
//           </div>
//           <h1
//             style={{
//               fontSize: "3rem",
//               fontWeight: "300",
//               color: "white",
//               marginBottom: "1rem",
//               textShadow: "0 2px 10px rgba(0,0,0,0.2)",
//               animation: "fadeIn 1s ease-out",
//             }}
//           >
//             {season.charAt(0).toUpperCase() + season.slice(1)} Collection
//           </h1>
//           <p
//             style={{
//               fontSize: "1.2rem",
//               color: "white",
//               maxWidth: "600px",
//               margin: "0 auto",
//               textShadow: "0 1px 5px rgba(0,0,0,0.2)",
//               animation: "fadeIn 1.5s ease-out",
//             }}
//           >
//             {currentSeasonStyle.description}
//           </p>
//         </div>
//       </div>

//       {/* Products Section */}
//       <div
//         style={{
//           padding: "3rem 2rem",
//           maxWidth: "1200px",
//           margin: "0 auto",
//         }}
//       >
//         {/* Filters and Search */}
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "2rem",
//             gap: "1rem",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               backgroundColor: "white",
//               borderRadius: "30px",
//               padding: "0.5rem 1rem",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//               width: "100%",
//               maxWidth: "400px",
//             }}
//           >
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="#aaa"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="11" cy="11" r="8"></circle>
//               <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//             </svg>
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               style={{
//                 border: "none",
//                 outline: "none",
//                 padding: "0.5rem 1rem",
//                 width: "100%",
//                 fontSize: "1rem",
//               }}
//             />
//           </div>

//           <div
//             style={{
//               display: "flex",
//               gap: "0.5rem",
//               flexWrap: "wrap",
//             }}
//           >
//             <select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               style={{
//                 padding: "0.75rem 1rem",
//                 borderRadius: "30px",
//                 border: "none",
//                 backgroundColor: "white",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                 outline: "none",
//                 fontSize: "0.9rem",
//                 cursor: "pointer",
//               }}
//             >
//               <option value="default">Sort By</option>
//               <option value="name-asc">Name (A-Z)</option>
//               <option value="name-desc">Name (Z-A)</option>
//               <option value="newest">Newest First</option>
//               <option value="oldest">Oldest First</option>
//             </select>

//             <div
//               style={{
//                 display: "flex",
//                 gap: "0.5rem",
//                 flexWrap: "wrap",
//               }}
//             >
//               <button
//                 onClick={() => setActiveFilter("all")}
//                 style={{
//                   padding: "0.75rem 1.25rem",
//                   borderRadius: "30px",
//                   border: "none",
//                   backgroundColor: activeFilter === "all" ? currentSeasonStyle.primary : "white",
//                   color: activeFilter === "all" ? "white" : "#333",
//                   fontWeight: activeFilter === "all" ? "500" : "normal",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 All
//               </button>
//               {/* Add more category filters as needed */}
//             </div>
//           </div>
//         </div>

//         {/* Products Grid */}
//         {sortedProducts.length > 0 ? (
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//               gap: "2rem",
//             }}
//           >
//             {sortedProducts.map((product, index) => (
//               <div
//                 key={product.id}
//                 style={{
//                   backgroundColor: "white",
//                   borderRadius: "12px",
//                   overflow: "hidden",
//                   boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//                   transition: "all 0.3s ease",
//                   transform: hoveredProduct === product.id ? "translateY(-10px)" : "translateY(0)",
//                   animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
//                 }}
//                 onMouseEnter={() => setHoveredProduct(product.id)}
//                 onMouseLeave={() => setHoveredProduct(null)}
//               >
//                 <div
//                   style={{
//                     height: "220px",
//                     overflow: "hidden",
//                     position: "relative",
//                   }}
//                 >
//                   {product.product_image ? (
//                     <img
//                       src={`http://localhost:8080/${product.product_image}`}
//                       alt={product.product_name}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         transition: "transform 0.5s ease",
//                         transform: hoveredProduct === product.id ? "scale(1.1)" : "scale(1)",
//                       }}
//                     />
//                   ) : (
//                     <div
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         backgroundColor: "#f0f0f0",
//                         color: "#aaa",
//                         fontSize: "3rem",
//                       }}
//                     >
//                       {currentSeasonStyle.icon}
//                     </div>
//                   )}

//                   <div
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       bottom: 0,
//                       background:
//                         hoveredProduct === product.id
//                           ? `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)`
//                           : `linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%)`,
//                       transition: "all 0.3s ease",
//                     }}
//                   ></div>
//                 </div>

//                 <div style={{ padding: "1.5rem" }}>
//                   <div
//                     style={{
//                       width: "40px",
//                       height: "4px",
//                       backgroundColor: currentSeasonStyle.primary,
//                       marginBottom: "1rem",
//                       transition: "width 0.3s ease",
//                       width: hoveredProduct === product.id ? "60px" : "40px",
//                     }}
//                   ></div>

//                   <h3
//                     style={{
//                       margin: "0 0 0.75rem 0",
//                       fontSize: "1.3rem",
//                       fontWeight: "500",
//                       color: "#333",
//                     }}
//                   >
//                     {product.product_name}
//                   </h3>

//                   <p
//                     style={{
//                       margin: "0 0 1.5rem 0",
//                       fontSize: "0.95rem",
//                       color: "#666",
//                       lineHeight: "1.5",
//                       display: "-webkit-box",
//                       WebkitLineClamp: "3",
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     {product.product_description}
//                   </p>

//                   <button
//                     onClick={() => handleTradeClick(product)}
//                     style={{
//                       width: "100%",
//                       padding: "0.9rem",
//                       backgroundColor: currentSeasonStyle.primary,
//                       color: "white",
//                       border: "none",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       fontSize: "1rem",
//                       fontWeight: "500",
//                       transition: "all 0.3s ease",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       gap: "0.5rem",
//                     }}
//                     onMouseOver={(e) => {
//                       e.currentTarget.style.backgroundColor = currentSeasonStyle.secondary
//                       e.currentTarget.style.transform = "translateY(-2px)"
//                       e.currentTarget.style.boxShadow = `0 6px 15px rgba(0,0,0,0.1)`
//                     }}
//                     onMouseOut={(e) => {
//                       e.currentTarget.style.backgroundColor = currentSeasonStyle.primary
//                       e.currentTarget.style.transform = "translateY(0)"
//                       e.currentTarget.style.boxShadow = "none"
//                     }}
//                   >
//                     <svg
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <line x1="12" y1="5" x2="12" y2="19"></line>
//                       <polyline points="19 12 12 19 5 12"></polyline>
//                     </svg>
//                     Trade Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "4rem 2rem",
//               backgroundColor: "white",
//               borderRadius: "12px",
//               boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
//             }}
//           >
//             <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{currentSeasonStyle.icon}</div>
//             <h3
//               style={{
//                 fontSize: "1.5rem",
//                 fontWeight: "400",
//                 color: "#333",
//                 marginBottom: "1rem",
//               }}
//             >
//               No products found for {season}
//             </h3>
//             <p style={{ color: "#666", maxWidth: "500px", margin: "0 auto" }}>
//               Be the first to add products for this season! Click "Submit My Product" on the dashboard to get started.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Trade Modal */}
//       {showModal && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.7)",
//             backdropFilter: "blur(5px)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1000,
//             animation: "fadeIn 0.3s ease-out",
//           }}
//           onClick={handleCloseModal}
//         >
//           <div
//             style={{
//               backgroundColor: "white",
//               borderRadius: "12px",
//               width: "90%",
//               maxWidth: "450px",
//               overflow: "hidden",
//               boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
//               animation: `${modalAnimation === "scale-in" ? "scaleIn" : "scaleOut"} 0.3s ease-out`,
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div
//               style={{
//                 padding: "1.5rem",
//                 background: currentSeasonStyle.gradient,
//                 color: "white",
//                 position: "relative",
//               }}
//             >
//               <button
//                 onClick={handleCloseModal}
//                 style={{
//                   position: "absolute",
//                   top: "1rem",
//                   right: "1rem",
//                   backgroundColor: "transparent",
//                   border: "none",
//                   color: "white",
//                   fontSize: "1.5rem",
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: "30px",
//                   height: "30px",
//                   borderRadius: "50%",
//                   transition: "all 0.2s ease",
//                 }}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.backgroundColor = "transparent"
//                 }}
//               >
//                 ×
//               </button>
//               <h2
//                 style={{
//                   margin: "0 0 0.5rem 0",
//                   fontSize: "1.8rem",
//                   fontWeight: "400",
//                 }}
//               >
//                 Trade Request
//               </h2>
//               <p style={{ margin: "0", opacity: "0.9" }}>Complete the form below to request a trade</p>
//             </div>

//             <div style={{ padding: "1.5rem" }}>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "1rem",
//                   marginBottom: "1.5rem",
//                   padding: "1rem",
//                   backgroundColor: "#f8f9fa",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "50px",
//                     height: "50px",
//                     borderRadius: "8px",
//                     backgroundColor: currentSeasonStyle.primary,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "white",
//                     fontSize: "1.5rem",
//                   }}
//                 >
//                   {currentSeasonStyle.icon}
//                 </div>
//                 <div>
//                   <h3
//                     style={{
//                       margin: "0 0 0.25rem 0",
//                       fontSize: "1.1rem",
//                       fontWeight: "500",
//                     }}
//                   >
//                     {selectedProduct?.product_name}
//                   </h3>
//                   <p
//                     style={{
//                       margin: "0",
//                       fontSize: "0.9rem",
//                       color: "#666",
//                       display: "-webkit-box",
//                       WebkitLineClamp: "1",
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {selectedProduct?.product_description}
//                   </p>
//                 </div>
//               </div>

//               {selectedProduct?.ebayPrice && (
//                 <div
//                   style={{
//                     marginBottom: "1.5rem",
//                     padding: "1rem",
//                     backgroundColor: "#f0f8ff",
//                     borderRadius: "8px",
//                     borderLeft: "4px solid #4a90e2",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <span style={{ fontSize: "0.9rem", color: "#4a90e2", fontWeight: "500" }}>Average eBay Price</span>
//                     <span
//                       style={{
//                         fontSize: "1.2rem",
//                         fontWeight: "600",
//                         color: "#333",
//                       }}
//                     >
//                       ${selectedProduct.ebayPrice}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               <div style={{ marginBottom: "1.5rem" }}>
//                 <label
//                   style={{
//                     display: "block",
//                     marginBottom: "0.5rem",
//                     fontSize: "0.9rem",
//                     fontWeight: "500",
//                     color: "#555",
//                   }}
//                 >
//                   Coin Offer
//                 </label>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     border: "1px solid #ddd",
//                     borderRadius: "8px",
//                     overflow: "hidden",
//                   }}
//                 >
//                   <div
//                     style={{
//                       padding: "0.75rem 1rem",
//                       backgroundColor: "#f8f9fa",
//                       borderRight: "1px solid #ddd",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "0.5rem",
//                     }}
//                   >
//                     <svg
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="#FFC107"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <circle cx="12" cy="12" r="10"></circle>
//                       <circle cx="12" cy="12" r="3"></circle>
//                     </svg>
//                     <span style={{ fontWeight: "500", color: "#666" }}>Coins</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={coinAmount}
//                     onChange={(e) => {
//                       const value = e.target.value
//                       if (/^[1-9]\d*$|^0$/.test(value) || value === "") {
//                         setCoinAmount(value)
//                       }
//                     }}
//                     style={{
//                       flex: 1,
//                       padding: "0.75rem 1rem",
//                       border: "none",
//                       outline: "none",
//                       fontSize: "1rem",
//                       width: "100%",
//                     }}
//                     placeholder="Enter coin amount"
//                   />
//                 </div>
//                 <p
//                   style={{
//                     margin: "0.5rem 0 0 0",
//                     fontSize: "0.85rem",
//                     color: "#666",
//                     fontStyle: "italic",
//                   }}
//                 >
//                   Enter the number of coins you would like to offer for this product.
//                 </p>
//               </div>

//               <div style={{ display: "flex", gap: "1rem" }}>
//                 <button
//                   onClick={handleCloseModal}
//                   style={{
//                     flex: 1,
//                     padding: "0.9rem",
//                     backgroundColor: "#f1f1f1",
//                     color: "#666",
//                     border: "none",
//                     borderRadius: "8px",
//                     cursor: "pointer",
//                     fontSize: "1rem",
//                     fontWeight: "500",
//                     transition: "all 0.3s ease",
//                   }}
//                   onMouseOver={(e) => {
//                     e.currentTarget.style.backgroundColor = "#e5e5e5"
//                   }}
//                   onMouseOut={(e) => {
//                     e.currentTarget.style.backgroundColor = "#f1f1f1"
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleTradeSubmit}
//                   style={{
//                     flex: 2,
//                     padding: "0.9rem",
//                     backgroundColor: currentSeasonStyle.primary,
//                     color: "white",
//                     border: "none",
//                     borderRadius: "8px",
//                     cursor: "pointer",
//                     fontSize: "1rem",
//                     fontWeight: "500",
//                     transition: "all 0.3s ease",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: "0.5rem",
//                   }}
//                   onMouseOver={(e) => {
//                     e.currentTarget.style.backgroundColor = currentSeasonStyle.secondary
//                     e.currentTarget.style.transform = "translateY(-2px)"
//                     e.currentTarget.style.boxShadow = `0 6px 15px rgba(0,0,0,0.1)`
//                   }}
//                   onMouseOut={(e) => {
//                     e.currentTarget.style.backgroundColor = currentSeasonStyle.primary
//                     e.currentTarget.style.transform = "translateY(0)"
//                     e.currentTarget.style.boxShadow = "none"
//                   }}
//                 >
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <polyline points="9 11 12 14 22 4"></polyline>
//                     <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
//                   </svg>
//                   Submit Trade Request
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   )
// }

// export default ProductPage

"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import TabsComponent from "./Tabs"
import Footer from "./Footer"

// Season-specific styling
const seasonStyles = {
  spring: {
    primary: "#a8e6cf",
    secondary: "#55b895",
    gradient: "linear-gradient(135deg, rgba(168, 230, 207, 0.8), rgba(85, 184, 149, 0.8))",
    bgImage:
      "https://images.unsplash.com/photo-1582215375864-5f0a1d2de290?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    icon: "🌱",
    description: "Refresh your style with our spring collection. Perfect for the season of renewal and growth.",
  },
  summer: {
    primary: "#ffdfba",
    secondary: "#ffb347",
    gradient: "linear-gradient(135deg, rgba(255, 223, 186, 0.8), rgba(255, 179, 71, 0.8))",
    bgImage:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    icon: "☀️",
    description: "Stay cool with our summer essentials. Designed for those hot days and warm nights.",
  },
  autumn: {
    primary: "#ffb7b2",
    secondary: "#e67a73",
    gradient: "linear-gradient(135deg, rgba(255, 183, 178, 0.8), rgba(230, 122, 115, 0.8))",
    bgImage:
      "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    icon: "🍂",
    description: "Embrace the change with autumn favorites. Perfect for the colorful transition season.",
  },
  winter: {
    primary: "#b5c9df",
    secondary: "#7d9bc1",
    gradient: "linear-gradient(135deg, rgba(181, 201, 223, 0.8), rgba(125, 155, 193, 0.8))",
    bgImage:
      "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    icon: "❄️",
    description: "Stay warm with our winter collection. Designed for comfort during the coldest months.",
  },
}

function ProductPage() {
  const { season } = useParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [coinAmount, setCoinAmount] = useState(0)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("default")
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [modalAnimation, setModalAnimation] = useState("")

  // Get season-specific styling
  const currentSeasonStyle = seasonStyles[season] || seasonStyles.spring

  const handleTradeClick = async (product) => {
    setSelectedProduct(product)
    setModalAnimation("scale-in")
    setShowModal(true)

    try {
      const response = await axios.get("http://localhost:8080/api/ebay", {
        params: {
          keywords: product.product_name,
        },
      })

      console.log("eBay API Response:", response.data)

      // Handle the simplified response
      if (response.data.price) {
        setSelectedProduct((prevProduct) => ({
          ...prevProduct,
          ebayPrice: response.data.price,
        }))
      } else {
        console.log("No price found for:", product.product_name)
      }
    } catch (error) {
      console.error("Error fetching eBay product price:", error)
    }
  }

  const handleCloseModal = () => {
    setModalAnimation("scale-out")
    setTimeout(() => {
      setShowModal(false)
      setSelectedProduct(null)
      setCoinAmount(0)
    }, 300)
  }

  const handleTradeSubmit = async () => {
    try {
      const token = localStorage.getItem("token")
      const receiverId = selectedProduct.owner_id
      const requestedItemId = selectedProduct.id
      const coinsOffered = coinAmount

      console.log("Sending payload:", {
        receiverId,
        requestedItemId,
        coinsOffered,
      })

      const response = await axios.post(
        "http://localhost:8080/api/trade/request",
        {
          receiverId,
          requestedItemId,
          coinsOffered,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      alert(`Trade request submitted for ${selectedProduct.product_name} with ${coinAmount} coins.`)
      handleCloseModal()
      console.log("Trade request created successfully:", response.data)
    } catch (error) {
      console.error("Error submitting trade request:", error)
      if (error.response && error.response.data.error) {
        alert(error.response.data.error)
      } else {
        alert("Failed to submit trade request. Please try again.")
      }
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          alert("Unauthorized! Redirecting to login.")
          navigate("/login")
          return
        }

        const response = await axios.get(`http://localhost:8080/api/products/${season}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setProducts(response.data)
      } catch (error) {
        console.error("Error fetching products:", error)
        alert("Failed to fetch products. Please try again.")
        // Don't navigate away on error, just show the alert
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [season, navigate])

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    if (searchTerm && !product.product_name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    if (activeFilter !== "all") {
      // This is a placeholder - you would need to add categories to your products
      return product.category === activeFilter
    }

    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "name-asc") {
      return a.product_name.localeCompare(b.product_name)
    } else if (sortOption === "name-desc") {
      return b.product_name.localeCompare(a.product_name)
    } else if (sortOption === "newest") {
      return new Date(b.created_at) - new Date(a.created_at)
    } else if (sortOption === "oldest") {
      return new Date(a.created_at) - new Date(b.created_at)
    }
    return 0
  })

  // Animation keyframes
  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes scaleOut {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.9); }
    }
    
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
  `

  if (loading) {
    return (
      <div>
        <TabsComponent />
        <div
          style={{
            paddingTop: "64px",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `url(${currentSeasonStyle.bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
          ></div>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              padding: "2rem",
              borderRadius: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: "50px",
                height: "50px",
                border: `3px solid ${currentSeasonStyle.primary}`,
                borderRadius: "50%",
                borderTopColor: currentSeasonStyle.secondary,
                animation: "spin 1s linear infinite",
                marginBottom: "1rem",
              }}
            ></div>
            <h2 style={{ color: "#333", margin: "0" }}>
              Loading {season.charAt(0).toUpperCase() + season.slice(1)} Products...
            </h2>
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
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <TabsComponent />

      {/* Hero Section */}
      <div
        style={{
          paddingTop: "64px",
          height: "50vh",
          backgroundImage: `url(${currentSeasonStyle.bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: currentSeasonStyle.gradient,
            zIndex: 1,
          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "800px",
            padding: "0 2rem",
          }}
        >
          <div
            style={{
              fontSize: "4rem",
              marginBottom: "1rem",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            {currentSeasonStyle.icon}
          </div>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "300",
              color: "white",
              marginBottom: "1rem",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
              animation: "fadeIn 1s ease-out",
            }}
          >
            {season.charAt(0).toUpperCase() + season.slice(1)} Collection
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "white",
              maxWidth: "600px",
              margin: "0 auto",
              textShadow: "0 1px 5px rgba(0,0,0,0.2)",
              animation: "fadeIn 1.5s ease-out",
            }}
          >
            {currentSeasonStyle.description}
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div
        style={{
          padding: "3rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Filters and Search */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: "30px",
              padding: "0.5rem 1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#aaa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                padding: "0.5rem 1rem",
                width: "100%",
                fontSize: "1rem",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "30px",
                border: "none",
                backgroundColor: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                outline: "none",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              <option value="default">Sort By</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setActiveFilter("all")}
                style={{
                  padding: "0.75rem 1.25rem",
                  borderRadius: "30px",
                  border: "none",
                  backgroundColor: activeFilter === "all" ? currentSeasonStyle.primary : "white",
                  color: activeFilter === "all" ? "white" : "#333",
                  fontWeight: activeFilter === "all" ? "500" : "normal",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                All
              </button>
              {/* Add more category filters as needed */}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {sortedProducts.map((product, index) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  transform: hoveredProduct === product.id ? "translateY(-10px)" : "translateY(0)",
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div
                  style={{
                    height: "220px",
                    overflow: "hidden",
                    position: "relative",
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
                        transform: hoveredProduct === product.id ? "scale(1.1)" : "scale(1)",
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
                        backgroundColor: "#f8f9fa",
                        color: "#aaa",
                        fontSize: "3rem",
                      }}
                    >
                      {currentSeasonStyle.icon}
                    </div>
                  )}

                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        hoveredProduct === product.id
                          ? `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)`
                          : `linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%)`,
                      transition: "all 0.3s ease",
                    }}
                  ></div>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "4px",
                      backgroundColor: currentSeasonStyle.primary,
                      marginBottom: "1rem",
                      transition: "width 0.3s ease",
                      width: hoveredProduct === product.id ? "60px" : "40px",
                    }}
                  ></div>

                  <h3
                    style={{
                      margin: "0 0 0.75rem 0",
                      fontSize: "1.3rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    {product.product_name}
                  </h3>

                  <p
                    style={{
                      margin: "0 0 1.5rem 0",
                      fontSize: "0.95rem",
                      color: "#666",
                      lineHeight: "1.5",
                      display: "-webkit-box",
                      WebkitLineClamp: "3",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.product_description}
                  </p>

                  <button
                    onClick={() => handleTradeClick(product)}
                    style={{
                      width: "100%",
                      padding: "0.9rem",
                      backgroundColor: currentSeasonStyle.primary,
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = currentSeasonStyle.secondary
                      e.currentTarget.style.transform = "translateY(-2px)"
                      e.currentTarget.style.boxShadow = `0 6px 15px rgba(0,0,0,0.1)`
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = currentSeasonStyle.primary
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "none"
                    }}
                  >
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
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                    Trade Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{currentSeasonStyle.icon}</div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "400",
                color: "#333",
                marginBottom: "1rem",
              }}
            >
              No products found for {season}
            </h3>
            <p style={{ color: "#666", maxWidth: "500px", margin: "0 auto" }}>
              Be the first to add products for this season! Click "Submit My Product" on the dashboard to get started.
            </p>
          </div>
        )}
      </div>

      {/* Trade Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease-out",
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "450px",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
              animation: `${modalAnimation === "scale-in" ? "scaleIn" : "scaleOut"} 0.3s ease-out`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: "1.5rem",
                background: currentSeasonStyle.gradient,
                color: "white",
                position: "relative",
              }}
            >
              <button
                onClick={handleCloseModal}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                ×
              </button>
              <h2
                style={{
                  margin: "0 0 0.5rem 0",
                  fontSize: "1.8rem",
                  fontWeight: "400",
                }}
              >
                Trade Request
              </h2>
              <p style={{ margin: "0", opacity: "0.9" }}>Complete the form below to request a trade</p>
            </div>

            <div style={{ padding: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "8px",
                    backgroundColor: currentSeasonStyle.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.5rem",
                  }}
                >
                  {currentSeasonStyle.icon}
                </div>
                <div>
                  <h3
                    style={{
                      margin: "0 0 0.25rem 0",
                      fontSize: "1.1rem",
                      fontWeight: "500",
                    }}
                  >
                    {selectedProduct?.product_name}
                  </h3>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "0.9rem",
                      color: "#666",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {selectedProduct?.product_description}
                  </p>
                </div>
              </div>

              {selectedProduct?.ebayPrice && (
                <div
                  style={{
                    marginBottom: "1.5rem",
                    padding: "1rem",
                    backgroundColor: "#f0f8ff",
                    borderRadius: "8px",
                    borderLeft: "4px solid #4a90e2",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "0.9rem", color: "#4a90e2", fontWeight: "500" }}>Average eBay Price</span>
                    <span
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        color: "#333",
                      }}
                    >
                      ${selectedProduct.ebayPrice}
                    </span>
                  </div>
                </div>
              )}

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: "#555",
                  }}
                >
                  Coin Offer
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      backgroundColor: "#f8f9fa",
                      borderRight: "1px solid #ddd",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
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
                    <span style={{ fontWeight: "500", color: "#666" }}>Coins</span>
                  </div>
                  <input
                    type="text"
                    value={coinAmount}
                    onChange={(e) => {
                      const value = e.target.value
                      if (/^[1-9]\d*$|^0$/.test(value) || value === "") {
                        setCoinAmount(value)
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: "0.75rem 1rem",
                      border: "none",
                      outline: "none",
                      fontSize: "1rem",
                      width: "100%",
                    }}
                    placeholder="Enter coin amount"
                  />
                </div>
                <p
                  style={{
                    margin: "0.5rem 0 0 0",
                    fontSize: "0.85rem",
                    color: "#666",
                    fontStyle: "italic",
                  }}
                >
                  Enter the number of coins you would like to offer for this product.
                </p>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={handleCloseModal}
                  style={{
                    flex: 1,
                    padding: "0.9rem",
                    backgroundColor: "#f1f1f1",
                    color: "#666",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#e5e5e5"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#f1f1f1"
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleTradeSubmit}
                  style={{
                    flex: 2,
                    padding: "0.9rem",
                    backgroundColor: currentSeasonStyle.primary,
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = currentSeasonStyle.secondary
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = `0 6px 15px rgba(0,0,0,0.1)`
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = currentSeasonStyle.primary
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
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
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                  Submit Trade Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ProductPage


