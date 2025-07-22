import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function SpiritualGiftsAssessment() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    const { data, error } = await supabase.from('spiritual_gift_assessment_questions').select('*');
    if (error) {
      console.error(error);
    } else {
      setQuestions(data);
    }
  }

  async function handleSubmit() {
    const { data: { user } } = await supabase.auth.getUser()
    const answersToSubmit = Object.keys(answers).map((questionId) => ({
      question_id: questionId,
      answer: answers[questionId],
    }));

    const { error } = await supabase.from('user_spiritual_gift_assessment_answers').insert(
      answersToSubmit.map((answer) => ({
        user_id: user.id,
        ...answer,
      }))
    );

    if (error) {
      alert(error.message);
    } else {
      getResults(user.id);
    }
  }

  async function getResults(userId) {
    const { data, error } = await supabase.rpc('get_spiritual_gift_results', { user_id: userId });
    if (error) {
      console.error(error);
    } else {
      setResults(data);
    }
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  return (
    <div>
      <h1>Spiritual Gifts Assessment</h1>
      {results ? (
        <div>
          <h2>Results</h2>
          <ul>
            {Object.keys(results).map((gift) => (
              <li key={gift}>
                {gift}: {results[gift]}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          {questions.map((question) => (
            <div key={question.id}>
              <p>{question.question}</p>
              <input
                type="range"
                min="1"
                max="5"
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              />
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default SpiritualGiftsAssessment;
