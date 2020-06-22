/* eslint-disable prettier/prettier */
//for about app
import * as React from 'react';
import {useRef,useState} from 'react';
import {View,StyleSheet,Text,Animated,Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


let WIDTH = Dimensions.get('window').width;
let WIDTH_RATIO = WIDTH / 392.72727272727275;
let HEIGHT = Dimensions.get('window').height;

export default function ListItem ({title,data}){
    return <View>
            <View style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        <View style={[styles.contentStyle,{overflow :"hidden"}]}>
            <Text style ={styles.contentTextStyle}>{data}</Text>
        </View>
    </View>;
}

const styles = StyleSheet.create({
    header : {
        backgroundColor : "#333333",
        marginTop : (8/360)*HEIGHT,
        height: (25/360)*HEIGHT,
        alignItems : "center",
        justifyContent : "center"
    },
    headerText : {
        color: "#02CC99",
        fontFamily : "Podkova-SemiBold",
        fontSize: 25*WIDTH_RATIO,
    },
    contentStyle : {
        backgroundColor : "#333333",
        marginTop : -(1/360)*HEIGHT
    },
    contentTextStyle : {
        color: "#E2E2E2",
        fontFamily : "Podkova-Regular",
        fontSize: 17*WIDTH_RATIO,
        marginHorizontal : (20/360)*WIDTH,
        marginBottom : (10/360)*HEIGHT,
    }
});