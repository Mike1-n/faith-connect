import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mrbpnamcpstxxyifuqyv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yYnBuYW1jcHN0eHh5aWZ1cXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTIzMTAsImV4cCI6MjA2ODY2ODMxMH0.bFKU3yrduRq_XM8_39QitwmEGLa_5nD-E_uA1DeuJNo';
const supabase = createClient(supabaseUrl, supabaseKey);

const EventScreen = ({ route }) => {
  const { id } = route.params;
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    getEvent();
    getAttendees();
  }, []);

  const getEvent = async () => {
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    if (error) {
      console.error(error);
    } else {
      setEvent(data);
    }
  };

  const getAttendees = async () => {
    const { data, error } = await supabase.from('event_attendees').select('users(*)').eq('event_id', id);
    if (error) {
      console.error(error);
    } else {
      setAttendees(data);
    }
  };

  const renderAttendee = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>{item.users.username}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {event && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{event.name}</Text>
          <Text>{event.description}</Text>
          <Text>
            {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}
          </Text>
        </View>
      )}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Attendees</Text>
      <FlatList
        data={attendees}
        renderItem={renderAttendee}
        keyExtractor={(item) => item.users.id}
      />
    </View>
  );
};

export default EventScreen;
