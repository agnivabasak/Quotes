/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {useRef} from 'react';
import {Animated, View, StyleSheet,Dimensions,TouchableOpacity} from 'react-native';

let WIDTH = Dimensions.get('window').width;
let WIDTH_RATIO = WIDTH / 392.72727272727275;
let HEIGHT = Dimensions.get('window').height;

export default function CarouselDots({ind,refContainer}) {
  let opacities = [];
  opacities[0] = useRef(new Animated.Value(1)).current;
  for (let i = 1; i < 5; i++) {
    opacities[i] = useRef(new Animated.Value(0.82)).current;
  }
  opacities[0] = ind.interpolate({
    inputRange: [0, 1, 5],
    outputRange: [1, 0.82, 0.82],
  });
  opacities[1] = ind.interpolate({
    inputRange: [0, 1, 2, 5],
    outputRange: [0.82, 1, 0.82, 0.82],
  });
  opacities[2] = ind.interpolate({
    inputRange: [0, 1, 2, 3, 5],
    outputRange: [0.82, 0.82, 1, 0.82, 0.82],
  });
  opacities[3] = ind.interpolate({
    inputRange: [0, 2, 3, 4, 5],
    outputRange: [0.82, 0.82, 1, 0.82, 0.82],
  });
  opacities[4] = ind.interpolate({
    inputRange: [0, 3, 4, 5],
    outputRange: [0.82, 0.82, 1, 0.82],
  });
  let scales = [];
  scales[0] = useRef(new Animated.Value(1.35)).current;
  for (let i = 1; i < 5; i++) {
    scales[i] = useRef(new Animated.Value(0.82)).current;
  }
  scales[0] = ind.interpolate({
    inputRange: [0, 1, 5],
    outputRange: [1.35, 1, 1],
  });
  scales[1] = ind.interpolate({
    inputRange: [0, 1, 2, 5],
    outputRange: [1, 1.35, 1, 1],
  });
  scales[2] = ind.interpolate({
    inputRange: [0, 1, 2, 3, 5],
    outputRange: [1, 1, 1.35, 1, 1],
  });
  scales[3] = ind.interpolate({
    inputRange: [0, 2, 3, 4, 5],
    outputRange: [1, 1, 1.35, 1, 1],
  });
  scales[4] = ind.interpolate({
    inputRange: [0, 3, 4, 5],
    outputRange: [1, 1, 1.45, 1],
  });
  return (
    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
      <TouchableOpacity activeOpacity={1} onPress={()=>refContainer.current.scrollToIndex({ animated: true, index: 0 })}>
        <Animated.View
          style={[
            styles.dot,
            {opacity: opacities[0]},
            {transform: [{scaleX: scales[0]}, {scaleY: scales[0]}]},
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Animated.View
          style={[
            styles.dot,
            {opacity: opacities[1]},
            {transform: [{scaleX: scales[1]}, {scaleY: scales[1]}]},
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Animated.View
          style={[
            styles.dot,
            {opacity: opacities[2]},
            {transform: [{scaleX: scales[2]}, {scaleY: scales[2]}]},
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Animated.View
          style={[
            styles.dot,
            {opacity: opacities[3]},
            {transform: [{scaleX: scales[3]}, {scaleY: scales[3]}]},
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Animated.View
          style={[
            styles.dot,
            {opacity: opacities[4]},
            {transform: [{scaleX: scales[4]}, {scaleY: scales[4]}]},
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
