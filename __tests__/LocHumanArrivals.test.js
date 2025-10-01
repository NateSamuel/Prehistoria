import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import LocHumanArrivals from '../componentsForTesting/LocHumanArrivalsScreen';
import * as Location from "expo-location";

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  reverseGeocodeAsync: jest.fn(),
}));

test('test that the LocHumanArrivals screen is rendered and the location response works correctly', async () => {

  Location.requestForegroundPermissionsAsync.mockResolvedValue({
    status: 'granted',
  });


  Location.getCurrentPositionAsync.mockResolvedValue({
    coords: {
      latitude: 51.5074,
      longitude: -0.1278,
    },
  });


  Location.reverseGeocodeAsync.mockResolvedValue([{
    isoCountryCode: 'GB',
  }]);

  render(<LocHumanArrivals />);


  await waitFor(() => expect(screen.getByText('The modern human arrived in Europe at around 40,000-25,000 thousand years ago')).toBeTruthy());
});

test('test that the data continentToYear works correctly', async () => {
  render(<LocHumanArrivals />);


  await screen.findByText('The modern human arrived in Europe at around 40,000-25,000 thousand years ago');

  expect(screen.getByText('The modern human arrived in Europe at around 40,000-25,000 thousand years ago')).toBeTruthy();
});