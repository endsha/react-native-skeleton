import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CardComponent from '../components/Cards/Card';
import {DECK_OF_CARDS} from '../constants/cards';
import Colors from '../themes/colors';
import {Card} from '../types/cards';
import {shuffleArray} from '../utils/math';

const CardsScreen = () => {
  const [cards, setCards] = React.useState<Card[]>(shuffleArray(DECK_OF_CARDS));

  const resetCards = () => {
    setCards([]);
    setTimeout(() => {
      setCards(shuffleArray(DECK_OF_CARDS));
    }, 200);
  };

  const popCard = () => {
    setCards(cards => cards.slice(1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardDeck}>
        {cards.map((card, index) => (
          <CardComponent
            key={card.id}
            id={card.id}
            value={card.value}
            type={card.type}
            index={cards.length - index}
            isTop={index === 0}
            onRemove={() => popCard()}
            size={1}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={() => resetCards()}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  cardDeck: {
    marginTop: 92,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: Colors.orange,
    position: 'absolute',
    bottom: 56,
  },
  resetText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
