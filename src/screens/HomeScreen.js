/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useRef, useContext,useState,useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';
import Carousel from '../components/Carousel';
import {Context} from '../context/Context';
let WIDTH = Dimensions.get('window').width;
let WIDTH_RATIO = WIDTH / 392.72727272727275;
let HEIGHT = Dimensions.get('window').height;
const HomeScreen = ({navigation}) => {
  const {state} = useContext(Context);
  const [stateVar, changeStateVar] = useState(0);
  const [qlist,setQList] = useState([]);
  console.log(qlist);
  const [bms, setBms] = useState([]);
  const {GetBookmarks} = useContext(Context);
  useEffect(() => {
    navigation.addListener('focus', () => changeStateVar(stateVar + 1));
    console.log(qlist);
    setQList(qlist.map((x)=>{
      x.bookmarked = false;
      for (let bm of state.Bookmarks) {
        if (x.id === bm.id) {
          x.bookmarked = true;
        }
      }
      return x;
    }));
  }, [navigation, state, stateVar]);
  useEffect(()=>{
    async function getBookmarksList() {
      try {
        const jsonValue = await AsyncStorage.getItem('Bookmarks');
        setBms(jsonValue != null ? await JSON.parse(jsonValue) : []);
        return bms;
      } catch (e) {
        console.log(e);
      }
    }
    async function getQuotes() {
      const response = await fetch('https://unquote-api.herokuapp.com/getQuoteList');
            const json = await response.json();
            const jsonlist = json.quoteList;
      let quoteslist = [];
      for (let elem of jsonlist) {
        let x = {};
        x.quote = elem.quote;
        x.author = elem.Auther;
        x.id = elem._id.$oid;
        x.bookmarked = false;
        for (let bm of bms) {
          if (x.id === bm.id) {
            x.bookmarked = true;
            break;
          }
        }
        quoteslist.push(x);
      }
      setQList(quoteslist);
      return quoteslist;
    }
    async function setData() {
      await GetBookmarks(await getBookmarksList());
      await getQuotes();
      await SplashScreen.hide();
    }
    setData();
  },[]);
  let pos = useRef(new Animated.Value(0)).current;
  let opacities = [];
  opacities[0] = useRef(new Animated.Value(1)).current;
  for (let i = 1; i < 5; i++) {
    opacities[i] = useRef(new Animated.Value(0.82)).current;
  }
  opacities[0] = pos.interpolate({
    inputRange: [
      -4 * (306 / 360) * WIDTH,
      -1 * (306 / 360) * WIDTH,
      -1 * (150 / 360) * WIDTH,
      0,
    ],
    outputRange: [0.82, 0.82, 1, 1],
  });
  opacities[1] = pos.interpolate({
    inputRange: [
      -4 * (306 / 360) * WIDTH,
      -2 * (306 / 360) * WIDTH,
      -1 * (456 / 360) * WIDTH,
      -1 * (306 / 360) * WIDTH,
      0,
    ],
    outputRange: [0.82, 0.82, 1, 1, 0.82],
  });
  opacities[2] = pos.interpolate({
    inputRange: [
      -4 * (306 / 360) * WIDTH,
      -3 * (306 / 360) * WIDTH,
      -1 * (762 / 360) * WIDTH,
      -2 * (306 / 360) * WIDTH,
      -1 * (306 / 360) * WIDTH,
      0,
    ],
    outputRange: [0.82, 0.82, 1, 1, 0.82, 0.82],
  });
  opacities[3] = pos.interpolate({
    inputRange: [
      -4 * (306 / 360) * WIDTH,
      -1 * (1068 / 360) * WIDTH,
      -3 * (306 / 360) * WIDTH,
      -2 * (306 / 360) * WIDTH,
      -1 * (306 / 360) * WIDTH,
      0,
    ],
    outputRange: [0.82, 1, 1, 0.82, 0.82, 0.82],
  });
  opacities[4] = pos.interpolate({
    inputRange: [
      -4 * (306 / 360) * WIDTH,
      -3 * (306 / 360) * WIDTH,
      -2 * (306 / 360) * WIDTH,
      -1 * (306 / 360) * WIDTH,
      0,
    ],
    outputRange: [1, 0.82, 0.82, 0.82, 0.82],
  });
  let scales = [];
  scales[0] = useRef(new Animated.Value(1.35)).current;
  for (let i = 1; i < 5; i++) {
    scales[i] = useRef(new Animated.Value(0.82)).current;
  }
  scales[0] = pos.interpolate({
    inputRange: [
      -4 * (306 / 360) * WIDTH,
      -1 * (306 / 360) * WIDTH,
      -1 * (150 / 360) * WIDTH,
      0,
    ],
    outputRange: [1, 1, 1.35, 1.35],
  });
  scales[1] = pos.interpolate({
    inputRange: [
      -4 * (306 / 360) * WIDTH,
      -2 * (306 / 360) * WIDTH,
      -1 * (456 / 360) * WIDTH,
      -1 * (306 / 360) * WIDTH,
      0,
    ],
    outputRange: [1, 1, 1.35, 1.35, 1],
  });
  scales[2] = pos.interpolate({
    inputRange: [
      -4 * (306 / 360) * WIDTH,
      -3 * (306 / 360) * WIDTH,
      -1 * (762 / 360) * WIDTH,
      -2 * (306 / 360) * WIDTH,
      -1 * (306 / 360) * WIDTH,
      0,
    ],
    outputRange: [1, 1, 1.35, 1.35, 1, 1],
  });
  scales[3] = pos.interpolate({
    inputRange: [
      -4 * (306 / 360) * WIDTH,
      -1 * (1068 / 360) * WIDTH,
      -3 * (306 / 360) * WIDTH,
      -2 * (306 / 360) * WIDTH,
      -1 * (306 / 360) * WIDTH,
      0,
    ],
    outputRange: [1, 1.35, 1.35, 1, 1, 1],
  });
  scales[4] = pos.interpolate({
    inputRange: [
      -4 * (306 / 360) * WIDTH,
      -3 * (306 / 360) * WIDTH,
      -2 * (306 / 360) * WIDTH,
      -1 * (306 / 360) * WIDTH,
      0,
    ],
    outputRange: [1.35, 1, 1, 1, 1],
  });
  const nextCard = (noOfCards) => {
    Animated.timing(pos, {
      toValue: -(306 / 360) * WIDTH * noOfCards,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const prevCard = (noOfCards) => {
    Animated.timing(pos, {
      toValue: (306 / 360) * WIDTH * noOfCards,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const curCardPos = () => {
    Animated.timing(pos, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const panresponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gesture) => {
        pos.extractOffset();
      },
      onPanResponderMove: (event, gesture) => {
        //if(pos.__getValue()<5 && gesture.dx>0)
        //   pos.setValue(gesture.dx);
        if (
          pos.__getValue() >= 0 &&
          pos.__getValue() < WIDTH &&
          gesture.dx > 0
        ) {
          curCardPos();
        } else if (
          pos.__getValue() < -(306 / 360) * 4 * WIDTH &&
          gesture.dx < 0
        ) {
          curCardPos();
        } else {
          pos.setValue(gesture.dx);
        }
      },
      //change condition for if more than 1 and leads to out of bounds
      onPanResponderRelease: (event, gesture) => {
        if (
          pos.__getValue() >= 0 &&
          pos.__getValue() < WIDTH &&
          gesture.dx > 0
        ) {
          curCardPos();
        } else if (
          pos.__getValue() < -(306 / 360) * 4 * WIDTH &&
          gesture.dx < 0
        ) {
          curCardPos();
        } else {
          if (gesture.dx < -(115 / 360) * WIDTH) {
            let no = Math.floor(gesture.dx / (-(306 / 360) * WIDTH));
            no =
              no +
              Math.floor(
                (-gesture.dx - no * ((306 / 360) * WIDTH)) /
                  ((115 / 360) * WIDTH),
              );
            if (
              Math.floor(-pos.__getValue() / ((306 / 360) * WIDTH)) + no >
              4
            ) {
              nextCard(no - 1);
            } else {
              nextCard(no);
            }
          } else if (gesture.dx > (115 / 360) * WIDTH) {
            let no = Math.floor(gesture.dx / ((306 / 360) * WIDTH));
            no =
              no +
              Math.floor(
                (gesture.dx - no * ((306 / 360) * WIDTH)) /
                  ((115 / 360) * WIDTH),
              );
            if (Math.ceil(-pos.__getValue() / ((306 / 360) * WIDTH)) - no < 0) {
              prevCard(no - 1);
            } else {
              prevCard(no);
            }
          } else {
            curCardPos();
          }
        }
      },
    }),
  ).current;
  return (
    <View style={styles.Screen}>
      <Animated.View style={{left: pos}} {...panresponder.panHandlers}>
        <Carousel opacities={opacities} QuotesList={qlist} stateVar={stateVar} changeStateVar={changeStateVar} />
      </Animated.View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <Animated.View
          style={[
            styles.dot,
            {opacity: opacities[0]},
            {transform: [{scaleX: scales[0]}, {scaleY: scales[0]}]},
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {opacity: opacities[1]},
            {transform: [{scaleX: scales[1]}, {scaleY: scales[1]}]},
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {opacity: opacities[2]},
            {transform: [{scaleX: scales[2]}, {scaleY: scales[2]}]},
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {opacity: opacities[3]},
            {transform: [{scaleX: scales[3]}, {scaleY: scales[3]}]},
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {opacity: opacities[4]},
            {transform: [{scaleX: scales[4]}, {scaleY: scales[4]}]},
          ]}
        />
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  Screen: {
    backgroundColor: '#979797',
    flex: 1,
    justifyContent: 'center',
  },
  dot: {
    width: 10 * WIDTH_RATIO,
    height: 10 * WIDTH_RATIO,
    borderRadius: 5 * WIDTH_RATIO,
    backgroundColor: '#262626',
    marginTop: (10 / 360) * HEIGHT,
    marginLeft: (5 / 360) * WIDTH,
    marginRight: (5 / 360) * WIDTH,
  },
});
export default HomeScreen;
