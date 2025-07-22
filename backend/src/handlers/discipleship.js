const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Get all discipleship tracks
router.get('/tracks', async (req, res) => {
  const { data, error } = await supabase.from('discipleship_tracks').select('*');
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Get a discipleship track by ID
router.get('/tracks/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('discipleship_tracks').select('*, steps:discipleship_track_steps(*)').eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Create a new discipleship track
router.post('/tracks', async (req, res) => {
  const { name, description } = req.body;
  const { data, error } = await supabase.from('discipleship_tracks').insert([{ name, description }]);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Create a new step for a discipleship track
router.post('/tracks/:id/steps', async (req, res) => {
  const { id } = req.params;
  const { name, description, order } = req.body;
  const { data, error } = await supabase.from('discipleship_track_steps').insert([{ track_id: id, name, description, order }]);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Get a user's discipleship tracks
router.get('/users/:userId/tracks', async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase.from('user_discipleship_tracks').select('*, track:discipleship_tracks(*)').eq('user_id', userId);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Start a discipleship track for a user
router.post('/users/:userId/tracks', async (req, res) => {
  const { userId } = req.params;
  const { track_id } = req.body;
  const { data, error } = await supabase.from('user_discipleship_tracks').insert([{ user_id: userId, track_id }]);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Update a user's progress on a discipleship track
router.put('/users/:userId/tracks/:trackId', async (req, res) => {
  const { userId, trackId } = req.params;
  const { completed_step_id } = req.body;
  const { data, error } = await supabase
    .from('user_discipleship_tracks')
    .update({ completed_step_id })
    .eq('user_id', userId)
    .eq('track_id', trackId);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

module.exports = router;
