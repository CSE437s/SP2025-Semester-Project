const express = require('express');
const router = express.Router();
const pool = require('../../../db'); // Adjust path as needed

// Endpoint to get messages between two users
router.get('/', async (req, res) => {
  const { senderId, recipientId } = req.query;
console.log(senderId);
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
        `SELECT DISTINCT ON (conversation_partner) *
         FROM (
           SELECT 
             CASE WHEN sender_id = $1 THEN recipient_id ELSE sender_id END AS conversation_partner,
             sender_id,
             recipient_id,
             message_text,
             "timestamp"
           FROM public.messages
           WHERE sender_id = $1 OR recipient_id = $1
           ORDER BY 
             CASE WHEN sender_id = $1 THEN recipient_id ELSE sender_id END, 
             "timestamp" DESC
         ) AS subquery
         ORDER BY conversation_partner, "timestamp" DESC`,
        [userId]
      );
      console.log(result.rows);
  
      res.json(result.rows);
      
    } catch (error) {
      console.error('Error fetching conversations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.post('/', async (req, res) => {
  const { sender_id, recipient_id, message_text } = req.body;

try {
  // Check if sender and recipient exist
  const checkSender = await pool.query('SELECT id FROM public."User" WHERE id = $1', [sender_id]);
  const checkRecipient = await pool.query('SELECT id FROM public."User" WHERE id = $1', [recipient_id]);
  
  if (checkSender.rowCount === 0) {
    return res.status(400).json({ error: `Sender ID ${sender_id} does not exist.` });
  }
  
  if (checkRecipient.rowCount === 0) {
    return res.status(400).json({ error: `Recipient ID ${recipient_id} does not exist.` });
  }

  // Insert the message
  const result = await pool.query(
    `INSERT INTO public.messages (sender_id, recipient_id, message_text, timestamp)
     VALUES ($1, $2, $3, NOW())
     RETURNING *`,
    [sender_id, recipient_id, message_text]
  );

  // Send back the saved message
  return res.status(201).json(result.rows[0]);
} catch (error) {
  console.error("Error inserting message:", error);
  return res.status(500).json({ error: "Internal Server Error" });
}
});

module.exports = router;
