// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/components/mainNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  </Provider>
);

export default App;
