import { StatusBar, useColorScheme, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from './screens/Home_screen';
import { CalendarScreen } from './screens/Calendar_screen';
import { LibraryScreen } from './screens/Library_screen';
import { MyPageScreen } from './screens/MyPage_screen';

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
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen name="HOME" component={HomeScreen} />
      <Tab.Screen name="CALENDAR" component={CalendarScreen} />
      <Tab.Screen name="LIBRARY" component={LibraryScreen} />
      <Tab.Screen name="MY PAGE" component={MyPageScreen} />
    </Tab.Navigator>
  );
}



export default App;
