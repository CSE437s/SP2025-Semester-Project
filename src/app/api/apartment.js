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

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT al.*, bu.rating 
       FROM public.apartment_listing al
       JOIN public."business_user" bu ON bu.user_id = al."user_id" 
       WHERE al.id = ${id}`
    );    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Listing item not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error fetching listing item:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router; 


