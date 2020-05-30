import * as React from "react";
import {useRef,useEffect} from "react";
import {View,Text,StyleSheet,Animated,PanResponder} from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
const BookmarkScreen = ()=>{
    let pos = useRef(new Animated.Value(0)).current;
    const panresponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder : ()=>true,
        onPanResponderMove : (event,gesture)=>{
            pos.setValue(gesture.dx);
        },
        onPanResponderRelease : (event,gesture)=>{
            
        } 
    })).current; 
    return <View style={styles.Screen}>
        <Animated.View style={{left : pos}} {...panresponder.panHandlers}>
            <View style={styles.box}/>
        </Animated.View>
    </View>
};

styles = StyleSheet.create({
    Screen : {
        backgroundColor : "#979797",
        flex:1,
        alignItems  :"center",
        justifyContent : "center"
    },
    box : {
        backgroundColor : "#02CC99",
        width  : 100,
        height : 100 ,
    }
});

export default BookmarkScreen;