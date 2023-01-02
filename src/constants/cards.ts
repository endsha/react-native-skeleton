import {Card, CardType, CardValue} from '../types/cards';

export const STANDARD_CARD_WIDTH = 63;
export const STANDARD_CARD_HEIGHT = 88;

export const DECK_OF_CARDS: Card[] = Object.keys(CardType).reduce(
  (prevValue: Card[], currentValue) => {
    return [
      ...prevValue,
      ...Object.values(CardValue).map((value, index) => ({
        id: `${currentValue}-${index}`,
        type: currentValue as CardType,
        value: value as CardValue,
      })),
    ];
  },
  [],
);
