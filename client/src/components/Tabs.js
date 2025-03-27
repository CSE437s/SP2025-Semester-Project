// import React, { useState, useEffect } from "react";
// import { AppBar, Tab, Tabs, Box, IconButton, Typography, Toolbar, Button } from "@mui/material";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import PersonIcon from "@mui/icons-material/Person";
// import logo from "../image/logo.png";

// function TabsComponent() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [value, setValue] = useState(0);
//     const [coinBalance, setCoinBalance] = useState(0);

//     useEffect(() => {
//         if (location.pathname === "/profile") {
//             setValue(1);
//         } else if (location.pathname === "/dashboard") {
//             setValue(0);
//         }

//         const fetchCoinBalance = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 const response = await axios.get("http://localhost:8080/api/user/coins", {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setCoinBalance(response.data.coins);
//             } catch (error) {
//                 console.error("Error fetching coin balance:", error);
//             }
//         };

//         fetchCoinBalance();
//     }, [location.pathname]);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     };

//     return (
//         <AppBar position="fixed" sx={{ borderColor: "rgba(50, 115, 220, 0.3)", backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "40px", marginTop: "10px"}}>
//             <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
//                 {/* Logo */}
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <img src={logo} alt="Logo" style={{ height: "45px", marginRight: "15px" }} />
//                     <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
//                         HarvestHub
//                     </Typography>
//                 </Box>

//                 {/* Navigation Tabs */}
//                 <Tabs
//                     value={value}
//                     onChange={handleChange}
//                     sx={{
//                         "& .MuiTab-root": { color: "white", fontSize: "16px", fontWeight: "bold" },
//                         "& .Mui-selected": { color: "Black" },
//                         "& .MuiTabs-indicator": { backgroundColor: "#FFC107" },
//                     }}
//                 >
//                     <Tab label="Home" component={Link} to="/dashboard" />
//                     <Tab label="Profile" component={Link} to="/profile" />
//                 </Tabs>

//                 {/* Right Section (Coin Balance & Logout) */}
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Typography sx={{ color: "white", marginRight: 2, fontSize: "16px" }}>
//                         Coins: <strong>{coinBalance}</strong>
//                     </Typography>
//                     <IconButton component={Link} to="/profile" sx={{ color: "white" }}>
//                         <PersonIcon fontSize="large" />
//                     </IconButton>
//                     <Button
//                         onClick={handleLogout}
//                         sx={{
//                             backgroundColor: "#D32F2F",
//                             color: "white",
//                             padding: "8px 15px",
//                             marginRight: "40px",
//                             fontWeight: "bold",
//                             borderRadius: "5px",
//                             "&:hover": { backgroundColor: "#B71C1C" },
//                         }}
//                     >
//                         Logout
//                     </Button>
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// }

// export default TabsComponent;

"use client"

