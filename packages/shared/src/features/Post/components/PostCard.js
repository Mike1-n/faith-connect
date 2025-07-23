import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PostCard = ({ post }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: post.user.avatar_url }} style={styles.avatar} />
        <Text style={styles.username}>{post.user.username}</Text>
      </View>
      <Image source={{ uri: post.image_url }} style={styles.image} />
      <View style={styles.footer}>
        <Text style={styles.caption}>{post.caption}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 400,
  },
  footer: {
    padding: 16,
  },
  caption: {
    fontSize: 16,
  },
});

export default PostCard;
