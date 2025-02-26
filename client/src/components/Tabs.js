import React, { useState, useEffect } from "react";
import { AppBar, Tab, Tabs, Box, IconButton, Typography, Toolbar, Button } from "@mui/material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../image/logo.png";

function TabsComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(0);
    const [coinBalance, setCoinBalance] = useState(0);

    useEffect(() => {
        if (location.pathname === "/profile") {
            setValue(1);
        } else if (location.pathname === "/dashboard") {
            setValue(0);
        }

        const fetchCoinBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/api/user/coins", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCoinBalance(response.data.coins);
            } catch (error) {
                console.error("Error fetching coin balance:", error);
            }
        };

        fetchCoinBalance();
    }, [location.pathname]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: "grey", borderRadius: "40px", marginTop: "10px"}}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                {/* Logo */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={logo} alt="Logo" style={{ height: "45px", marginRight: "15px" }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
                        HarvestHub
                    </Typography>
                </Box>

                {/* Navigation Tabs */}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    sx={{
                        "& .MuiTab-root": { color: "white", fontSize: "16px", fontWeight: "bold" },
                        "& .Mui-selected": { color: "Black" },
                        "& .MuiTabs-indicator": { backgroundColor: "#FFC107" },
                    }}
                >
                    <Tab label="Home" component={Link} to="/dashboard" />
                    <Tab label="Profile" component={Link} to="/profile" />
                </Tabs>

                {/* Right Section (Coin Balance & Logout) */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ color: "white", marginRight: 2, fontSize: "16px" }}>
                        Coins: <strong>{coinBalance}</strong>
                    </Typography>
                    <IconButton component={Link} to="/profile" sx={{ color: "white" }}>
                        <PersonIcon fontSize="large" />
                    </IconButton>
                    <Button
                        onClick={handleLogout}
                        sx={{
                            backgroundColor: "#D32F2F",
                            color: "white",
                            padding: "8px 15px",
                            marginRight: "40px",
                            fontWeight: "bold",
                            borderRadius: "5px",
                            "&:hover": { backgroundColor: "#B71C1C" },
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default TabsComponent;
