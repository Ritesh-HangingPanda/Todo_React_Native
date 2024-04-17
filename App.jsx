import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Home } from './src';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (<EvilIcons name='navicon' size={30} color={'black'} />)
        }}
      >
        <Stack.Screen name="React Native" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;