import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mrbpnamcpstxxyifuqyv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yYnBuYW1jcHN0eHh5aWZ1cXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTIzMTAsImV4cCI6MjA2ODY2ODMxMH0.bFKU3yrduRq_XM8_39QitwmEGLa_5nD-E_uA1DeuJNo';
const supabase = createClient(supabaseUrl, supabaseKey);

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error(error);
    } else {
      setPosts(data);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Post', { id: item.id })}>
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text style={{ fontSize: 18 }}>{item.content}</Text>
        <Text>By {item.user_id}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;
