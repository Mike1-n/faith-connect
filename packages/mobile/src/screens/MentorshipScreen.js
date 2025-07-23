import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mrbpnamcpstxxyifuqyv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yYnBuYW1jcHN0eHh5aWZ1cXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTIzMTAsImV4cCI6MjA2ODY2ODMxMH0.bFKU3yrduRq_XM8_39QitwmEGLa_5nD-E_uA1DeuJNo';
const supabase = createClient(supabaseUrl, supabaseKey);

const MentorshipScreen = () => {
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedMentee, setSelectedMentee] = useState(null);

  useEffect(() => {
    getUsers();
    getMentorships();
  }, []);

  const getUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error(error);
    } else {
      setUsers(data);
    }
  };

  const getMentorships = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('mentorships')
      .select(
        `
        *,
        mentor:mentor_id (
          id,
          username
        ),
        mentee:mentee_id (
          id,
          username
        )
      `
      )
      .or(`mentor_id.eq.${user.id},mentee_id.eq.${user.id}`);
    if (error) {
      console.error(error);
    } else {
      setMentors(data.filter((m) => m.mentee_id === user.id));
      setMentees(data.filter((m) => m.mentor_id === user.id));
    }
  };

  const handleRequestMentorship = async () => {
    if (!selectedMentor || !selectedMentee) {
      Alert.alert('Please select a mentor and a mentee');
      return;
    }

    const { data, error } = await supabase
      .from('mentorships')
      .insert([{ mentor_id: selectedMentor, mentee_id: selectedMentee }]);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Mentorship request sent!');
      getMentorships();
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Mentorship</Text>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Mentors</Text>
        <FlatList
          data={mentors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.mentor.username}</Text>}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Mentees</Text>
        <FlatList
          data={mentees}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.mentee.username}</Text>}
        />
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Request Mentorship</Text>
        {/* Note: A Picker would be better here, but for simplicity we'll use text inputs */}
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
          placeholder="Mentor User ID"
          onChangeText={setSelectedMentor}
        />
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
          placeholder="Mentee User ID"
          onChangeText={setSelectedMentee}
        />
        <Button title="Request Mentorship" onPress={handleRequestMentorship} />
      </View>
    </View>
  );
};

export default MentorshipScreen;
