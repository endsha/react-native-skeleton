import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

const BounceAnimation = () => {
  const dropdownAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(dropdownAnim, {
        toValue: 1,
        easing: Easing.bounce,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, [dropdownAnim]);

  return (
    <Animated.View
      style={{
        ...styles.circle,
        transform: [
          {
            translateY: dropdownAnim.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [0, 200, 0],
            }),
          },
        ],
      }}
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
