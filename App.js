import 'react-native-gesture-handler';
import * as React from 'react';
import {Dimensions} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Transition } from 'react-native-reanimated';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import {createAppContainer} from "react-navigation"
import SettingsScreen from './src/screens/SettingsScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Provider} from './src/context/Context';
import SplashScreen from './src/screens/SplashScreen';

let WIDTH_RATIO = Dimensions.get("window").width/392.72727272727275;

  Tab = createBottomTabNavigator();
  const TabScreens =()=>{ 
    return <NavigationContainer>
        <Tab.Navigator
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
              return <Icon name={iconName} size={!focused?30*WIDTH_RATIO:35*WIDTH_RATIO} color={color} />;
            },
          })}
          tabBarOptions={{
            activeBackgroundColor : "#131313",
            inactiveBackgroundColor  :"#131313",
            activeTintColor: '#02CC99',
            inactiveTintColor: '#C4C4C4',
            showLabel : false,
            style : {height : "8%"},
          }}
        >
          <Tab.Screen name = "Home" component ={HomeScreen}/>
          <Tab.Screen name = "Bookmark" component ={BookmarkScreen}/>
          <Tab.Screen name = "Settings" component ={SettingsScreen}/>
        </Tab.Navigator>
    </NavigationContainer>
        }
        const  App =createAppContainer(createAnimatedSwitchNavigator(
          {
            SplashScreen : SplashScreen,
            TabScreens  : TabScreens
          },
          {
            // The previous screen will slide to the bottom while the next screen will fade in
            transition: (
              <Transition.Together>
                <Transition.Out
                  type="slide-bottom"
                  durationMs={400}
                  interpolation="easeIn"
                />
                <Transition.In type="fade" durationMs={500} />
              </Transition.Together>
            ),
          }
        ));

export default ()=>{return <Provider><App/></Provider>}