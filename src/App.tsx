import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import BounceAnimation from './components/BounceAnimation';

const screenWidth = Dimensions.get('screen').width;

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{position: 'absolute', bottom: 100, alignItems: 'center'}}>
        <BounceAnimation />
        <View
          style={{width: screenWidth, backgroundColor: 'black', height: 1}}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
