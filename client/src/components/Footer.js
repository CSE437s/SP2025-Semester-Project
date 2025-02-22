import React from "react";

function Footer() {
    return (
        <footer style={footerStyle}>
            <p>© 2025 Seasonal Trade-Up. All rights reserved. | Terms & Conditions apply.</p>
        </footer>
    );
}

const footerStyle = {
    width: "100%",
    padding: "2px",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    color: "#333",
    position: "fixed",
    bottom: 0,
    left: 0,
};

export default Footer;