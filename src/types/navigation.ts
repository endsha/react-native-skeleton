import type {StackNavigationProp} from '@react-navigation/stack';

export type MainStackParamList = {
  readonly Home: undefined;
  readonly Cards: undefined;
};

export type MainStackNavigationProp = StackNavigationProp<MainStackParamList>;
