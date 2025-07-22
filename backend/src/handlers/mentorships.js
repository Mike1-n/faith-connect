const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Get all mentorships for a user
router.get('/mentorships/:userId', async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase.from('mentorships').select('*').or(`mentor_id.eq.${userId},mentee_id.eq.${userId}`);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Create a new mentorship
router.post('/', async (req, res) => {
  const { mentor_id, mentee_id } = req.body;
  const { data, error } = await supabase.from('mentorships').insert([{ mentor_id, mentee_id }]);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Delete a mentorship
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('mentorships').delete().eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json({ message: 'Mentorship deleted successfully' });
  }
});

module.exports = router;
