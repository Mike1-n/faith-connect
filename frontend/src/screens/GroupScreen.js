import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mrbpnamcpstxxyifuqyv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yYnBuYW1jcHN0eHh5aWZ1cXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTIzMTAsImV4cCI6MjA2ODY2ODMxMH0.bFKU3yrduRq_XM8_39QitwmEGLa_5nD-E_uA1DeuJNo';
const supabase = createClient(supabaseUrl, supabaseKey);

const GroupScreen = ({ route }) => {
  const { id } = route.params;
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getGroup();
    getMembers();
  }, []);

  const getGroup = async () => {
    const { data, error } = await supabase.from('groups').select('*').eq('id', id).single();
    if (error) {
      console.error(error);
    } else {
      setGroup(data);
    }
  };

  const getMembers = async () => {
    const { data, error } = await supabase.from('group_members').select('users(*)').eq('group_id', id);
    if (error) {
      console.error(error);
    } else {
      setMembers(data);
    }
  };

  const renderMember = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>{item.users.username}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {group && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{group.name}</Text>
          <Text>{group.description}</Text>
        </View>
      )}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Members</Text>
      <FlatList
        data={members}
        renderItem={renderMember}
        keyExtractor={(item) => item.users.id}
      />
    </View>
  );
};

export default GroupScreen;
