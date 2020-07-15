/* eslint-disable prettier/prettier */
import createContext from './createContext';
import AsyncStorage from '@react-native-community/async-storage';

async function upDateBookmarksList(quoteInfo) {
  try {
    const jsonValue = await AsyncStorage.getItem('Bookmarks');
    const bm = await (jsonValue != null ? await JSON.parse(jsonValue) : []);
    bm.push(quoteInfo);
    const StoreValue = JSON.stringify(bm);
    await AsyncStorage.setItem('Bookmarks', StoreValue);
  } catch (e) {
    console.log(e);
  }
}
async function deleteBookmark(id) {
  try {
    const jsonValue = await AsyncStorage.getItem('Bookmarks');
    const bm = await (jsonValue != null ? await JSON.parse(jsonValue) : []);
    const newbm = bm.filter((item) => item.id !== id);
    const StoreValue = JSON.stringify(newbm);
    await AsyncStorage.setItem('Bookmarks', StoreValue);
  } catch (e) {
    console.log(e);
  }
}

const Reducer = (state, action) => {
  switch (action.type) {
    case 'get_bookmarks': {
      let state2 = state;
      state2.Bookmarks = action.payload;
      return state2;
    }
    case 'add_bookmark': {
      let state2 = state;
      let quoteInfo = {
        quote: action.payload.quote,
        author: action.payload.author,
        id: action.payload.id,
      };
      state2.Bookmarks.push(quoteInfo);
      upDateBookmarksList(quoteInfo);
      return state2;
    }
    case 'delete_bookmark': {
      let state2 = state;
      state2.Bookmarks = state.Bookmarks.filter(
        (item) => item.id !== action.payload.id,
      );
      deleteBookmark(action.payload.id);
      return state2;
    }
    default:
      return state;
  }
};

function GetBookmarks(dispatch) {
  return (bookmarks) => {
    dispatch({type: 'get_bookmarks', payload: bookmarks});
  };
}
function AddToBookmark(dispatch) {
  return (quote, author, id) => {
    dispatch({type: 'add_bookmark', payload: {quote, author, id}});
  };
}
function DeleteFromBookmark(dispatch) {
  return (quote, author, id) => {
    dispatch({type: 'delete_bookmark', payload: {quote, author, id}});
  };
}

export const {Context, Provider} = createContext(
  Reducer,
  {
    GetBookmarks,
    AddToBookmark,
    DeleteFromBookmark,
  },
  {Bookmarks: [], QuoteOfTheDay: ''},
);
