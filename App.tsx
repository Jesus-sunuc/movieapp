import React from 'react';
import { useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Home from './src/screens/Home/Home';

function App(): React.JSX.Element {

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Home />
    </GestureHandlerRootView>
  );
}

export default App;
