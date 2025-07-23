import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../shared/src/features/Home/components/Home';
import ProfileScreen from '../../shared/src/features/Profile/components/Profile';
import CreatePostScreen from '../../shared/src/features/Post/components/CreatePost';

const Tab = createBottomTabNavigator();

const DummyComponent = () => null;

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="CreatePost"
        component={DummyComponent}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('CreatePostModal');
          },
        })}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
