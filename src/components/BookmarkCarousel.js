/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

//error : deleting one of the bookmarks leads to the vanishing of the next bookmark as well , its till in the bookmarks list though

import * as React from 'react';
import {useContext, useState,useRef} from 'react';
import {Overlay} from 'react-native-elements';
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

export default function BookmarkCarouselCard({
index,
  quote,
  author,
  id,
  beg,
  opacity,
  stateVar,
  changeStateVar,
}) {
  const { DeleteFromBookmark} = useContext(
    Context,
  );
    const [visible, setVisible] = useState(false);
    //const op = useRef(new Animated.Value(0)).current;
    const slide = useRef(new Animated.Value(0)).current;
    const height = useRef(new Animated.Value((250 / 640) * HEIGHT)).current;
    console.log('id : ',id,slide,height);
    const deleteAnimation = ()=>{
        Animated.sequence([
            Animated.timing(slide,{
                toValue : WIDTH,
                duration : 300,
                useNativeDriver :false,
            }),
            Animated.timing(height,{
                toValue : 0,
                duration : 300,
                useNativeDriver :false,
            }),
        ]).start(()=>{
            DeleteFromBookmark(quote,author,id);
        });
    };
    const margin = slide.interpolate({
        inputRange : [0,WIDTH],
        outputRange : [(4 / 360) * HEIGHT,0],
    });
    /*const displayOverlay = ()=>{
        setVisible(true);
        Animated.timing(op,{
            toValue :1,
            duration : 120,
            useNativeDriver : false,
        }).start();
    };
    const removeOverlay = ()=>{
        Animated.timing(op,{
            toValue :0,
            duration : 80,
            useNativeDriver : false,
        }).start(()=>{setVisible(false)});
    };
    const sizeratio = op.interpolate({
        inputRange:[0,1],
        outputRange : [(250 / 640) * HEIGHT*0.5,(250 / 640) * HEIGHT],
    });*/
    const toggleOverlay = () => {
      setVisible(!visible);
    };
    const AnimatedOverlay = Animated.createAnimatedComponent(Overlay);
  return (
<View>
    <AnimatedOverlay  isVisible={visible} onBackdropPress={()=>{toggleOverlay();}} backdropStyle ={{backgroundColor : '#000000',opacity : 0.4}} >
        <Animated.View style={[styles.confirmBox,{transform:[{scale:1}]}]}>
            <Text style={styles.confirmBoxText}>Remove this quote from Bookmarks ?</Text>
            <View style={styles.yesorno}>
                <TouchableOpacity activeOpacity={0.5} onPress ={()=>{
                    deleteAnimation();
                    toggleOverlay();
                }}>
                    <Text style={styles.yesornotext} >Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress = {()=>{
                    toggleOverlay();
                    //removeOverlay();
                }}>
                    <Text style={styles.yesornotext} >No</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    </AnimatedOverlay>
<Animated.View opacity={opacity}>
      <Animated.View
        style={[styles.card,{overflow : 'hidden',height: height,width: (330 / 360) * WIDTH,marginBottom :margin,marginTop : margin,transform : [{translateX:slide}]},beg ? {marginLeft: (35 / 360) * WIDTH} : null]}>
        <View>
          <View style={styles.options}>
            <TouchableOpacity
              onPress={() => {
                  toggleOverlay();
              }}
              activeOpacity={0.6}
              style={{marginRight: 20 * WIDTH_RATIO}}>
              <Icon
                name="md-bookmark"
                size={34 * WIDTH_RATIO}
                color={'#02CC99'}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <Icon name="md-share" size={34 * WIDTH_RATIO} color="#C4C4C4" />
            </TouchableOpacity>
          </View>
          <Icon2
            name="quote-a-right"
            size={23 * WIDTH_RATIO}
            color="#02CC99"
            style={{marginLeft: 0.05 * WIDTH}}
          />
          <Text style={styles.quote}>{quote}</Text>
        </View>
        <Text style={styles.author}>{author}</Text>
      </Animated.View>
    </Animated.View>
    </View>
  );
}

let styles = StyleSheet.create({
  card: {
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
    marginTop: 0.02 * HEIGHT,
    marginBottom: 0.015 * HEIGHT,
  },
  quote: {
    color: '#E2E2E2',
    fontSize: 20 * WIDTH_RATIO,
    fontFamily: 'Podkova-Regular',
    width: '90%',
    alignSelf: 'center',
    marginTop: 0.02 * HEIGHT,
    marginLeft: 0.01 * WIDTH,
  },
  author: {
    color: '#02CC99',
    fontSize: 22 * WIDTH_RATIO,
    alignSelf: 'flex-end',
    fontFamily: 'Podkova-Regular',
    marginBottom: 0.025 * HEIGHT,
    marginRight: 0.05 * WIDTH,
  },
  confirmBox : {
      backgroundColor :'#ffffff',
      height : 0.15 * HEIGHT,
      width : 0.8 * WIDTH,
    justifyContent :'space-between',
  },
  confirmBoxText : {
      fontFamily :'Podkova-Regular',
      fontSize: 22 * WIDTH_RATIO,
      margin : 5 * WIDTH_RATIO,
  },
  yesornotext  : {
    fontFamily :'Podkova-Regular',
      fontSize: 22 * WIDTH_RATIO,
      margin : 5 * WIDTH_RATIO,
  },
  yesorno : {
      flexDirection : 'row',
      justifyContent : 'space-around',
      borderTopColor : '#000000',
      borderTopWidth : 1 * WIDTH_RATIO,
  },
});
