import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Mentorship() {
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedMentee, setSelectedMentee] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error(error);
    } else {
      setUsers(data);
    }
  }

  async function getMentorships(userId) {
    const { data, error } = await supabase
      .from('mentorships')
      .select(
        `
        *,
        mentor:mentor_id (
          id,
          username
        ),
        mentee:mentee_id (
          id,
          username
        )
      `
      )
      .or(`mentor_id.eq.${userId},mentee_id.eq.${userId}`);
    if (error) {
      console.error(error);
    } else {
      setMentors(data.filter((m) => m.mentee_id === userId));
      setMentees(data.filter((m) => m.mentor_id === userId));
    }
  }

  async function handleRequestMentorship() {
    if (!selectedMentor || !selectedMentee) {
      alert('Please select a mentor and a mentee');
      return;
    }

    const { data, error } = await supabase
      .from('mentorships')
      .insert([{ mentor_id: selectedMentor, mentee_id: selectedMentee }]);
    if (error) {
      alert(error.message);
    } else {
      alert('Mentorship request sent!');
    }
  }

  return (
    <div>
      <h1>Mentorship</h1>
      <div>
        <h2>Your Mentors</h2>
        {mentors.map((mentor) => (
          <div key={mentor.id}>{mentor.mentor.username}</div>
        ))}
      </div>
      <div>
        <h2>Your Mentees</h2>
        {mentees.map((mentee) => (
          <div key={mentee.id}>{mentee.mentee.username}</div>
        ))}
      </div>
      <div>
        <h2>Request Mentorship</h2>
        <div>
          <label>Mentor:</label>
          <select onChange={(e) => setSelectedMentor(e.target.value)}>
            <option value="">Select a mentor</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Mentee:</label>
          <select onChange={(e) => setSelectedMentee(e.target.value)}>
            <option value="">Select a mentee</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleRequestMentorship}>Request Mentorship</button>
      </div>
    </div>
  );
}

export default Mentorship;
