/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */

import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useContext,useState,useEffect,useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import Carousel from '../components/Carousel';
import CarouselDots from '../components/CarouselDots';
import {Context} from '../context/Context';
import { Overlay } from 'react-native-elements';
let WIDTH = Dimensions.get('window').width;
let WIDTH_RATIO = WIDTH / 392.72727272727275;
let HEIGHT = Dimensions.get('window').height;
const HomeScreen = ({navigation}) => {
  const ind = useRef(new Animated.Value(0)).current;
  const refContainer = useRef(null);
  const {state} = useContext(Context);
  const [err,setErr] = useState(false);
  const [stateVar, changeStateVar] = useState(0);
  const [qlist,setQList] = useState([]);
  const [bms, setBms] = useState([]);
  const {GetBookmarks} = useContext(Context);
  useEffect(() => {
    navigation.addListener('focus', () => changeStateVar(stateVar + 1));
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
        setErr(true);
      }
    }
    async function getQuotes() {
      try {
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
      } catch (error){
        console.log(error);
        setErr(true);
      }
    }
    async function setData() {
      await GetBookmarks(await getBookmarksList());
      await getQuotes();
      SplashScreen.hide();
    }
    setData();
  },[]);
  return (
    <View style={styles.Screen}>
      <Overlay isVisible={err}>
        <View style={styles.noNetworkScreen}>
          <Text style={styles.noNetwork}>There seems to  be a problem with your network , Please check your internet connectivity and restart the app</Text>
        </View>
      </Overlay>
      <View>
        <Carousel QuotesList={qlist} stateVar={stateVar} changeStateVar={changeStateVar} ind={ind} />
      </View>
      <CarouselDots refContainer={refContainer} ind={ind} />
    </View>
  );
};

let styles = StyleSheet.create({
  Screen: {
    backgroundColor: '#979797',
    flex:1,
    justifyContent:'center',
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
  noNetworkScreen : {
    alignItems : 'center',
    justifyContent:'center',
  },
  noNetwork : {
    color : '#000000',
    fontFamily: 'Podkova-SemiBold',
    fontSize : 17 * WIDTH_RATIO,
  },
});
export default HomeScreen;
