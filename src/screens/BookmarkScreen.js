/* eslint-disable prettier/prettier */
import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet, Dimensions} from 'react-native';
import {Context} from '../context/Context';
import BookmarkCarouselCard from '../components/BookmarkCarousel';
import { ConfirmDialog } from 'react-native-simple-dialogs';

let WIDTH = Dimensions.get('window').width;
let WIDTH_RATIO = WIDTH / 392.72727272727275;
let HEIGHT = Dimensions.get('window').height;

const BookmarkScreen = ({navigation}) => {
  const {state} = useContext(Context);
  const [stateVar, changeStateVar] = useState(0);
  useEffect(() => {
    navigation.addListener('focus', () => changeStateVar(stateVar + 1));
    console.log("BOOKMARK SCREEN - ",stateVar,state);
  }, [state,stateVar]);//workaround for context updation not showing in bookmark screen
  if(state.Bookmarks.length===0)
  {
      return <View style={styles.noBookmarkScreen}>
          <Text style = {styles.noBookmark}>You do not have any bookmarks!</Text>
      </View>
  }
  return (
    <View style={styles.Screen}>
        <ScrollView showsVerticalScrollIndicator={false} style ={styles.scrollStyle}>
            {state.Bookmarks.map((item,index) => {
                return (
                    <BookmarkCarouselCard
                        index={index}
                        opacity={1}
                        quote={item.quote}
                        author={item.author}
                        id={item.id}
                        beg={false}
                        bookmarked={item.bookmarked}
                        stateVar={stateVar}
                        changeStateVar={changeStateVar}
                />
                );
            })}
      </ScrollView>
    </View>
  );
};

let styles = StyleSheet.create({
  Screen: {
    backgroundColor: '#979797',
    flex: 1,
    alignItems : "center",
  },
  scrollStyle :{
    marginTop : (5/360)*HEIGHT,
  },
  noBookmarkScreen : {
    backgroundColor: '#212121',
    flex: 1,
    alignItems : "center",
    justifyContent:"center"
  },
  noBookmark : {
    color : '#00AA7F',
    fontFamily: 'Podkova-SemiBold',
    fontSize : 22*WIDTH_RATIO
  },
  /*noBookmark : {
      fontSize : 20*WIDTH_RATIO,
      fontFamily: 'Podkova-SemiBold',
      color : '#E2E2E2',
      fontWeight : "900",
      textAlign : "center",
      backgroundColor  :"#262626",
      borderRadius : 10*WIDTH_RATIO,
      marginLeft : 10,
      marginRight : 10,
      height : 100
  }*/
});

export default BookmarkScreen;
