import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Home from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from './src/screens/Search';
import WishList from './src/screens/WishList';
import Profile from './src/screens/Profile';
import {useTheme} from './src/utils/theme/ThemeContext';
import {darkTheme, lightTheme} from './src/utils/theme/theme';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

const Tab = createBottomTabNavigator();

const iconMap: any = {
  Home: 'house-user',
  Search: 'search',
  WishList: 'stream',
  Profile: 'user',
};

function Router(): React.JSX.Element {
  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <GestureHandlerRootView
      style={{flex: 1, backgroundColor: theme.colors.background}}>
      <NavigationContainer
        theme={{
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
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.colors.tabBar,
              borderTopWidth: 0,
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.tabBarInactive,
            tabBarIcon: ({color, size}) => (
              <FontAwesome5
                name={iconMap[route.name]}
                color={color}
                size={size}
                iconStyle="solid"
              />
            ),
          })}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="WishList" component={WishList} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default Router;
