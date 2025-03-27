import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TabsComponent from "./Tabs";
import Footer from "./Footer";

function ProductPage() {
    const { season } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [coinAmount, setCoinAmount] = useState(0);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageContent, setMessageContent] = useState("");

    const handleTradeClick = async (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    
        try {
            const response = await axios.get('http://localhost:8080/api/ebay', {
                params: {
                    keywords: product.product_name
                }
            });
    
            console.log('eBay API Response:', response.data);
    
            if (response.data.price) {
                setSelectedProduct(prevProduct => ({
                    ...prevProduct,
                    ebayPrice: response.data.price
                }));
            } else {
                console.log('No price found for:', product.product_name);
            }
        } catch (error) {
            console.error('Error fetching eBay product price:', error);
        }
    };

    const handleMessageClick = (product) => {
        setSelectedProduct(product);
        setShowMessageModal(true);
    };

    const handleSendMessage = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8080/api/messages/send',
                {
                    receiverId: selectedProduct.owner_id,
                    productId: selectedProduct.id,
                    content: messageContent
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            alert('Message sent successfully!');
            setShowMessageModal(false);
            setMessageContent("");
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
        setCoinAmount(0);
    };

    const handleCloseMessageModal = () => {
        setShowMessageModal(false);
        setSelectedProduct(null);
        setMessageContent("");
    };

    const handleTradeSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const receiverId = selectedProduct.owner_id;
            const requestedItemId = selectedProduct.id;
            const coinsOffered = coinAmount;
    
            const response = await axios.post(
                'http://localhost:8080/api/trade/request',
                {
                    receiverId,
                    requestedItemId,
                    coinsOffered,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            alert(`Trade request submitted for ${selectedProduct.product_name} with ${coinAmount} coins.`);
            handleCloseModal();
            console.log('Trade request created successfully:', response.data);
        } catch (error) {
            console.error('Error submitting trade request:', error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('Failed to submit trade request. Please try again.');
            }
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Unauthorized! Redirecting to login.");
                    navigate("/login");
                    return;
                }

                const response = await axios.get(`http://localhost:8080/api/products/${season}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                alert("Failed to fetch products. Please try again.");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [season, navigate]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <TabsComponent />
            <div style={{ paddingTop: "64px", height:"100%",
                backgroundImage: "url('https://images.unsplash.com/photo-1735822081256-bc72ef6cbe59?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                display: "flex", flexDirection: "row" }}>
                <div style={{ width: "100%", padding: "40px" }}>
                    <h2>{season.charAt(0).toUpperCase() + season.slice(1)} Products</h2>
                    <p>Browse the best products available for {season}.</p>
                </div>

                <div style={{ width: "70%", padding: "20px" }}>
                    <div style={{ marginBottom: "20px", textAlign: "center" }}>
                        <h2>All {season.charAt(0).toUpperCase() + season.slice(1)} Products</h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", textAlign: "center", backgroundColor: "#f9f9f9" }}>
                                    {product.product_image && (
                                        <img
                                            src={`http://localhost:8080/${product.product_image}`}
                                            alt={product.product_name}
                                            style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }}
                                        />
                                    )}
                                    <h3>{product.product_name}</h3>
                                    <p style={{ fontSize: "14px", color: "#555" }}>
                                        <strong>Description:</strong> {product.product_description}
                                    </p>
                                    <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                        <button
                                            onClick={() => handleTradeClick(product)}
                                            style={{
                                                padding: "10px 20px",
                                                backgroundColor: "#4CAF50",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                                flex: 1
                                            }}
                                        >
                                            Trade
                                        </button>
                                        <button
                                            onClick={() => handleMessageClick(product)}
                                            style={{
                                                padding: "10px 20px",
                                                backgroundColor: "#2196F3",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                                flex: 1
                                            }}
                                        >
                                            Message
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products found for {season}.</p>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "30px",
                            borderRadius: "8px",
                            width: "400px",
                            textAlign: "center",
                        }}
                    >
                        <h2>Trade Request</h2>
                        <p>Trading for: <strong>{selectedProduct?.product_name}</strong></p>
                            {selectedProduct?.ebayPrice && (
                                <p style={{backgroundImage: "url('https://images.unsplash.com/photo-1618397746666-63405ce5d015?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" , borderRadius: '25px'}}>Average eBay Price: <strong>${selectedProduct.ebayPrice}</strong></p>
                            )}
                        <p>Enter the number of coins you would like to trade:</p>
                        <input
                            type="text"
                            value={coinAmount}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^[1-9]\d*$|^0$/.test(value) || value === "") {
                                    setCoinAmount(value);
                                }
                            }}
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                            }}
                            min="0"
                        />
                        <button
                            onClick={handleTradeSubmit}
                            style={{
                                marginTop: "10px",
                                padding: "10px 20px",
                                backgroundColor: "#4CAF50",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                width: "100%",
                            }}
                        >
                            Submit Trade
                        </button>
                        <button
                            onClick={handleCloseModal}
                            style={{
                                marginTop: "10px",
                                padding: "10px 20px",
                                backgroundColor: "#f44336",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                width: "100%",
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {showMessageModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "30px",
                            borderRadius: "8px",
                            width: "400px",
                            textAlign: "center",
                        }}
                    >
                        <h2>Message Owner</h2>
                        <p>About: <strong>{selectedProduct?.product_name}</strong></p>
                        <textarea
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            placeholder="Type your message here..."
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                minHeight: "100px",
                            }}
                        />
                        <button
                            onClick={handleSendMessage}
                            style={{
                                marginTop: "10px",
                                padding: "10px 20px",
                                backgroundColor: "#2196F3",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                width: "100%",
                            }}
                        >
                            Send Message
                        </button>
                        <button
                            onClick={handleCloseMessageModal}
                            style={{
                                marginTop: "10px",
                                padding: "10px 20px",
                                backgroundColor: "#f44336",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                width: "100%",
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
}

export default ProductPage;