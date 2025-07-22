const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Get all spiritual gifts
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('spiritual_gifts').select('*');
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Get all questions for the spiritual gift assessment
router.get('/assessment/questions', async (req, res) => {
  const { data, error } = await supabase.from('spiritual_gift_assessment_questions').select('*');
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Submit answers for the spiritual gift assessment
router.post('/assessment/answers', async (req, res) => {
  const { user_id, answers } = req.body;
  const { data, error } = await supabase.from('user_spiritual_gift_assessment_answers').insert(
    answers.map((answer) => ({
      user_id,
      question_id: answer.question_id,
      answer: answer.answer,
    }))
  );
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Get a user's spiritual gift assessment results
router.get('/assessment/results/:userId', async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase
    .from('user_spiritual_gift_assessment_answers')
    .select(
      `
      answer,
      question:spiritual_gift_assessment_questions (
        gift:spiritual_gifts (
          name
        )
      )
    `
    )
    .eq('user_id', userId);

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    const results = data.reduce((acc, curr) => {
      const giftName = curr.question.gift.name;
      if (!acc[giftName]) {
        acc[giftName] = 0;
      }
      acc[giftName] += curr.answer;
      return acc;
    }, {});
    res.json(results);
  }
});

module.exports = router;
