const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Get all groups
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('groups').select('*');
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Get a group by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('groups').select('*').eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Create a new group
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  const { data, error } = await supabase.from('groups').insert([{ name, description }]);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Update a group
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const { data, error } = await supabase.from('groups').update({ name, description }).eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Delete a group
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('groups').delete().eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json({ message: 'Group deleted successfully' });
  }
});

// Get all members of a group
router.get('/:id/members', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('group_members').select('users(*)').eq('group_id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Add a member to a group
router.post('/:id/members', async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  const { data, error } = await supabase.from('group_members').insert([{ group_id: id, user_id }]);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Remove a member from a group
router.delete('/:id/members/:userId', async (req, res) => {
  const { id, userId } = req.params;
  const { data, error } = await supabase.from('group_members').delete().eq('group_id', id).eq('user_id', userId);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json({ message: 'Member removed successfully' });
  }
});

module.exports = router;
