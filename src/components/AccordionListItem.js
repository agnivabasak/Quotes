/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
//for contact info
import * as React from 'react';
import {useRef,useState} from 'react';
import {View,StyleSheet,Animated,Dimensions,TouchableOpacity} from 'react-native';
import ContactCard from './ContactCard';
import Icon from 'react-native-vector-icons/Ionicons';


let WIDTH = Dimensions.get('window').width;
let WIDTH_RATIO = WIDTH / 392.72727272727275;
let HEIGHT = Dimensions.get('window').height;

export default function AccordionListItem ({title}){
    const height = useRef(new Animated.Value(0)).current;
    const [open,setState] = useState(false);
    const openList = ()=>{
        setState(true);
        Animated.timing(height,{
            toValue: (80 / 360) * HEIGHT,
            duration : 300,
            useNativeDriver : false,
        }).start();
    };
    const closeList = ()=>{
        setState(false);
        Animated.timing(height,{
            toValue: 0,
            duration : 300,
            useNativeDriver : false,
        }).start();
    };
    const rotatechevron = height.interpolate({
        inputRange : [0,(80 / 360) * HEIGHT],
        outputRange : [0,-Math.PI],
    });
    const headerColor = height.interpolate({
        inputRange : [0,(80 / 360) * HEIGHT],
        outputRange : ['rgba(226,226,226,1)','rgba(2,204,153,1)'],
    });
    return <View>
        <TouchableOpacity activeOpacity={0.5} onPress = {open ? ()=>closeList() : ()=>openList()}>
            <View style={styles.header}>
                <Animated.Text style={[styles.headerText,{color: headerColor}]}>{title}</Animated.Text>
                <Animated.View style={[styles.chevronStyle,{transform : [{rotate : rotatechevron}]}]}>
                    <Icon name="ios-arrow-down" size={22 * WIDTH_RATIO} color = "#E2E2E2"/>
                </Animated.View>
            </View>
        </TouchableOpacity>
        <Animated.View style={{overflow :'hidden' ,height : height}}>
            <ContactCard imageurl = {require('../../assets/images/agnivaprofilepic.jpg')} name = "Agniva Basak"
            institute = "Vellore Institute of Technology" linkedinurl = "https://www.linkedin.com/in/agniva-basak-b40b31115/"
            githuburl = "https://github.com/agnivabasak" mail ="agnivabasak1@gmail.com" phonenumber = "9432586288"
            />
        </Animated.View>
    </View>;
}

const styles = StyleSheet.create({
    header : {
        backgroundColor : '#333333',
        marginTop : (8 / 360) * HEIGHT,
        height: (25 / 360) * HEIGHT,
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection :'row',
    },
    headerText : {
        fontFamily : 'Podkova-SemiBold',
        fontSize: 25 * WIDTH_RATIO,
    },
    chevronStyle : {
        position : 'absolute',
        right : (16 / 360) * WIDTH,
    },
});
