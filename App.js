import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PostScreen from './screens/PostScreen';
import GroupScreen from './screens/GroupScreen';
import EventScreen from './screens/EventScreen';
import MentorshipScreen from './screens/MentorshipScreen';
import DiscipleshipScreen from './screens/DiscipleshipScreen';
import SpiritualGiftsAssessmentScreen from './screens/SpiritualGiftsAssessmentScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
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
