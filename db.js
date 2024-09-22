const { Pool } = require('pg');

const pool = new Pool({
  user: 'cse437group5', 
  host: 'localhost',    
  database: 'subletifydev', 
  password: 'swe workshop',  
  port: 5432,            // PostgreSQL port not our server
});

module.exports = pool; 
