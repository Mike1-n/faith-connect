import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../../shared/src/features/Auth/hooks/useAuth';
import LoginScreen from '../../shared/src/features/Auth/components/Login';
import RegisterScreen from '../../shared/src/features/Auth/components/Register';
import TabNavigator from './navigation/TabNavigator';
import CreatePostScreen from '../../shared/src/features/Post/components/CreatePost';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  const AppStack = () => (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={AppStack}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="CreatePostModal" component={CreatePostScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
