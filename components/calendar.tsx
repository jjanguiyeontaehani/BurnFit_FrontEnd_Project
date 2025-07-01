import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Reanimated, { useSharedValue, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import { styles } from '../styles/styles';


export const Calendar = () => {
    const [thisDate, setThisDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate()));

    const calendarType = useSharedValue('month');

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const renderCalendar = () => {
        const thisMonth = thisDate.getMonth() + 1;
        const thisYear = thisDate.getFullYear();

        const thisMonthName = months[thisMonth - 1];

        return (
            <Reanimated.View style={{}}>
                <View style={styles.calendarInnerContainer}>
                    <Pressable onPress={decreaseMonth}>
                        <Text style={styles.calendarLeftButton}>＜</Text>
                    </Pressable>
                    <Text style={styles.text}>
                        {thisMonthName} {thisYear}
                    </Text>
                    <Pressable onPress={increaseMonth}>
                        <Text style={styles.calendarRightButton}>＞</Text>
                    </Pressable>
                </View>
                {renderMap()}
            </Reanimated.View>
        );
    };

    const increaseMonth = () => {
        setThisDate(new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, thisDate.getDate()));
    };

    const decreaseMonth = () => {
        setThisDate(new Date(thisDate.getFullYear(), thisDate.getMonth() - 1, thisDate.getDate()));
    };

    const increaseWeek = () => {
        setThisDate(new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate() + 7));
    };

    const decreaseWeek = () => {
        setThisDate(new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate() - 7));
    };

    const renderMap = () => {
        if (calendarType.value === 'week') {
            // const maps = generateWeekMap(thisDate);
        } else if (calendarType.value === 'month') {
            const maps = generateMonthMap(thisDate);

            return (
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {days.map((day, index) => (
                            <Text key={index} style={{ color: index == 0 ? '#FF7777' : index == 6 ? '#77DDFF' : '#777777', width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderColor: '#ccc', textAlign: 'center', lineHeight: 50, }}>
                                {day}
                            </Text>
                        ))}
                    </View>
                    {renderMonthMaps(maps)}
                </View>
            );
        }
    }

    const renderMonthMaps = (maps: any[][][]) => {
        const renderMonthMap = (map: any[][]) => {
            return (map.map((week, weekIndex) => (
                <View key={weekIndex} style={styles.calendarInnerContainer}>
                    {week.map((day, dayIndex) => (
                        <Pressable
                            key={dayIndex}
                            onPress={() => {
                                setSelectedDate(new Date(day.day.getFullYear(), day.day.getMonth(), day.day.getDate()));
                            }}
                            style={styles.calendarDay}
                        >
                            <Text style={{ color: day.isThisMonth ? '#000000' : '#BBBBBB', fontWeight: day.isSelected ? 'bold' : 'normal', fontSize: day.isSelected ? 20 : 18, borderWidth: day.isSelected ? 1 : 0, borderColor: '#00DDFF', borderRadius: 25, width: 35, height: 35, textAlign: 'center', lineHeight: 35 }}>
                                {day.date !== 0 ? day.date : 'UNK'}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            ))
            );
        }

        const swipeToLeft = (prog: SharedValue<number>, drag: SharedValue<number>) => {
            const styleAnimation = useAnimatedStyle(() => {
                return {
                    transform: [{ translateX: drag.value - 410 }], // todo: Adjust the value based on your layout
                };
            });

            return (
                <Reanimated.View style={styleAnimation}>
                    {renderMonthMap(maps[0])}
                </Reanimated.View>
            );
        }

        const swipeToRight = (prog: SharedValue<number>, drag: SharedValue<number>) => {
            const styleAnimation = useAnimatedStyle(() => {
                return {
                    transform: [{ translateX: drag.value + 410 }], // todo: Adjust the value based on your layout
                };
            });

            return (
                <Reanimated.View style={styleAnimation}>
                    {renderMonthMap(maps[2])}
                </Reanimated.View>
            );
        }

        return (
            <ReanimatedSwipeable
                friction={1.7}
                rightThreshold={40}
                leftThreshold={40}
                renderRightActions={swipeToRight}
                renderLeftActions={swipeToLeft}
            >
                {renderMonthMap(maps[1])}
            </ReanimatedSwipeable>

        )
    }

    const generateMonthMap = (thisDate: Date) => {
        const map = [];
        const targetMonths = [];

        if (thisDate.getMonth() === 11) {
            targetMonths.push(new Date(thisDate.getFullYear(), thisDate.getMonth() - 1, 1));
            targetMonths.push(new Date(thisDate.getFullYear(), thisDate.getMonth(), 1));
            targetMonths.push(new Date(thisDate.getFullYear() + 1, 0, 1));
        } else if (thisDate.getMonth() === 0) {
            targetMonths.push(new Date(thisDate.getFullYear() - 1, 11, 1));
            targetMonths.push(new Date(thisDate.getFullYear(), thisDate.getMonth(), 1));
            targetMonths.push(new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, 1));
        } else {
            targetMonths.push(new Date(thisDate.getFullYear(), thisDate.getMonth() - 1, 1));
            targetMonths.push(new Date(thisDate.getFullYear(), thisDate.getMonth(), 1));
            targetMonths.push(new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, 1));
        }

        for (let i = 0; i < targetMonths.length; i++) {
            const month = targetMonths[i];


            const thisYear = month.getFullYear();
            const thisMonth = month.getMonth() + 1;
            const monthMap = [];

            const startDay = new Date(thisYear, thisMonth - 1, 1).getDay();
            const lastDayOfMonth = new Date(thisYear, thisMonth, 0);

            for (let i = 1 - startDay; i <= lastDayOfMonth.getDate(); i += 7) {
                const weekMap = [];
                for (let j = 0; j < 7; j++) {
                    var currentDate = new Date(thisYear, thisMonth - 1, i + j);

                    if (i + j < 1) {
                        if (thisMonth === 1) {
                            const lastDayOfPrevMonth = new Date(thisYear - 1, 12, 0);
                            currentDate = new Date(thisYear - 1, 11, lastDayOfPrevMonth.getDate() + (i + j));
                        } else {
                            const lastDayOfPrevMonth = new Date(thisYear, thisMonth - 1, 0);
                            currentDate = new Date(thisYear, thisMonth - 2, lastDayOfPrevMonth.getDate() + (i + j));
                        }
                    }
                    if (lastDayOfMonth.getDate() <= i + j) {
                        currentDate = new Date(thisYear, thisMonth, i + j - lastDayOfMonth.getDate());
                    }

                    const isToday = currentDate.toDateString() === thisDate.toDateString();
                    const isSelected = currentDate.toDateString() === selectedDate.toDateString();
                    const currendDays = days[currentDate.getDay()];
                    weekMap.push({
                        date: currentDate.getDate(),
                        day: currentDate,
                        currendDays: currendDays,
                        isToday: isToday,
                        isSelected: isSelected,
                        isThisYear: currentDate.getFullYear() === thisYear,
                        isThisMonth: currentDate.getMonth() + 1 === thisMonth
                    });

                }
                monthMap.push(weekMap);
            }
            map.push(monthMap);
        }

        return map;
    };


    return renderCalendar();
}