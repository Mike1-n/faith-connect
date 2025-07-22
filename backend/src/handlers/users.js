const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Get all users
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('users').select('*').eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  const { data, error } = await supabase.from('users').insert([{ username, email, password }]);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password, profile_picture, bio } = req.body;
  const { data, error } = await supabase
    .from('users')
    .update({ username, email, password, profile_picture, bio })
    .eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('users').delete().eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json({ message: 'User deleted successfully' });
  }
});

module.exports = router;
