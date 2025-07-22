import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error(error);
    } else {
      setPosts(data);
    }
  }

  return (
    <div>
      <h1>Home</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>
            <Link to={`/post/${post.id}`}>{post.content}</Link>
          </h2>
          <p>By {post.user_id}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
