import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import BounceAnimation from './components/BounceAnimation';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BounceAnimation />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