import { useState, useEffect, useRef } from "react"
import {
  AppBar,
  Tab,
  Tabs,
  Box,
  IconButton,
  Typography,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"
import { useNavigate, Link, useLocation } from "react-router-dom"
import axios from "axios"
import PersonIcon from "@mui/icons-material/Person"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import CloseIcon from "@mui/icons-material/Close"
import LocalFloristIcon from "@mui/icons-material/LocalFlorist"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import FilterVintageIcon from "@mui/icons-material/FilterVintage"
import AcUnitIcon from "@mui/icons-material/AcUnit"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"

function TabsComponent() {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [value, setValue] = useState(0)
  const [coinBalance, setCoinBalance] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const seasonsRef = useRef(null)

  useEffect(() => {
    if (location.pathname === "/profile") {
      setValue(1)
    } else if (location.pathname === "/dashboard") {
      setValue(0)
    }

    const fetchCoinBalance = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:8080/api/user/coins", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setCoinBalance(response.data.coins)
      } catch (error) {
        console.error("Error fetching coin balance:", error)
      }
    }

    fetchCoinBalance()
  }, [location.pathname])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const scrollToSeasons = (seasonIndex) => {
    // Close mobile drawer if open
    if (mobileOpen) {
      setMobileOpen(false)
    }

    // Close menu if open
    if (anchorEl) {
      handleMenuClose()
    }

    // If not on dashboard, navigate there first
    if (location.pathname !== "/dashboard") {
      navigate("/dashboard")
      // Need to wait for navigation to complete before scrolling
      setTimeout(() => {
        const seasonsSection = document.querySelector(".seasons-section")
        if (seasonsSection) {
          seasonsSection.scrollIntoView({ behavior: "smooth" })

          // If a specific season card is requested, scroll to it
          if (seasonIndex !== undefined) {
            const seasonCards = document.querySelectorAll(".season-card")
            if (seasonCards && seasonCards[seasonIndex]) {
              setTimeout(() => {
                seasonCards[seasonIndex].scrollIntoView({ behavior: "smooth" })
              }, 500)
            }
          }
        }
      }, 300)
    } else {
      // Already on dashboard, just scroll
      const seasonsSection = document.querySelector(".seasons-section")
      if (seasonsSection) {
        seasonsSection.scrollIntoView({ behavior: "smooth" })

        // If a specific season card is requested, scroll to it
        if (seasonIndex !== undefined) {
          const seasonCards = document.querySelectorAll(".season-card")
          if (seasonCards && seasonCards[seasonIndex]) {
            setTimeout(() => {
              seasonCards[seasonIndex].scrollIntoView({ behavior: "smooth" })
            }, 500)
          }
        }
      }
    }
  }

  // Logo component
  const Logo = () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#4CAF50" fillOpacity="0.8" />
        <path
          d="M20 5C16.5 5 13.5 7 12 10C10.5 13 10.5 16 12 19C13.5 22 16.5 24 20 24C23.5 24 26.5 22 28 19C29.5 16 29.5 13 28 10C26.5 7 23.5 5 20 5Z"
          fill="#81C784"
        />
        <path d="M12 19C10.5 16 10.5 13 12 10C13.5 7 16.5 5 20 5V24C16.5 24 13.5 22 12 19Z" fill="#4CAF50" />
        <path
          d="M20 30C18.3431 30 17 28.6569 17 27C17 25.3431 18.3431 24 20 24C21.6569 24 23 25.3431 23 27C23 28.6569 21.6569 30 20 30Z"
          fill="#81C784"
        />
        <path
          d="M20 35C19.4477 35 19 34.5523 19 34C19 33.4477 19.4477 33 20 33C20.5523 33 21 33.4477 21 34C21 34.5523 20.5523 35 20 35Z"
          fill="#81C784"
        />
        <path
          d="M24 33C23.4477 33 23 32.5523 23 32C23 31.4477 23.4477 31 24 31C24.5523 31 25 31.4477 25 32C25 32.5523 24.5523 33 24 33Z"
          fill="#81C784"
        />
        <path
          d="M16 33C15.4477 33 15 32.5523 15 32C15 31.4477 15.4477 31 16 31C16.5523 31 17 31.4477 17 32C17 32.5523 16.5523 33 16 33Z"
          fill="#81C784"
        />
      </svg>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "500",
          color: "white",
          ml: 1.5,
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.5px",
        }}
      >
        HarvestHub
      </Typography>
    </Box>
  )

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 250, height: "100%", backgroundColor: "#1a1a1a" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
        <Logo />
        <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
      <List>
        <ListItem button component={Link} to="/dashboard" onClick={handleDrawerToggle}>
          <ListItemIcon sx={{ color: "white" }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ color: "white" }} />
        </ListItem>
        <ListItem button component={Link} to="/profile" onClick={handleDrawerToggle}>
          <ListItemIcon sx={{ color: "white" }}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" sx={{ color: "white" }} />
        </ListItem>
      </List>
      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
      <List>
        <ListItem>
          <ListItemIcon sx={{ color: "#FFC107" }}>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary={`Coins: ${coinBalance}`} sx={{ color: "white" }} />
        </ListItem>
      </List>
      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
      <List>
        <ListItem button onClick={() => scrollToSeasons(0)}>
          <ListItemIcon sx={{ color: "#a8e6cf" }}>
            <LocalFloristIcon />
          </ListItemIcon>
          <ListItemText primary="Spring" sx={{ color: "white" }} />
        </ListItem>
        <ListItem button onClick={() => scrollToSeasons(1)}>
          <ListItemIcon sx={{ color: "#ffdfba" }}>
            <WbSunnyIcon />
          </ListItemIcon>
          <ListItemText primary="Summer" sx={{ color: "white" }} />
        </ListItem>
        <ListItem button onClick={() => scrollToSeasons(2)}>
          <ListItemIcon sx={{ color: "#ffb7b2" }}>
            <FilterVintageIcon />
          </ListItemIcon>
          <ListItemText primary="Autumn" sx={{ color: "white" }} />
        </ListItem>
        <ListItem button onClick={() => scrollToSeasons(3)}>
          <ListItemIcon sx={{ color: "#b5c9df" }}>
            <AcUnitIcon />
          </ListItemIcon>
          <ListItemText primary="Winter" sx={{ color: "white" }} />
        </ListItem>
      </List>
      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
        <ListItem button onClick={handleLogout}>
          <ListItemIcon sx={{ color: "#f44336" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: "white" }} />
        </ListItem>
      </Box>
    </Box>
  )

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
        elevation={0}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          {/* Logo */}
          <Logo />

          {/* Mobile Menu Button */}
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {/* Navigation Tabs for Desktop */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  sx={{
                    "& .MuiTab-root": {
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "15px",
                      fontWeight: "500",
                      textTransform: "none",
                      minWidth: "auto",
                      mx: 1,
                      transition: "all 0.3s ease",
                    },
                    "& .Mui-selected": {
                      color: "white",
                      fontWeight: "600",
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#4CAF50",
                      height: "3px",
                      borderRadius: "3px 3px 0 0",
                    },
                  }}
                >
                  <Tab label="Home" component={Link} to="/dashboard" />
                  <Tab label="Profile" component={Link} to="/profile" />
                </Tabs>

                {/* Seasons Menu */}
                <Button
                  aria-controls="seasons-menu"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    textTransform: "none",
                    fontSize: "15px",
                    fontWeight: "500",
                    mx: 1,
                    "&:hover": {
                      color: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  endIcon={<FilterVintageIcon />}
                >
                  Seasons
                </Button>
                <Menu
                  id="seasons-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      backgroundColor: "rgba(30,30,30,0.95)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      mt: 1.5,
                      width: 180,
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => scrollToSeasons(0)}
                    sx={{
                      color: "white",
                      "&:hover": { backgroundColor: "rgba(168, 230, 207, 0.2)" },
                    }}
                  >
                    <ListItemIcon>
                      <LocalFloristIcon sx={{ color: "#a8e6cf" }} />
                    </ListItemIcon>
                    <Typography>Spring</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSeasons(1)}
                    sx={{
                      color: "white",
                      "&:hover": { backgroundColor: "rgba(255, 223, 186, 0.2)" },
                    }}
                  >
                    <ListItemIcon>
                      <WbSunnyIcon sx={{ color: "#ffdfba" }} />
                    </ListItemIcon>
                    <Typography>Summer</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSeasons(2)}
                    sx={{
                      color: "white",
                      "&:hover": { backgroundColor: "rgba(255, 183, 178, 0.2)" },
                    }}
                  >
                    <ListItemIcon>
                      <FilterVintageIcon sx={{ color: "#ffb7b2" }} />
                    </ListItemIcon>
                    <Typography>Autumn</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSeasons(3)}
                    sx={{
                      color: "white",
                      "&:hover": { backgroundColor: "rgba(181, 201, 223, 0.2)" },
                    }}
                  >
                    <ListItemIcon>
                      <AcUnitIcon sx={{ color: "#b5c9df" }} />
                    </ListItemIcon>
                    <Typography>Winter</Typography>
                  </MenuItem>
                </Menu>
              </Box>

              {/* Right Section (Coin Balance & Logout) */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip title="Your coin balance" arrow>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: "20px",
                      padding: "4px 12px",
                      mr: 2,
                    }}
                  >
                    <MonetizationOnIcon sx={{ color: "#FFC107", mr: 0.5 }} />
                    <Typography sx={{ color: "white", fontSize: "14px", fontWeight: "500" }}>{coinBalance}</Typography>
                  </Box>
                </Tooltip>

                <Tooltip title="View profile" arrow>
                  <IconButton
                    component={Link}
                    to="/profile"
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      mr: 2,
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.2)",
                      },
                    }}
                  >
                    <PersonIcon />
                  </IconButton>
                </Tooltip>

                <Button
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{
                    backgroundColor: "rgba(211, 47, 47, 0.8)",
                    color: "white",
                    padding: "8px 16px",
                    fontWeight: "500",
                    borderRadius: "20px",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(211, 47, 47, 1)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(211, 47, 47, 0.3)",
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar />
    </>
  )
}

export default TabsComponent
