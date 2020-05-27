import 'react-native-gesture-handler';
import * as React from 'react';
import {Dimensions} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';
import Icons from 'react-native-vector-icons/Ionicons';

export default function App() {
  Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
        <Tab.Navigator
          defaultNavigationOptions = {{bottomTabs: {hideShadow :true}}}
          initialRouteName = "Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'md-home';
              } else if (route.name === 'Settings') {
                iconName = 'md-settings'
              }
              else if(route.name === 'Bookmark')
              {
                iconName = 'md-bookmark';
              }
              return <Icons name={iconName} size={!focused?28:33} color={color} />;
            },
          })}
          tabBarOptions={{
            activeBackgroundColor : "#131313",
            inactiveBackgroundColor  :"#131313",
            activeTintColor: '#02CC99',
            inactiveTintColor: '#C4C4C4',
            showLabel : false,
            style : {height : "7%"},
          }}
        >
          <Tab.Screen name = "Home" component ={HomeScreen}/>
          <Tab.Screen name = "Bookmark" component ={BookmarkScreen}/>
          <Tab.Screen name = "Settings" component ={SettingsScreen}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
}