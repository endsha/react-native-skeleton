import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../themes/colors';
import {MainStackNavigationProp} from '../types/navigation';

const HomeScreen = () => {
  const navigation = useNavigation<MainStackNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.optionBtn}
        onPress={() => {
          navigation.navigate('Cards');
        }}>
        <Text style={styles.optionText}>Cards Example</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  optionBtn: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: Colors.orange,
  },
  optionText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
