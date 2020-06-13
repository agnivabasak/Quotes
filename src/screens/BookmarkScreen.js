import * as React from "react";
import {useContext} from "react";
import {View,Text,StyleSheet} from "react-native";
import {Context} from "../context/Context";

const BookmarkScreen = ()=>{
    const {state} = useContext(Context);
    console.log(state.Bookmarks);
    return <View style={styles.Screen}>
        {
            state.Bookmarks.map((item)=>{
                return <View>
                        <Text>{item.quote}</Text>
                        <Text>{item.author}</Text>
                    </View>
            })
        }
    </View>
};

let styles = StyleSheet.create({
    Screen : {
        backgroundColor : "#979797",
        flex:1,
        alignItems  :"center",
        justifyContent : "center"
    },
});

export default BookmarkScreen;