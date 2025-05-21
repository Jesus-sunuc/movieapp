import React from 'react';
import {ScrollView, StatusBar, useColorScheme, View} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import Home from './src/screens/Home/Home';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const safePadding = '5%';

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView style={backgroundStyle}>
          <Header />
          <View>
            <Home />
          </View>

      </ScrollView>
    </View>
  );
}

export default App;
