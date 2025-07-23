import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mrbpnamcpstxxyifuqyv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yYnBuYW1jcHN0eHh5aWZ1cXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTIzMTAsImV4cCI6MjA2ODY2ODMxMH0.bFKU3yrduRq_XM8_39QitwmEGLa_5nD-E_uA1DeuJNo';
const supabase = createClient(supabaseUrl, supabaseKey);

const ProfileScreen = ({ route }) => {
  const { id } = route.params;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  const getUser = async () => {
    const { data, error } = await supabase.from('users').select('*').eq('id', id);
    if (error) {
      console.error(error);
    } else {
      setUser(data[0]);
    }
  };

  const getPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*').eq('user_id', id);
    if (error) {
      console.error(error);
    } else {
      setPosts(data);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {user && (
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Image
            source={{ uri: user.profile_picture || 'https://via.placeholder.com/150' }}
            style={{ width: 150, height: 150, borderRadius: 75 }}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>{user.username}</Text>
          <Text style={{ fontSize: 16, color: 'gray' }}>{user.bio}</Text>
        </View>
      )}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Posts</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ProfileScreen;
