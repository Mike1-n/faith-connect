import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PostScreen from './src/screens/PostScreen';
import GroupScreen from './src/screens/GroupScreen';
import EventScreen from './src/screens/EventScreen';
import MentorshipScreen from './src/screens/MentorshipScreen';
import DiscipleshipScreen from './src/screens/DiscipleshipScreen';
import SpiritualGiftsAssessmentScreen from './src/screens/SpiritualGiftsAssessmentScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Group" component={GroupScreen} />
        <Stack.Screen name="Event" component={EventScreen} />
        <Stack.Screen name="Mentorship" component={MentorshipScreen} />
        <Stack.Screen name="Discipleship" component={DiscipleshipScreen} />
        <Stack.Screen
          name="SpiritualGiftsAssessment"
          component={SpiritualGiftsAssessmentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
