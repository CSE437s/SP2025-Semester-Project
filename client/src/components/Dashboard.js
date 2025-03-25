import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TabsComponent from "./Tabs";
import springImage from '../image/spring.PNG';
import summerImage from '../image/summer.PNG';
import autumnImage from '../image/autumn.PNG';
import winterImage from '../image/winter.PNG';
import Footer from "./Footer";
import { getOpacity } from "@mui/material/styles/createColorScheme";

function Dashboard() {
    const navigate = useNavigate();
    const [seasons, setSeasons] = useState([]);
    const [productName, setProductName] = useState("");
    const [suitableSeason, setSuitableSeason] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [showForm, setShowForm] = useState(false);

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

        setSeasons([
            { id: 1, title: "Spring", image: springImage },
            { id: 2, title: "Summer", image: summerImage },
            { id: 3, title: "Autumn", image: autumnImage },
            { id: 4, title: "Winter", image: winterImage },
        ]);
    }, [navigate]);

    const handleSeasonClick = (category) => {
        navigate(`/products/${category}`);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("suitableSeason", suitableSeason);
        formData.append("productDescription", productDescription);
        if (productImage) {
            formData.append("productImage", productImage);
        }
      
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:8080/api/submit-product", 
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            
            alert(response.data.message);
    
            setProductName('');
            setSuitableSeason('');
            setProductDescription('');
            setProductImage(null);
        } catch (error) {
            console.error("Error submitting product:", error);
            alert("There was an error submitting your product.");
        }
    };
    
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif" }}>
            {/* Hero Section */}
            <TabsComponent />
            <div style={{
                // backgroundImage: "url('https://images.unsplash.com/photo-1633786042135-cb9547757f92?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundImage: "url('https://images.unsplash.com/photo-1735822081256-bc72ef6cbe59?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                // https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
                backgroundSize: "cover",
                height: "100vh",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
                backgroundPosition: "center",
                height: "90vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                // stroke: "GrayText",
                textAlign: "center",
                position: "relative"
            }}>
                <h1 style={{ fontSize: "3rem", fontWeight: "bold", textShadow: "2px 2px 5px rgba(0,0,0,0.5)" }}>
                    We sell connection, with Product 
                </h1>
                <p style={{ fontSize: "1.2rem", textShadow: "1px 1px 3px rgba(0,0,0,0.4)" }}>
                    Lets promote "RE-USE" and Save Earth
                </p>
                <button 
                    onClick={toggleForm} 
                    style={{ 
                        marginTop: "20px",
                        padding: "12px 24px", 
                        backgroundColor: "transparent", 
                        color: "white", 
                        borderRadius: "25px", 
                        borderColor: "grey",
                        cursor: "pointer",
                        fontSize: "1rem",
                        transition: "0.3s ease"                        
                    }}
                >
                    {showForm ? "Close Form" : "Submit My Product"}
                </button>
            </div>

            {/* Product Submission Form */}
            {showForm && (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // marginTop: "30px",
                    padding: "100px 300px",
                    // backgroundColor: "#f5f5f5",
                    backgroundImage: "url('https://images.unsplash.com/photo-1704924524043-553d46db5ce5?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                }}>
                    {/* <div> */}
                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <h2 style={{  fontSize: "2.5rem", fontWeight: "bold", textShadow: "2px 2px 5px rgba(0,0,0,0.5)", marginBottom: "15px", color: "white" }}>Post Product Here</h2>
                        <label style={{ color: "white" }}>Product Name: </label>
                        {/* <option value="">Select a season</option> */}
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                            style={{ width: "40%", padding: "8px",borderRadius: "25px",  marginBottom: "25px", marginRight: "20px" }}
                        />
                        <br></br>
                        <label style={{ color: "white", borderRadius: "25px", borderColor: "grey" }}>Select Season: </label>
                        <select
                            value={suitableSeason}
                            onChange={(e) => setSuitableSeason(e.target.value)}
                            required
                            style={{ width: "41.5%", padding: "8px", marginBottom: "25px", marginRight: "20px" }}
                        >
                            <option value="">Select a season</option>
                            <option value="spring">Spring</option>
                            <option value="summer">Summer</option>
                            <option value="autumn">Autumn</option>
                            <option value="winter">Winter</option>
                        </select>
                        <br></br>
                        <label style={{ color: "white",borderRadius: "25px", position: "absolute"  }}>Description:</label>
                        <textarea
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            required
                            style={{ width: "40%", padding: "8px",borderRadius: "25px", borderColor: "grey",  height: "100px", marginBottom: "25px", marginLeft: "96px" }}
                        />
                        <br></br>
                        <label style={{ color: "white" }}>Upload Image:</label>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            required
                            style={{ width: "100%", padding: "8px",borderRadius: "25px",  marginBottom: "10px", color: "white"  }}
                        />
                        <button type="submit" style={{
                            marginTop: "20px",
                            padding: "12px 24px", 
                            backgroundColor: "transparent", 
                            color: "white", 
                            borderRadius: "25px", 
                            borderColor: "grey",
                            cursor: "pointer",
                            fontSize: "1rem",
                            transition: "0.3s ease" 
                        }}>
                            Submit
                        </button>
                    </form>
                    {/* </div>
                    <div>
                        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

</h3>
                    </div> */}

                </div>
            )}

            {/* Seasons Category Section */}
            <div style={{
                // backgroundColor: "#111",
                display: "",
                justifyContent: "center",
                alignItems: "center",
                // marginTop: "30px",
                padding: "75px 75px 200px 75px",
                // backgroundImage: "url('https://images.unsplash.com/photo-1633786042135-cb9547757f92?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundImage: "url('https://images.unsplash.com/photo-1735822081256-bc72ef6cbe59?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",

                // color: "white",
                // transform: 'rotate(180deg)'
                // padding: "200px",
                // textAlign: "center"
            }}>
                <h1 style={{ textAlign: "center", marginBottom: "50px", color: "white", fontSize: "3rem", fontWeight: "bold", textShadow: "2px 2px 5px rgba(0,0,0,0.5)" }}>Explore Exclusive Products</h1>
                {/* <h2 style={{ textAlign: "center", marginBottom: "15px", color: "white" }}>Sell Your Product Here</h2> */}
                <p style={{ textAlign: "center", marginBottom: "100px", color: "white"}}>
                    Sustainable practices can significantly reduce our carbon footprint.
                </p>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "40px",
                    justifyContent: "center",
                    // marginTop: "20px",
                    // padding: "12px 24px", 
                    backgroundColor: "transparent", 
                    color: "white", 
                    borderRadius: "25px", 
                    borderColor: "grey",
                    cursor: "pointer",
                    fontSize: "1rem",
                    transition: "0.3s ease" 
                }}>
                    {seasons.map((season) => (
                        <div key={season.id} onClick={() => handleSeasonClick(season.title.toLowerCase())} 
                            style={{
                                backgroundColor: "silver",
                                // background: getOpacity,
                                padding: "20px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                transition: "0.3s ease",
                                textAlign: "center"
                            }}>
                            <img src={season.image} alt={season.title} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px", color: "white" }} />
                            <h3 style={{ marginTop: "15px", color: "grey"  }}>{season.title}</h3>
                        </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default Dashboard;

