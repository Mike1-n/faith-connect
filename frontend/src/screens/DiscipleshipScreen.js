import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mrbpnamcpstxxyifuqyv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yYnBuYW1jcHN0eHh5aWZ1cXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTIzMTAsImV4cCI6MjA2ODY2ODMxMH0.bFKU3yrduRq_XM8_39QitwmEGLa_5nD-E_uA1DeuJNo';
const supabase = createClient(supabaseUrl, supabaseKey);

const DiscipleshipScreen = () => {
  const [tracks, setTracks] = useState([]);
  const [userTracks, setUserTracks] = useState([]);

  useEffect(() => {
    getTracks();
    getUserTracks();
  }, []);

  const getTracks = async () => {
    const { data, error } = await supabase.from('discipleship_tracks').select('*');
    if (error) {
      console.error(error);
    } else {
      setTracks(data);
    }
  };

  const getUserTracks = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('user_discipleship_tracks')
      .select('*, track:discipleship_tracks(*)')
      .eq('user_id', user.id);
    if (error) {
      console.error(error);
    } else {
      setUserTracks(data);
    }
  };

  const handleStartTrack = async (trackId) => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('user_discipleship_tracks')
      .insert([{ user_id: user.id, track_id: trackId }]);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Track started!');
      getUserTracks();
    }
  };

  const renderTrack = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Button title="Start Track" onPress={() => handleStartTrack(item.id)} />
    </View>
  );

  const renderUserTrack = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.track.name}</Text>
      <Text>{item.track.description}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Discipleship</Text>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Available Tracks</Text>
        <FlatList
          data={tracks}
          renderItem={renderTrack}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Tracks</Text>
        <FlatList
          data={userTracks}
          renderItem={renderUserTrack}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default DiscipleshipScreen;
