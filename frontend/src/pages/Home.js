import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import PostCard from '../components/PostCard';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  // Sample posts for demonstration if no posts exist
  const samplePosts = [
    {
      id: 1,
      user_id: '123',
      content: 'Blessed is the man who trusts in the Lord, whose confidence is in him.',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      user_id: '456',
      content: 'For I know the plans I have for you declares the Lord, plans to prosper you and not to harm you.',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      user_id: '789',
      content: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
      created_at: new Date().toISOString()
    }
  ];

  const displayPosts = posts.length > 0 ? posts : samplePosts;

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Stories Section */}
      <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Daily Devotionals</h3>
        <div className="flex space-x-4 overflow-x-auto">
          {[1, 2, 3, 4, 5].map((story) => (
            <div key={story} className="flex-shrink-0 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-faith-500 p-0.5 mb-2">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-lg">✝</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">Day {story}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-faith-500 flex items-center justify-center">
            <span className="text-white font-medium">U</span>
          </div>
          <input
            type="text"
            placeholder="Share your faith journey..."
            className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500"
          />
          <button className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-600 transition-colors">
            Share
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {displayPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* No Posts Message */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">✝</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to FaithConnect!</h3>
          <p className="text-gray-600">Start your spiritual journey by sharing your first post.</p>
        </div>
      )}
    </div>
  );
}

export default Home;