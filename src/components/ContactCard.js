/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View,Text,StyleSheet,Dimensions,Image,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {web,email,phonecall,text} from 'react-native-communications';

let WIDTH = Dimensions.get('window').width;
let WIDTH_RATIO = WIDTH / 392.72727272727275;
let HEIGHT = Dimensions.get('window').height;

export default function ContactCard ({imageurl,name,institute,linkedinurl,githuburl,mail,phonenumber}){
    return <View style ={styles.cardStyle}>
        <Image source={imageurl}
            style={styles.imageStyle} />
        <View>
            <Text style={styles.titleStyle}>{name}</Text>
            <Text style={styles.instituteStyle}>{institute}</Text>
            <View style={styles.contactStyle}>
                <TouchableOpacity onPress={()=>{web(linkedinurl);}} activeOpacity={0.5}>
                    <Icon name="logo-linkedin" size={48 * WIDTH_RATIO} color="#0077B7" />
                </TouchableOpacity>
                <TouchableOpacity onPress ={()=>{web(githuburl);}} activeOpacity={0.5}>
                    <Icon name="logo-github" size ={42 * WIDTH_RATIO} />
                </TouchableOpacity>
                <TouchableOpacity onPress ={()=>{phonecall(phonenumber,true);}} activeOpacity={0.5}>
                    <Image source={require('../../assets/images/telephone.png')}
                        style={styles.phoneStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{email([mail], null, null, null, null);}} activeOpacity={0.5}>
                    <Image source={require('../../assets/images/gmaillogo.png')}
                    style={styles.gmailStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress ={()=>{text(phonenumber);}} activeOpacity={0.5}>
                    <Image source={require('../../assets/images/messaging.jpg')}
                        style={styles.textStyle} />
                </TouchableOpacity>
            </View>
        </View>
    </View>;
}

const styles = StyleSheet.create({
    cardStyle : {
        flexDirection : 'row',
        alignItems : 'center',
        height : (80 / 360) * HEIGHT,
        backgroundColor : '#333333',
        justifyContent : 'space-evenly',
        marginTop : (5 / 360) * HEIGHT,
    },
    imageStyle : {
        height: (60 / 360) * HEIGHT,
        width : (60 / 360) * HEIGHT,
        borderRadius : 360,
        borderWidth : 1,
        borderColor : '#E2E2E2',
    },
    titleStyle : {
        color : '#E2E2E2',
        fontFamily : 'Podkova-SemiBold',
        fontSize : 25 * WIDTH_RATIO,
        borderBottomWidth : 1,
        borderColor : '#E2E2E2',
    },
    instituteStyle : {
        color : '#E2E2E2',
        fontFamily : 'Podkova-Regular',
        fontSize : 15 * WIDTH_RATIO,
        marginBottom : (8 / 360) * HEIGHT,
    },
    contactStyle : {
        backgroundColor : '#E2E2E2',
        borderRadius : 10,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        height  : '27%',
        width : (205 / 360) * WIDTH,
        padding : 5 * WIDTH_RATIO,
    },
    gmailStyle : {
        height : (15 / 360) * HEIGHT,
        aspectRatio : 30 / 22,
    },
    phoneStyle : {
        height : (15 / 360) * HEIGHT,
        aspectRatio : 1,
    },
    textStyle : {
        height : (15 / 360) * HEIGHT,
        aspectRatio : 1,
    },
});
