import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated, Easing, PanResponder} from 'react-native';

const BounceAnimation = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panXValue = useRef<number>(0);
  const panYValue = useRef<number>(0);

  useEffect(() => {
    const unsubscribe = pan.addListener(value => {
      console.log('PAN VALUE: ', value);
      panXValue.current = value.x;
      panYValue.current = value.y;
    });

    return () => {
      pan.removeListener(unsubscribe);
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log('PAN GRANT: ', panXValue.current, panYValue.current);
        pan.setOffset({
          x: panXValue.current,
          y: panYValue.current,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        console.log('Pan Released');
        pan.flattenOffset();

        setTimeout(() => {
          Animated.timing(pan, {
            toValue: {x: panXValue.current, y: 0},
            easing: Easing.bounce,
            duration: 800,
            useNativeDriver: false,
          }).start();
        }, 200);
      },
    }),
  ).current;

  return (
    <Animated.View
      style={{
        ...styles.circle,
        transform: pan.getTranslateTransform(),
      }}
      {...panResponder.panHandlers}
    />
  );
};

export default BounceAnimation;

const styles = StyleSheet.create({
  circle: {
    width: 56,
    height: 56,
    borderRadius: 56,
    backgroundColor: 'red',
  },
});
