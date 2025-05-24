import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Home from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from './src/screens/Search';
import WishList from './src/screens/WishList';
import Profile from './src/screens/Profile';
import {ThemeProvider, useTheme} from './src/utils/theme/ThemeContext';
import {darkTheme, lightTheme} from './src/utils/theme/theme';

const Tab = createBottomTabNavigator();

function AppContent(): React.JSX.Element {
  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <NavigationContainer theme={{
        colors: {
          ...theme.colors,
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.card,
          text: theme.colors.text,
          border: theme.colors.border,
        },
        dark: isDarkMode,
        fonts: theme.fonts,
      }}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.colors.tabBar,
              borderTopWidth: 0,
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.tabBarInactive,
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

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
