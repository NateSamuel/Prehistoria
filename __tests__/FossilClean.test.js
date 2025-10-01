import React from 'react';
import { render, act } from '@testing-library/react-native';
import { Accelerometer } from 'expo-sensors';
import FossilClean from '../componentsForTesting/FossilCleanScreen';
jest.mock('expo-sensors', () => {
  return {
    Accelerometer: {
      addListener: jest.fn(),
      removeAllListeners: jest.fn(),
      setUpdateInterval: jest.fn(),
    },
    Gyroscope: {
      addListener: jest.fn(),
      removeAllListeners: jest.fn(),
      setUpdateInterval: jest.fn(),
    },
  };
});

jest.mock('react-native-gesture-handler', () => {
  return {
    Swipeable: jest.fn().mockImplementation(() => null),
    DrawerLayout: jest.fn().mockImplementation(() => null),
    State: {},
    PanGestureHandler: jest.fn().mockImplementation(() => null),
    createNativeWrapper: jest.fn().mockImplementation(() => null),
    Directions: {},
  };
});

test('test to check that the FossilClean component renders correctly', () => {
  const { getByText } = render(<FossilClean />);
  expect(getByText('Fossil Clean Up')).toBeTruthy();
  expect(getByText('Twist your phone to clean up the fossil!')).toBeTruthy();
});

test('Snapshot test to check things are not changing by accident', () => {
  const tree = render(<FossilClean />).toJSON();
  expect(tree).toMatchSnapshot();
});