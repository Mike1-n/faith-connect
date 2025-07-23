import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { usePosts } from '../../Post/hooks/usePosts';
import PostCard from '../../Post/components/PostCard';

const Home = () => {
  const { posts, loading } = usePosts();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
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
});

export default Home;
