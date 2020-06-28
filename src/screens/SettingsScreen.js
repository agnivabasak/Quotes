/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, ScrollView,StyleSheet,TouchableOpacity,Dimensions,Text} from 'react-native';
import AccordionListItem from '../components/AccordionListItem';
import ListItem from '../components/ListItem';
import { web} from 'react-native-communications';
let WIDTH = Dimensions.get('window').width;
let WIDTH_RATIO = WIDTH / 392.72727272727275;
let HEIGHT = Dimensions.get('window').height;

const SettingsScreen = () => {
  return <ScrollView style={styles.Screen}>
      <AccordionListItem title= "Contact Us"/>
         <ListItem title= "About App" data="This is a basic quotes app created using react native .
         It is a project made in an attempt to learn cross platform app development using react native.
         The major focus of this app has been to make the app as user friendly as possible with the help of clean UI/UX , which in turn helped me in learning
         PanResponder and the Animated API in react native. "/>
         <TouchableOpacity activeOpacity = {0.5} onPress={()=>{web('https://github.com/agnivabasak/Quotes');}}>
             <View style ={styles.supportStyle}>
                <Text style={styles.supportTextStyle}>Support Project</Text>
             </View>
         </TouchableOpacity>
  </ScrollView>;
};

const styles = StyleSheet.create({
  Screen: {
    backgroundColor: '#212121',
    flex: 1,
  },
  supportStyle : {
    backgroundColor : '#333333',
    marginVertical : (8 / 360) * HEIGHT,
    height: (25 / 360) * HEIGHT,
    alignItems : 'center',
    justifyContent : 'center',
  },
  supportTextStyle :{
    color: '#E2E2E2',
    fontFamily : 'Podkova-SemiBold',
    fontSize: 24 * WIDTH_RATIO,
  },
});

export default SettingsScreen;
