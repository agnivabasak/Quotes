import createContext from './createContext';
import AsyncStorage from '@react-native-community/async-storage';

async function upDateBookmarksList(quoteInfo) {
  try {
    console.log('FUNCT FOR IT CALLED');
    const jsonValue = await AsyncStorage.getItem('Bookmarks');
    const bm = await (jsonValue != null ? await JSON.parse(jsonValue) : []);
    bm.push(quoteInfo);
    console.log(bm);
    const StoreValue = JSON.stringify(bm);
    await AsyncStorage.setItem('Bookmarks', StoreValue);
    console.log('DONE');
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
  console.log(state);
  switch (action.type) {
    case 'get_quoteslist': {
      let state2 = state;
      state2.QuotesList = action.payload;
      console.log('TOOK LIST FROM API AND ASSIGNED');
      return state2;
    }
    case 'get_bookmarks': {
      let state2 = state;
      state2.Bookmarks = action.payload;
      return state2;
    }
    case 'add_bookmark': {
      console.log('ADD TO BOOKMARK CALLED');
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
    case 'change_status': {
      let state2 = state;
      state2.Bookmarks = state.Bookmarks.map((item) => {
        if (item.id === action.payload.id) {
          return {
            id: item.id,
            author: item.author,
            quote: item.quote,
            bookmarked: !item.bookmarked,
          };
        }
        return item;
      });
      return state2;
    }
    default:
      return state;
  }
};

function GetQuotesList(dispatch) {
  return (quotesList) => {
    dispatch({type: 'get_quoteslist', payload: quotesList});
  };
}
function GetBookmarks(dispatch) {
  return (bookmarks) => {
    console.log(bookmarks);
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

function ChangeBookmarkStatus(dispatch) {
  return (quote, author, id) => {
    dispatch({type: 'change_status', payload: {quote, author, id}});
  };
}

export const {Context, Provider} = createContext(
  Reducer,
  {
    GetQuotesList,
    GetBookmarks,
    AddToBookmark,
    DeleteFromBookmark,
    ChangeBookmarkStatus,
  },
  {QuotesList: [], Bookmarks: [], QuoteOfTheDay: ''},
);
