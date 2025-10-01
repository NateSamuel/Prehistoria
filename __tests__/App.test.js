import { render, screen, waitFor } from '@testing-library/react-native';
import App from '../App';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-gesture-handler/jestSetup';

//had to implement these mocks so that the tests can work for this screen
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
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

test('tests that the fonts should load and the splash screen should be hidden', async () => {
  render(<App />);

  await waitFor(() => expect(SplashScreen.hideAsync).toHaveBeenCalled());
});