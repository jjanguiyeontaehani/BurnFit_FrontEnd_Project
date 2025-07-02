import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  fullContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
  calendarOuterContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: 140,
    padding: 0,
  },
  calendarTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: '#333333',
  },
  calendarMapsContainer: {
    flexDirection: 'row',
    height: '100%',
    width: 400,
  },
  calendarMapContainer: {
    overflow: 'hidden',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  calendarWeekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calendarButton: {
    margin: 5,
    width: 30,
    height: 30,
    textAlign: 'center',
    color: '#00FFFF',
    lineHeight: 30,
    fontSize: 20,
  },
  calendarDay: {
    margin: 7,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: 50,
    fontSize: 18,
  },
});