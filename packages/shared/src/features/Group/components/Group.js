import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Group() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getGroup();
    getMembers();
  }, []);

  async function getGroup() {
    const { data, error } = await supabase.from('groups').select('*').eq('id', id);
    if (error) {
      console.error(error);
    } else {
      setGroup(data[0]);
    }
  }

  async function getMembers() {
    const { data, error } = await supabase.from('group_members').select('users(*)').eq('group_id', id);
    if (error) {
      console.error(error);
    } else {
      setMembers(data);
    }
  }

  return (
    <div>
      {group && (
        <div>
          <h1>{group.name}</h1>
          <p>{group.description}</p>
        </div>
      )}
      <h2>Members</h2>
      {members.map((member) => (
        <div key={member.users.id}>
          <p>{member.users.username}</p>
        </div>
      ))}
    </div>
  );
}

export default Group;
