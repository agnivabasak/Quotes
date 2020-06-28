/* eslint-disable prettier/prettier */
import * as React from 'react';
import {useEffect, useContext, useState} from 'react';
import {Context} from '../context/Context';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function SplashScreen({navigation}) {
  const [bms, setBms] = useState([]);
  const {GetQuotesList, GetBookmarks} = useContext(Context);
  useEffect(() => {
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
      /*const jsonlist = [
        {
          _id: {$oid: '5ecbace828a20383694c8c46'},
          Auther: 'A. A. Milne',
          quote: '"If you live to be a hundred',
        },
        {
          _id: {$oid: '5ecbace828a20383694c8c47'},
          Auther: 'A. A. Milne',
          quote:
            "\"Promise me you'll always remember: You're braver than you believe",
        },
        {
          _id: {$oid: '5ecbace828a20383694c8c48'},
          Auther: 'A. A. Milne',
          quote: '"Did you ever stop to think',
        },
        {
          _id: {$oid: '5ecbace828a20383694c8c49'},
          Auther: 'A. A. Milne',
          quote: '"Organizing is what you do before you do something',
        },
        {
          _id: {$oid: '5ecbace828a20383694c8c4a'},
          Auther: 'A. A. Milne',
          quote: '"Weeds are flowers too',
        },
      ];*/
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

      return quoteslist;
    }
    async function setData() {
      await GetBookmarks(await getBookmarksList());
      await GetQuotesList(await getQuotes());
      navigation.navigate('TabScreens');
    }
    setData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
