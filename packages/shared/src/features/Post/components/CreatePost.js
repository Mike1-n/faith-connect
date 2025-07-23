import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../Auth/hooks/useAuth';

const CreatePost = ({ navigation }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const { user } = useAuth();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleCreatePost = async () => {
    const response = await fetch(image);
    const blob = await response.blob();
    const fileName = image.split('/').pop();
    const { data, error } = await supabase.storage
      .from('posts')
      .upload(`${user.id}/${fileName}`, blob, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      alert(error.message);
      return;
    }

    const { data: post, error: postError } = await supabase.from('posts').insert([
      {
        user_id: user.id,
        image_url: data.Key,
        caption,
      },
    ]);

    if (postError) {
      alert(postError.message);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TextInput
        style={styles.input}
        placeholder="Write a caption..."
        value={caption}
        onChangeText={setCaption}
      />
      <Button title="Create Post" onPress={handleCreatePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fafafa',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  input: {
    height: 100,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default CreatePost;
