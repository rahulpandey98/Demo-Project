import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Screen1 from './screens/screen1';
import Screen2 from './screens/screen2';
import Tab1Screen from './screens/tab1Screen';
import Tab2Screen from './screens/tab2Screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabIcon = ({focused, iconName, color, size}: any) => {
  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      {focused && (
        <View
          style={{
            position: 'absolute',
            top: -8,
            width: '100%',
            height: 2,
            backgroundColor: '#FF3659',
          }}
        />
      )}
      <Icon name={iconName} color={'#FF3659'} size={size} />
    </View>
  );
};

const CustomHOmeTabIcon = ({focused, iconName, color, size}: any) => {
  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      {focused && (
        <View
          style={{
            position: 'absolute',
            top: -8,
            width: '100%',
            height: 2,
            backgroundColor: '#FF3659',
          }}
        />
      )}
      <Icons name={iconName} color={'#FF3659'} size={size} />
    </View>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#FF3659',
      tabBarInactiveTintColor: '#FF3659',
      tabBarStyle: {
        height: 60,
      },
    }}>
    <Tab.Screen
      name="Home"
      component={Tab1Screen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size, focused}) => (
          <CustomHOmeTabIcon
            iconName={focused ? 'home' : 'home-outline'}
            focused={focused}
            color={color}
            size={30}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Favourite"
      component={Tab2Screen}
      options={{
        tabBarLabel: 'Favourite',
        tabBarIcon: ({color, focused}) => (
          <CustomTabIcon
            iconName={focused ? 'star' : 'staro'}
            focused={focused}
            color={color}
            size={30}
          />
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
