import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Welcome to the Home Screen!</Text>
    </View>
  );
};