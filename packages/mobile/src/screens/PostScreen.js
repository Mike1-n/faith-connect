import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mrbpnamcpstxxyifuqyv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yYnBuYW1jcHN0eHh5aWZ1cXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTIzMTAsImV4cCI6MjA2ODY2ODMxMH0.bFKU3yrduRq_XM8_39QitwmEGLa_5nD-E_uA1DeuJNo';
const supabase = createClient(supabaseUrl, supabaseKey);

const PostScreen = ({ route }) => {
  const { id } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPost();
    getComments();
  }, []);

  const getPost = async () => {
    const { data, error } = await supabase.from('posts').select('*, user:users(username)').eq('id', id).single();
    if (error) {
      console.error(error);
    } else {
      setPost(data);
    }
  };

  const getComments = async () => {
    const { data, error } = await supabase.from('comments').select('*, user:users(username)').eq('post_id', id);
    if (error) {
      console.error(error);
    } else {
      setComments(data);
    }
  };

  const renderComment = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>{item.content}</Text>
      <Text>By {item.user.username}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {post && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{post.content}</Text>
          <Text>By {post.user.username}</Text>
        </View>
      )}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Comments</Text>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default PostScreen;
