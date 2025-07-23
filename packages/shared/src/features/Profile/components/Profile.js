import React from 'react';
import { View, Text, Image, StyleSheet, Button, FlatList } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../../Post/hooks/usePosts';
import PostCard from '../../Post/components/PostCard';

const Profile = () => {
  const { user, logout } = useAuth();
  const { posts } = usePosts();
  const userPosts = posts.filter((post) => post.user_id === user.id);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.user_metadata.avatar_url }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{user.user_metadata.full_name}</Text>
          <Button title="Logout" onPress={logout} />
        </View>
      </View>
      <FlatList
        data={userPosts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default Profile;
