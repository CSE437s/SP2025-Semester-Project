const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

const furnitureRoutes = require("./src/app/api/furniture");
const apartmentRoutes = require("./src/app/api/apartment");
const messagesRoutes = require("./src/app/api/messages");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 5001; // Set your custom port here

// Configure Next.js app with custom hostname and port
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressServer = express();
  const httpServer = createServer(expressServer); // Use httpServer instead of expressServer directly
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // Use JSON and CORS middleware
  expressServer.use(express.json());
  expressServer.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  // Register API routes
  expressServer.use("/api/furniture", furnitureRoutes);
  expressServer.use("/api/apartment", apartmentRoutes);
  expressServer.use("/api/messages", messagesRoutes);

  // Handle Socket.IO connections
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Broadcast incoming messages
    socket.on("message", (messageData) => {
      socket.broadcast.emit("message", messageData);
    });

    // Handle connection errors
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    // Handle disconnections
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // Use Next.js request handler for other routes
  expressServer.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start the server
  httpServer.listen(port, () => {
    console.log(`> Server running on http://${hostname}:${port}`);
  });
});
