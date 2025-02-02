import React, { useState } from "react";
import { AppBar, Tab, Tabs, Box, IconButton, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

function TabsComponent() {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Box sx={{ width: "100%" }}>
            <AppBar position="fixed" sx={{ backgroundColor: "#333" }}>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                  
                    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="navigation tabs"
                            sx={{
                                "& .MuiTab-root": {
                                    color: "#fff", 
                                },
                                "& .Mui-selected": {
                                    color: "#ff5722", 
                                },
                                "& .MuiTabs-indicator": {
                                    backgroundColor: "#ff5722", 
                                },
                            }}
                        >
                            <Tab label="Home" component={Link} to="/" />
                            <Tab label="Category" component={Link} to="/category" />
                            <Tab label="Profile" component={Link} to="/profile" />
                            <Tab label="Logout" onClick={handleLogout} />
                        </Tabs>
                    </Box>

                
                    <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
                        <Typography sx={{ color: "#fff", marginRight: 1 }}></Typography>
                        <IconButton component={Link} to="/profile" sx={{ color: "#fff" }}>
                            <PersonIcon />
                        </IconButton>
                    </Box>
                </Box>
            </AppBar>
        </Box>
    );
}

export default TabsComponent;
