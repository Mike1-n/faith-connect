import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const register = async (email, password) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
  };
};
