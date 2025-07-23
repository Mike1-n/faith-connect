import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPost();
    getComments();
  }, []);

  async function getPost() {
    const { data, error } = await supabase.from('posts').select('*').eq('id', id);
    if (error) {
      console.error(error);
    } else {
      setPost(data[0]);
    }
  }

  async function getComments() {
    const { data, error } = await supabase.from('comments').select('*').eq('post_id', id);
    if (error) {
      console.error(error);
    } else {
      setComments(data);
    }
  }

  return (
    <div>
      {post && (
        <div>
          <h1>{post.content}</h1>
          <p>By {post.user_id}</p>
        </div>
      )}
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <p>By {comment.user_id}</p>
        </div>
      ))}
    </div>
  );
}

export default Post;
