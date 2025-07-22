const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Get all likes for a post
router.get('/post/:postId', async (req, res) => {
  const { postId } = req.params;
  const { data, error } = await supabase.from('likes').select('*').eq('post_id', postId);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Create a new like
router.post('/', async (req, res) => {
  const { post_id, user_id } = req.body;
  const { data, error } = await supabase.from('likes').insert([{ post_id, user_id }]);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Delete a like
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('likes').delete().eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json({ message: 'Like deleted successfully' });
  }
});

module.exports = router;
