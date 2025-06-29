import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from './screens/Home_screen';
import { ProfileScreen } from './screens/Profile_screen';

function App() {
  return (
    <NavigationContainer>
      <RootTab />
    </NavigationContainer>

  );
}

const Tab = createBottomTabNavigator();

function RootTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({

});

export default App;
