import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../componentsForTesting/HomeScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('HomeScreen Tests', () => {
  test('Test that the HomeScreen renders correctly ', () => {
    const { getByText, getByTestId } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);

    expect(getByText('Museum Home')).toBeTruthy();

    expect(getByText('You have arrived at the museum. Where would you like to go?')).toBeTruthy();
  });

  test('Test to display default option', () => {
    const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);

    expect(getByText('Press the different areas of the museum above')).toBeTruthy();
  });

});