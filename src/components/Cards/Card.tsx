import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  Easing,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { STANDARD_CARD_HEIGHT, STANDARD_CARD_WIDTH } from '~constants/cards';
import { Colors } from '~themes';

import { CardType, CardValue } from '~types/cards';

import { randomNumber, randomNumberFromRanges } from '~utils/math';

interface CardProps {
  id: string;
  value: CardValue;
  type: CardType;
  index: number;
  isTop: boolean;
  size?: number;
  onRemove: () => void;
}

const DEFAULT_CARD_SIZE = 3.5;

const Card = (props: CardProps): JSX.Element => {
  const { value, type, index, isTop, size, onRemove } = props;

  const [isFront, setIsFront] = React.useState<boolean>(false);

  const pan = React.useRef(
    new Animated.ValueXY({
      x: 0,
      y: -800,
    })
  ).current;
  const rotateAngle = React.useRef(
    // new Animated.Value(isTop ? 0 : randomNumber(-2, 2)),
    new Animated.Value(0)
  ).current;
  const panXValue = React.useRef<number>(0);
  const panYValue = React.useRef<number>(0);

  const cardShadowStyle = React.useMemo(() => {
    return isTop ? styles.cardTopShadow : styles.cardBelowShadow;
  }, [isTop]);

  const cardTypeIconName = React.useMemo(() => {
    switch (type) {
      case CardType.Spades:
        return 'cards-spade';
      case CardType.Clubs:
        return 'cards-club';
      case CardType.Diamonds:
        return 'cards-diamond';
      case CardType.Hearts:
        return 'cards-heart';
    }
  }, [type]);

  const cardSize = React.useMemo(() => {
    if (size) return size;
    return DEFAULT_CARD_SIZE;
  }, [size]);

  React.useEffect(() => {
    setTimeout(() => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    }, index * 120);

    const unsubscribe = pan.addListener(value => {
      panXValue.current = value.x;
      panYValue.current = value.y;
    });

    return () => {
      pan.removeListener(unsubscribe);
    };
  }, []);

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Animated.spring(rotateAngle, {
        //   toValue: pan.x.interpolate({
        //     inputRange: [-300, 300],
        //     outputRange: [-3, 3],
        //     extrapolate: 'clamp',
        //   }),
        //   useNativeDriver: false,
        // }).start();
        pan.setOffset({
          x: panXValue.current,
          y: panYValue.current,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        if (panXValue.current > 150) {
          Animated.spring(pan, {
            toValue: { x: 600, y: panYValue.current },
            speed: 1,
            useNativeDriver: false,
          }).start();
          setTimeout(() => {
            onRemove();
          }, 200);
        } else if (panXValue.current < -150) {
          Animated.spring(pan, {
            toValue: { x: -600, y: panYValue.current },
            speed: 1,
            useNativeDriver: false,
          }).start();
          setTimeout(() => {
            onRemove();
          }, 200);
        } else {
          pan.flattenOffset();
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
          Animated.spring(rotateAngle, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        ...styles.card,
        ...cardShadowStyle,
        width: STANDARD_CARD_WIDTH * cardSize,
        height: STANDARD_CARD_HEIGHT * cardSize,
        zIndex: index,
        borderRadius: 4 * cardSize,
        transform: [
          ...pan.getTranslateTransform(),
          // {
          //   rotate: rotateAngle.interpolate({
          //     inputRange: [-3, 3],
          //     outputRange: ['-15deg', '15deg'],
          //   }),
          // },
        ],
      }}
      {...panResponder.panHandlers}
    >
      {isFront ? (
        <>
          <View
            style={{
              ...styles.cardTopLeft,
              top: 1.5 * cardSize,
              left: 3 * cardSize,
            }}
          >
            <Text style={{ ...styles.cardValue, fontSize: 16 * cardSize }}>
              {value}
            </Text>
            <MaterialCommunityIcons
              name={cardTypeIconName}
              size={9 * cardSize}
              color={Colors.white}
            />
          </View>
          <MaterialCommunityIcons
            name={cardTypeIconName}
            size={32 * cardSize}
            color={Colors.white}
          />
          <View
            style={{
              ...styles.cardBottomRight,
              right: 3 * cardSize,
              bottom: 1.5 * cardSize,
            }}
          >
            <Text style={{ ...styles.cardValue, fontSize: 16 * cardSize }}>
              {value}
            </Text>
            <MaterialCommunityIcons
              name={cardTypeIconName}
              size={9 * cardSize}
              color={Colors.white}
            />
          </View>
        </>
      ) : (
        <>
          <MaterialCommunityIcons
            name='arch'
            size={42 * cardSize}
            color={Colors.white}
          />
        </>
      )}
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    backgroundColor: Colors.green,

    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTopShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  cardBelowShadow: {
    shadowColor: '#00000020',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  cardTopLeft: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardBottomRight: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
  cardValue: {
    color: Colors.white,
  },
});
