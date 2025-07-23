import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Event() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    getEvent();
    getAttendees();
  }, []);

  async function getEvent() {
    const { data, error } = await supabase.from('events').select('*').eq('id', id);
    if (error) {
      console.error(error);
    } else {
      setEvent(data[0]);
    }
  }

  async function getAttendees() {
    const { data, error } = await supabase.from('event_attendees').select('users(*)').eq('event_id', id);
    if (error) {
      console.error(error);
    } else {
      setAttendees(data);
    }
  }

  return (
    <div>
      {event && (
        <div>
          <h1>{event.name}</h1>
          <p>{event.description}</p>
          <p>
            {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}
          </p>
        </div>
      )}
      <h2>Attendees</h2>
      {attendees.map((attendee) => (
        <div key={attendee.users.id}>
          <p>{attendee.users.username}</p>
        </div>
      ))}
    </div>
  );
}

export default Event;
