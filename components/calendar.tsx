import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../styles/styles';


export const Calendar = () => {
    const [thisDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const renderCalendar = () => {

        const thisMonth = thisDate.getMonth() + 1;
        const thisYear = thisDate.getFullYear();
        const thisDay = thisDate.getDate();
        const selectedMonth = selectedDate.getMonth() + 1;
        const selectedYear = selectedDate.getFullYear();
        const selectedDay = selectedDate.getDate();

        return (
            <View style={styles.container}>
                <Pressable onPress={increaseDate}>
                    <Text style={styles.text}>+</Text>
                </Pressable>
                <Pressable onPress={decreaseDate}>
                    <Text style={styles.text}>-</Text>
                </Pressable>
                <Text style={styles.text}>Current Date : {thisYear}/{thisMonth}/{thisDay}</Text>
                <Text style={styles.text}>Selected Date : {selectedYear}/{selectedMonth}/{selectedDay}</Text>
            </View>
        );
    };

    const increaseDate = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1));
        console.log(`Increased date to: ${selectedDate}`);
    };

    const decreaseDate = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 1));
        console.log(`Decreased date to: ${selectedDate}`);
    };

    return renderCalendar();
}