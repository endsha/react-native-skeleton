export enum CardType {
  Spades = 'Spades',
  Clubs = 'Clubs',
  Diamonds = 'Diamonds',
  Hearts = 'Hearts',
}

export enum CardValue {
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'J',
  Queen = 'Q',
  King = 'K',
  Ace = 'A',
}

export type Card = {
  id: string;
  value: CardValue;
  type: CardType;
};
