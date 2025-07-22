const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Get all comments for a post
router.get('/post/:postId', async (req, res) => {
  const { postId } = req.params;
  const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Create a new comment
router.post('/', async (req, res) => {
  const { post_id, user_id, content } = req.body;
  const { data, error } = await supabase.from('comments').insert([{ post_id, user_id, content }]);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Update a comment
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const { data, error } = await supabase.from('comments').update({ content }).eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('comments').delete().eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json({ message: 'Comment deleted successfully' });
  }
});

module.exports = router;
