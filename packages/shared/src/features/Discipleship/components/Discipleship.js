import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Discipleship() {
  const [tracks, setTracks] = useState([]);
  const [userTracks, setUserTracks] = useState([]);

  useEffect(() => {
    getTracks();
    getUserTracks();
  }, []);

  async function getTracks() {
    const { data, error } = await supabase.from('discipleship_tracks').select('*');
    if (error) {
      console.error(error);
    } else {
      setTracks(data);
    }
  }

  async function getUserTracks() {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('user_discipleship_tracks')
      .select('*, track:discipleship_tracks(*)')
      .eq('user_id', user.id);
    if (error) {
      console.error(error);
    } else {
      setUserTracks(data);
    }
  }

  async function handleStartTrack(trackId) {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('user_discipleship_tracks')
      .insert([{ user_id: user.id, track_id: trackId }]);
    if (error) {
      alert(error.message);
    } else {
      alert('Track started!');
      getUserTracks();
    }
  }

  return (
    <div>
      <h1>Discipleship</h1>
      <div>
        <h2>Available Tracks</h2>
        {tracks.map((track) => (
          <div key={track.id}>
            <h3>{track.name}</h3>
            <p>{track.description}</p>
            <button onClick={() => handleStartTrack(track.id)}>Start Track</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Your Tracks</h2>
        {userTracks.map((userTrack) => (
          <div key={userTrack.id}>
            <h3>{userTrack.track.name}</h3>
            <p>{userTrack.track.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discipleship;
