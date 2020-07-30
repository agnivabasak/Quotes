/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {FlatList,Dimensions} from 'react-native';
import CarouselCard from './CarouselCard';

/*let QuotesList = [{"_id":{"$oid":"5ecbace828a20383694c8c46"},"Auther":"A. A. Milne","quote":"\"If you live to be a hundred"},
{"_id":{"$oid":"5ecbace828a20383694c8c47"},"Auther":"A. A. Milne","quote":"\"Promise me you'll always remember: You're braver than you believe"}
,{"_id":{"$oid":"5ecbace828a20383694c8c48"},"Auther":"A. A. Milne","quote":"\"Did you ever stop to think"},
{"_id":{"$oid":"5ecbace828a20383694c8c49"}, "Auther":"A. A. Milne","quote":"\"Organizing is what you do before you do something"}
,{"_id":{"$oid":"5ecbace828a20383694c8c4a"},"Auther":"A. A. Milne","quote":"\"Weeds are flowers too"}];
*/


let WIDTH = Dimensions.get('window').width;
//let WIDTH_RATIO = WIDTH / 392.72727272727275;
//let HEIGHT = Dimensions.get('window').height;


export default function Carousel({QuotesList,stateVar,changeStateVar,ind,refContainer}) {
  return (
    <FlatList
      data={QuotesList}
      ref = {refContainer}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'stretch',
      }}
      scrollEventThrottle={16}
      decelerationRate={'normal'}
      snapToAlignment={'center'}
      snapToInterval={(306 / 360) * WIDTH}
      onScroll={({nativeEvent}) => {
        if (nativeEvent.contentOffset.x <= (298 / 360) * WIDTH)
          {
            ind.setValue(nativeEvent.contentOffset.x / ((298 / 360) * WIDTH));
          }
        else
          {
            ind.setValue(1 + (nativeEvent.contentOffset.x - (298 / 360) * WIDTH) / ((306 / 360) * WIDTH));
          }
          console.log(nativeEvent.contentOffset.x);
      }}
      renderItem={({item, index}) => {return (
        <CarouselCard
            key={index}
            index = {index}
            quote={item.quote}
            author={item.author}
            id={item.id}
            beg={index === 0 ? true : false}
            end={index === 4 ? true : false}
            bookmarked={item.bookmarked}
            stateVar={stateVar}
            changeStateVar={changeStateVar}
            curind = {ind}
          />
      );}}
    />
  );
}
