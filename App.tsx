import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Home from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from './src/screens/Search';
import WishList from './src/screens/WishList';
import Profile from './src/screens/Profile';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen 
            name="Home" 
            component={Home}
          />
          <Tab.Screen 
            name="Search" 
            component={Search}
          />
          <Tab.Screen 
            name="WishList" 
            component={WishList}
          />
          <Tab.Screen 
            name="Profile" 
            component={Profile}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
