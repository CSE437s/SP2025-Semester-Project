const express = require('express');
const router = express.Router();
const pool = require('../../../db'); // Adjust path as needed

// Endpoint to get messages between two users
router.get('/', async (req, res) => {
  const { senderId, recipientId } = req.query;

  try {
    const result = await pool.query(
      `SELECT * FROM public.messages
       WHERE (sender_id = $1 AND recipient_id = $2)
          OR (sender_id = $2 AND recipient_id = $1)
       ORDER BY timestamp ASC`, 
      [senderId, recipientId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/conversations', async (req, res) => {
    const { userId } = req.query;
  
    try {
      const result = await pool.query(
        `SELECT DISTINCT ON (CASE WHEN sender_id = $1 THEN recipient_id ELSE sender_id END) *
         FROM public.messages
         WHERE sender_id = $1 OR recipient_id = $1
         ORDER BY timestamp DESC`,
        [userId]
      );
  
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.post('/', async (req, res) => {
  const { sender_id, recipient_id, message_text } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO public.messages (sender_id, recipient_id, message_text, timestamp)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [sender_id, recipient_id, message_text]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error posting message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
