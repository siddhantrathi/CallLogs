import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Report from './Report';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from './Config';
import Wv from './Webview';

const T = createBottomTabNavigator();

const Tab = () => {
  return (
    <T.Navigator
      screenOptions={{
        tabBarStyle: {height: '8%'},
      }}>
      <T.Screen
        name="Logs"
        component={Home}
        options={{
          tabBarIcon: tabInfo => (
            <Icon
              name="phone"
              size={30}
              color={tabInfo['focused'] ? '#2196f3' : '#5A5A5A'}
            />
          ),
          tabBarLabelStyle: {fontSize: 15, fontWeight: '700'},
        }}
      />
      <T.Screen
        name="Report"
        component={Report}
        options={{
          tabBarIcon: tabInfo => (
            <Icon
              name="line-chart"
              size={30}
              color={tabInfo['focused'] ? '#2196f3' : '#5A5A5A'}
            />
          ),
          tabBarLabelStyle: {fontSize: 15, fontWeight: '700'},
        }}
      />
      <T.Screen
        name="Config"
        component={Config}
        options={{
          tabBarIcon: tabInfo => (
            <Icon
              name="cog"
              size={30}
              color={tabInfo['focused'] ? '#2196f3' : '#5A5A5A'}
            />
          ),
          tabBarLabelStyle: {fontSize: 15, fontWeight: '700'},
          tabBarHideOnKeyboard: true,
        }}
      />
      <T.Screen
        name="Webview"
        component={Wv}
        options={{
          tabBarIcon: tabInfo => (
            <Icon
              name="cog"
              size={30}
              color={tabInfo['focused'] ? '#2196f3' : '#5A5A5A'}
            />
          ),
          tabBarLabelStyle: {fontSize: 15, fontWeight: '700'},
          tabBarHideOnKeyboard: true,
        }}
      />
    </T.Navigator>
  );
};

export default Tab;
