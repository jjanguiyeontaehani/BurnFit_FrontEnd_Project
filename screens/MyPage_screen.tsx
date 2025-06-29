import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

export function MyPageScreen(){
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Welcome to the MyPage Screen!</Text>
    </View>
  );
};