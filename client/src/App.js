import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register"; // Import the Register component
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Category from "./components/Category";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> {/* Register Route */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path = "/profile" element={<Profile />}/>
                <Route path = "/category" element = {<Category/>}/>
                <Route path="*" element={<Login />} /> {/* Default to Login */}
            </Routes>
        </Router>
    );
}

export default App;
