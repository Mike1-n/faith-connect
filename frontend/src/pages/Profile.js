import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  async function getUser() {
    const { data, error } = await supabase.from('users').select('*').eq('id', id);
    if (error) {
      console.error(error);
    } else {
      setUser(data[0]);
    }
  }

  async function getPosts() {
    const { data, error } = await supabase.from('posts').select('*').eq('user_id', id);
    if (error) {
      console.error(error);
    } else {
      setPosts(data);
    }
  }

  return (
    <div>
      {user && (
        <div>
          <h1>{user.username}</h1>
          <img src={user.profile_picture} alt={user.username} />
          <p>{user.bio}</p>
        </div>
      )}
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;
