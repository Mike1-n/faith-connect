import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('posts').select(`
        *,
        user:users(*)
      `);
      if (error) {
        alert(error.message);
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    getPosts();
  }, []);

  return {
    posts,
    loading,
  };
};
