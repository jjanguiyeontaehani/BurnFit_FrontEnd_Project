import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Reanimated, { withTiming, useSharedValue, runOnJS, useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '../styles/styles';


export const Calendar = () => {
    const testDate = new Date('2025-07-11');
    const [thisDate, setThisDate] = useState(new Date(testDate));
    const [thisWeek, updateThisWeek] = useState(getThisWeek(thisDate));
    const [selectedDate, setSelectedDate] = useState(new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate()));

    useEffect(() => {
        updateThisWeek(getThisWeek(thisDate));
    }, [thisDate]);

        function getThisWeek(date: Date | null = null) {
        if (!date) {
            date = new Date(thisDate);
        }
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        return Math.floor((date.getDate() + firstDayOfMonth.getDay()) / 7);
    }

    const increaseMonth = () => {
        let newDate = new Date(thisDate);
        if (newDate.getMonth() === 11) {
            newDate = new Date(newDate.getFullYear() + 1, 0, 1);
        } else {
            newDate = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1);
        }
        setThisDate(newDate);
    };

    const decreaseMonth = () => {
        let newDate = new Date(thisDate);
        if (newDate.getMonth() === 0) {
            newDate = new Date(newDate.getFullYear() - 1, 11, 1);
        } else {
            newDate = new Date(newDate.getFullYear(), newDate.getMonth() - 1, 1);
        }
        setThisDate(newDate);
    };

    const increaseWeek = () => {
        const newDate = new Date(thisDate);
        newDate.setDate(thisDate.getDate() + 7);

        setThisDate(newDate);
    };

    const decreaseWeek = () => {
        const newDate = new Date(thisDate);
        newDate.setDate(thisDate.getDate() - 7);

        setThisDate(newDate);
    };

    const calendarType = useSharedValue('month');
    const INITIAL_HEIGHT = 300;
    const MINIMUM_HEIGHT = 50;
    const calendarHeight = useSharedValue(INITIAL_HEIGHT);
    const INITIAL_POSITION_X = -398;
    const calendarPositionX = useSharedValue(INITIAL_POSITION_X);
    const INITIAL_POSITION_Y = 0;
    const calendarPositionY = useSharedValue(INITIAL_POSITION_Y);
    const dateSize = 49.5;

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const renderCalendar = () => {
        const thisMonth = thisDate.getMonth() + 1;
        const thisYear = thisDate.getFullYear();

        const thisMonthName = months[thisMonth - 1];

        const panGesture = Gesture.Pan()
            .onUpdate((event) => {
                if (calendarType.value === 'week') {
                    if (Math.abs(event.translationX) > event.translationY) {
                        calendarPositionX.value = INITIAL_POSITION_X + event.translationX;
                        calendarHeight.value = MINIMUM_HEIGHT;
                    } else {
                        calendarPositionX.value = INITIAL_POSITION_X;

                        if (MINIMUM_HEIGHT + event.translationY > INITIAL_HEIGHT) {
                            calendarHeight.value = INITIAL_HEIGHT;
                        } else {
                            calendarHeight.value = MINIMUM_HEIGHT + event.translationY;

                            const openRate = (Math.min(event.translationY, (INITIAL_HEIGHT - MINIMUM_HEIGHT))) / (INITIAL_HEIGHT - MINIMUM_HEIGHT);
                            calendarPositionY.value = INITIAL_POSITION_Y + (thisWeek * -dateSize) * (1 - openRate);
                        }
                    }
                } else if (calendarType.value === 'month') {
                    if (Math.abs(event.translationX) > -event.translationY) {
                        calendarHeight.value = INITIAL_HEIGHT;
                        calendarPositionX.value = INITIAL_POSITION_X + event.translationX;
                    } else {
                        calendarPositionX.value = INITIAL_POSITION_X;

                        if (INITIAL_HEIGHT + event.translationY < MINIMUM_HEIGHT) {
                            calendarHeight.value = MINIMUM_HEIGHT;
                        } else {
                            calendarHeight.value = INITIAL_HEIGHT + event.translationY;

                            const flipRate = 1 - ((INITIAL_HEIGHT - MINIMUM_HEIGHT) + Math.min(event.translationY, 0)) / (INITIAL_HEIGHT - MINIMUM_HEIGHT);
                            calendarPositionY.value = INITIAL_POSITION_Y + (thisWeek * -dateSize) * flipRate;
                        }
                    }
                }
            })

            .onEnd((event) => {
                if (calendarType.value === 'week') {
                    if (event.translationY > 80) {
                        calendarType.value = 'month';
                        calendarHeight.value = withTiming(INITIAL_HEIGHT);
                        calendarPositionY.value = withTiming(INITIAL_POSITION_Y);
                    } else {
                        calendarHeight.value = withTiming(MINIMUM_HEIGHT);
                        calendarPositionY.value = withTiming(INITIAL_POSITION_Y + (thisWeek * -dateSize));
                    }
                } else if (calendarType.value === 'month') {
                    if (event.translationY < -80) {
                        calendarType.value = 'week';
                        calendarHeight.value = withTiming(MINIMUM_HEIGHT);
                        calendarPositionY.value = withTiming(INITIAL_POSITION_Y + (thisWeek * -dateSize));
                    } else {
                        calendarHeight.value = withTiming(INITIAL_HEIGHT);
                        calendarPositionY.value = withTiming(INITIAL_POSITION_Y);
                    }

                }

                if (event.translationX > 150) {
                    calendarPositionX.value = withTiming(0)

                    if (calendarType.value === 'week') {
                        runOnJS(decreaseWeek)();
                        
                    } else if (calendarType.value === 'month') {
                        runOnJS(decreaseMonth)();
                    }
                    calendarPositionX.value = INITIAL_POSITION_X;
                } else if (event.translationX < -150) {
                    calendarPositionX.value = withTiming(INITIAL_POSITION_X * 2)

                    if (calendarType.value === 'week') {
                        runOnJS(increaseWeek)();
                    } else if (calendarType.value === 'month') {
                        runOnJS(increaseMonth)();
                    }
                    calendarPositionX.value = INITIAL_POSITION_X;
                } else {
                    calendarPositionX.value = withTiming(INITIAL_POSITION_X)
                }

            });

        return (
            <View style={styles.calendarContainer}>
                <View style={styles.calendarTopContainer}>
                    <Pressable onPress={decreaseMonth}>
                        <Text style={styles.calendarButton}>＜</Text>
                    </Pressable>
                    <Text style={styles.text}>
                        {thisMonthName} {thisYear}
                    </Text>
                    <Pressable onPress={increaseMonth}>
                        <Text style={styles.calendarButton}>＞</Text>
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
        if (calendarType.value === 'week') { // todo: week calendar
            const maps = generateMonthMap(thisDate);

            return (
                renderMonthMaps(maps)
            );
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
                <View style={{ width: '100%' }}>
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
                    translateX: calendarPositionX.value
                }],
                height: calendarHeight.value,
            };
        });

        const animateStyleY = useAnimatedStyle(() => {
            return {
                transform: [{
                    translateY: calendarPositionY.value
                }],
            };
        });

        return (
            <Reanimated.View style={[styles.calendarMapsContainer, animateStyle]}>
                <View style={[styles.calendarMapContainer]}>
                    <Reanimated.View style={animateStyleY}>
                        {renderMonthMap(maps[0])}
                    </Reanimated.View>
                </View>
                <View style={[styles.calendarMapContainer]}>
                    <Reanimated.View style={animateStyleY}>
                        {renderMonthMap(maps[1])}
                    </Reanimated.View>
                </View>
                <View style={[styles.calendarMapContainer]}>
                    <Reanimated.View style={animateStyleY}>
                        {renderMonthMap(maps[2])}
                    </Reanimated.View>
                </View>
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


    return renderCalendar();
}