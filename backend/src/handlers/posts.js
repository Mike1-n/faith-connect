const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Get all posts
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('posts').select('*');
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Get a post by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('posts').select('*').eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const { user_id, content } = req.body;
  const { data, error } = await supabase.from('posts').insert([{ user_id, content }]);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const { data, error } = await supabase.from('posts').update({ content }).eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('posts').delete().eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json({ message: 'Post deleted successfully' });
  }
});

module.exports = router;
