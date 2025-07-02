import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Reanimated, { withTiming, withSpring, withSequence, useSharedValue, runOnJS, useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '../styles/styles';


export const Calendar = () => {
    const [thisDate, setThisDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate()));

    const calendarType = useSharedValue('month');
    const calendarHeight = useSharedValue(400);
    const INITIAL_POSITION = -398;
    const calendarPosition = useSharedValue(INITIAL_POSITION);


    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const renderCalendar = () => {
        const thisMonth = thisDate.getMonth() + 1;
        const thisYear = thisDate.getFullYear();

        const thisMonthName = months[thisMonth - 1];

        const panGesture = Gesture.Pan()
            .onUpdate((event) => {
                calendarPosition.value = INITIAL_POSITION + event.translationX;
                calendarHeight.value = event.translationY;
            })

            .onEnd((event) => {
                calendarHeight.value = withTiming(400);

                if (event.translationX > 150) {
                    calendarPosition.value = withTiming(INITIAL_POSITION * 2)
                    calendarPosition.value = INITIAL_POSITION;
                    
                    if (calendarType.value === 'week') {
                        runOnJS(decreaseWeek)();
                    } else if (calendarType.value === 'month') {
                        runOnJS(decreaseMonth)();
                    }
                } else if (event.translationX < -150) {
                    calendarPosition.value = withTiming(0)
                    calendarPosition.value = INITIAL_POSITION;
                    
                    if (calendarType.value === 'week') {
                        runOnJS(increaseWeek)();
                    } else if (calendarType.value === 'month') {
                        runOnJS(increaseMonth)();
                    }
                } else {
                    calendarPosition.value = withTiming(INITIAL_POSITION)
                }

            });

        return (
            <View>
                <View style={styles.calendarTopContainer}>
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
                <View style={styles.calendarTopContainer}>
                    {days.map((day, index) => (
                        <Text key={index} style={{ color: index == 0 ? '#FF7777' : index == 6 ? '#77DDFF' : '#777777', width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderColor: '#ccc', textAlign: 'center', lineHeight: 50, }}>
                            {day}
                        </Text>
                    ))}
                </View>
                <Reanimated.View style={{ flexDirection: 'column' }}>
                    <GestureDetector gesture={panGesture}>
                        {renderMap()}
                    </GestureDetector>
                </Reanimated.View>
            </View>
        );
    };

    const renderMap = () => {
        if (calendarType.value === 'week') {
            // const maps = generateWeekMap(thisDate);
        } else if (calendarType.value === 'month') {
            const maps = generateMonthMap(thisDate);

            return (
                renderMonthMaps(maps)
            );
        }
    }

    const renderMonthMaps = (maps: any[][][]) => {
        const renderMonthMap = (map: any[][]) => {
            return (
                <View style={{ width: '100%', height: '100%' }}>
                    {map.map((week, weekIndex) => (
                        <View key={weekIndex} style={styles.calendarWeekContainer}>
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
                    ))}
                </View>
            );
        }

        const animateStyle = useAnimatedStyle(() => {
            return {
                transform: [{ 
                    translateX: calendarPosition.value
                }],
                height: calendarHeight.value,
            };
        });

        return (
            <Reanimated.View style={[styles.calendarMapContainer, animateStyle]}>
                {renderMonthMap(maps[0])}
                {renderMonthMap(maps[1])}
                {renderMonthMap(maps[2])}
            </Reanimated.View>

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

    const getThisWeek = () => {
        const date = new Date(thisDate);
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        
        return Math.ceil(date.getDate() + firstDayOfMonth.getDay()) / 7;
    }

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


    return renderCalendar();
}