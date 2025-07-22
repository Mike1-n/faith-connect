const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Get all events
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('events').select('*');
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Get an event by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('events').select('*').eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Create a new event
router.post('/', async (req, res) => {
  const { name, description, start_time, end_time } = req.body;
  const { data, error } = await supabase.from('events').insert([{ name, description, start_time, end_time }]);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, start_time, end_time } = req.body;
  const { data, error } = await supabase
    .from('events')
    .update({ name, description, start_time, end_time })
    .eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('events').delete().eq('id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json({ message: 'Event deleted successfully' });
  }
});

// Get all attendees for an event
router.get('/:id/attendees', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('event_attendees').select('users(*)').eq('event_id', id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Add an attendee to an event
router.post('/:id/attendees', async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  const { data, error } = await supabase.from('event_attendees').insert([{ event_id: id, user_id }]);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data[0]);
  }
});

// Remove an attendee from an event
router.delete('/:id/attendees/:userId', async (req, res) => {
  const { id, userId } = req.params;
  const { data, error } = await supabase.from('event_attendees').delete().eq('event_id', id).eq('user_id', userId);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json({ message: 'Attendee removed successfully' });
  }
});

module.exports = router;
