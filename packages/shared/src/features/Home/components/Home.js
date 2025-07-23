import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { usePosts } from '../../Post/hooks/usePosts';
import PostCard from '../../Post/components/PostCard';

const Home = () => {
  const { posts, loading } = usePosts();

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
