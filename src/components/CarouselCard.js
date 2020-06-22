/* eslint-disable prettier/prettier */
import * as React from 'react';
import {useContext, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import {Context} from '../context/Context';

let WIDTH = Dimensions.get('window').width;
let WIDTH_RATIO = WIDTH / 392.72727272727275;
let HEIGHT = Dimensions.get('window').height;
/*onPress={
    /*bookmarked?()=>{DeleteFromBookmark(quote,author,id)
        ChangeBookmarkStatus(quote,author,id)}: ()=>{AddToBookmark(quote,author,id)
            ChangeBookmarkStatus(quote,author,id)}
        }*/
export default function CarouselCard({
  quote,
  author,
  id,
  beg,
  opacity,
  bookmarked,
  stateVar,
  changeStateVar
}) {
  const {AddToBookmark, DeleteFromBookmark, ChangeBookmarkStatus} = useContext(
    Context,
  );
  return (
    <Animated.View opacity={opacity}>
      <View
        style={[styles.card, beg ? {marginLeft: (35 / 360) * WIDTH} : null]}>
        <View>
          <View style={styles.options}>
            <TouchableOpacity
              onPress={() => {
                bookmarked?DeleteFromBookmark(quote,author,id):AddToBookmark(quote, author, id);
                ChangeBookmarkStatus(quote, author, id);
                changeStateVar(stateVar+1);
              }}
              activeOpacity={0.6}
              style={{marginRight: 20 * WIDTH_RATIO}}>
              <Icon
                name="md-bookmark"
                size={34 * WIDTH_RATIO}
                color={bookmarked ? '#02CC99' : '#C4C4C4'}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <Icon name="md-share" size={34 * WIDTH_RATIO} color="#C4C4C4" />
            </TouchableOpacity>
          </View>
          <Icon2
            name="quote-a-right"
            size={28 * WIDTH_RATIO}
            color="#02CC99"
            style={{marginLeft: 0.05*WIDTH}}
          />
          <Text style={styles.quote}>{quote}</Text>
        </View>
        <Text style={styles.author}>{author}</Text>
      </View>
    </Animated.View>
  );
}

let styles = StyleSheet.create({
  card: {
    height: (470 / 640) * HEIGHT,
    width: (290 / 360) * WIDTH,
    backgroundColor: '#262626',
    borderRadius: 20 * WIDTH_RATIO,
    justifyContent: 'space-between',
    marginLeft: (8 / 360) * WIDTH,
    marginRight: (8 / 360) * WIDTH,
  },
  options: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginLeft: 0.05 * WIDTH,
    marginRight: 0.05 * WIDTH,
    marginTop: 0.03 * HEIGHT,
    marginBottom: 0.03 * HEIGHT,
  },
  quote: {
    color: '#E2E2E2',
    fontSize: 24 * WIDTH_RATIO,
    fontFamily: 'Podkova-Regular',
    width: '90%',
    alignSelf: 'center',
    marginTop: 0.05 * HEIGHT,
    marginLeft: 0.01 * WIDTH,
  },
  author: {
    color: '#02CC99',
    fontSize: 26 * WIDTH_RATIO,
    alignSelf: 'flex-end',
    fontFamily: 'Podkova-Regular',
    marginBottom: 0.05 * HEIGHT,
    marginRight: 0.05 * WIDTH,
  },
});
