const express = require('express');
const next = require('next');
const path = require('path');
const cors = require('cors');
const furnitureRoutes = require('./src/app/api/furniture'); 
const apartmentRoutes = require('./src/app/api/apartment'); 

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express(); 
  const port = process.env.PORT || 5001;

  server.use(express.json());

  server.use(cors({
    origin: 'http://localhost:3000', 
  }));

  server.use('/api/furniture', furnitureRoutes); 
  server.use('/api/apartment', apartmentRoutes);

 
  server.all('*', (req, res) => {
    return handle(req, res);
  });

 
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on http://localhost:${port}`);
  });
});
