const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Get all followers for a user
router.get('/followers/:userId', async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase.from('followers').select('*').eq('following_id', userId);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Get all following for a user
router.get('/following/:userId', async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase.from('followers').select('*').eq('follower_id', userId);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Create a new follower
router.post('/', async (req, res) => {
  const { follower_id, following_id } = req.body;
  const { data, error } = await supabase.from('followers').insert([{ follower_id, following_id }]);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Delete a follower
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('followers').delete().eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json({ message: 'Follower deleted successfully' });
  }
});

module.exports = router;
