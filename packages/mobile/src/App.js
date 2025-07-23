import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../shared/src/features/Home/components/Home';
import LoginScreen from '../../shared/src/features/Login/components/Login';
import RegisterScreen from '../../shared/src/features/Register/components/Register';
import ProfileScreen from '../../shared/src/features/Profile/components/Profile';
import PostScreen from '../../shared/src/features/Post/components/Post';
import GroupScreen from '../../shared/src/features/Group/components/Group';
import EventScreen from '../../shared/src/features/Event/components/Event';
import MentorshipScreen from '../../shared/src/features/Mentorship/components/Mentorship';
import DiscipleshipScreen from '../../shared/src/features/Discipleship/components/Discipleship';
import SpiritualGiftsAssessmentScreen from '../../shared/src/features/SpiritualGiftsAssessment/components/SpiritualGiftsAssessment';

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
