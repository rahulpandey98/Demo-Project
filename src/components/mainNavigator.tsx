// src/MainNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Screen1 from './screens/screen1';
import Screen2 from './screens/screen2';
import Tab1Screen from './screens/tab1Screen';
import Tab2Screen from './screens/tab2Screen';
import Icon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#FF3659', // Color when tab is active
      inactiveTintColor: 'black', // Color when tab is inactive
      style: {
        borderTopWidth: 100, // Border width
        borderTopColor: 'red',

        // Border color
      },
    }}>
    <Tab.Screen
      name="Home"
      component={Tab1Screen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <Icon name="home" color={'#FF3659'} size={30} />
        ),
      }}
    />
    <Tab.Screen
      name="Favourite"
      component={Tab2Screen}
      options={{
        tabBarLabel: 'Favourite',
        tabBarIcon: ({color, size}) => (
          <Icon name="staro" color={'#FF3659'} size={30} />
        ),
      }}
    />
  </Tab.Navigator>
);

const MainNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Main"
      component={TabNavigator}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Screen1" component={Screen1} />
    <Stack.Screen name="Screen2" component={Screen2} />
  </Stack.Navigator>
);

export default MainNavigator;
