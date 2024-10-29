const express = require('express');
const next = require('next');
const cors = require('cors'); 
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const furnitureRoutes = require('./src/app/api/furniture'); 
const apartmentRoutes = require('./src/app/api/apartment'); 
const messagesRoutes = require('./src/app/api/messages');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express(); 
  // const port =  5001;
  const httpServer = http.createServer(server);

  const io = socketIo(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  // Use JSON middleware
  server.use(express.json());

  // Use CORS middleware
  server.use(cors({
    origin: 'http://localhost:3000', 
  }));
  

  server.use('/api/furniture', furnitureRoutes); 
  server.use('/api/apartment', apartmentRoutes);
  server.use('/api/messages', messagesRoutes);


  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('message', (messageData) => {
      socket.broadcast.emit('message', messageData);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  // Catch all other requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = 5001;
  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on http://localhost:${port}`);
  });
});
