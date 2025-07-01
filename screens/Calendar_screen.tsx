import { View, Text } from 'react-native';
import { styles } from '../styles/styles';


import { Calendar } from '../components/calendar';

export const CalendarScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar />
      </View>
    </View>
  );
};