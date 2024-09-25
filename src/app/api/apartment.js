const express = require('express');
const router = express.Router();
const pool = require('../../../db'); 


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT al.*, bu.rating from public.apartment_listing al join public."business_user" bu on bu.user_id = al.user_id;');
    res.json(result.rows); 
  } catch (err) {
    console.error('Error fetching furniture data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router; 


