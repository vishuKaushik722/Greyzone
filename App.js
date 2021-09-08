/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';

import AppNavigation from './src/navigation/AppNavigation';
import color from './src/constants/colors';
import store from './src/redux/store';

const App = props => (
  <Provider store={store}>
    <NavigationContainer>
        <PaperProvider>
          <View style={{ flex: 1 }}>
            <StatusBar
              translucent={true}
              barStyle="dark-content"
              hidden={false}
              backgroundColor={color.TILE}
            />
          <AppNavigation />
        </View>
      </PaperProvider>
    </NavigationContainer>
  </Provider>
);

export default App;
