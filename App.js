import {StyleSheet, Text, View,  ScrollView, TouchableOpacity, Image} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { useEffect, useState } from "react";
import Entry from './screens/EntryScreen';
import CreateAccount from './screens/CreateAccount';
import HomeScreen from './screens/HomeScreen';
import SpeciesExhibit from './screens/SpeciesExhibitScreen';
import LocHumanArrivals from './screens/LocHumanArrivalsScreen';
import DinoExhibit from './screens/DinoExhibitScreen';
import EvolutionExhibit from './screens/EvolutionExhibitScreen.js';
import FossilClean from './screens/FossilCleanScreen.js';
import DinoSummary from './screens/DinoSummaryScreen';
import DinoNavStack from "./components/DinoNavStack";
import DinoCollections from './screens/DinoCollections';
import DinoProgressTracker from './screens/DinoProgressTracker';
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

const App = () => {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "MadimiOne": require("./assets/fonts/MadimiOne-Regular.ttf"),
        "Mako": require("./assets/fonts/Mako-Regular.ttf"),
      });
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
   return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Entry">
        <Stack.Screen options={{ headerTitle: '' }} name="Entry" component={Entry} />
        <Stack.Screen options={{ headerTitle: '' }} name="Create Account" component={CreateAccount} />
        <Stack.Screen options={{ headerTitle: '' }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerTitle: '' }} name="Dinosaur Exhibit" component={DinoExhibit} />
        <Stack.Screen options={{ headerTitle: '' }} name="Dinosaur Summary" component={DinoSummary} />
        <Stack.Screen options={{ headerTitle: ''}} name="DinoNavStack" component={DinoNavStack} />
        <Stack.Screen options={{ headerTitle: "" }} name="Dinosaur Collections" component={DinoCollections} />
        <Stack.Screen options={{ headerTitle: "" }} name="Dinosaur Progress Tracker" component={DinoProgressTracker} />
        <Stack.Screen options={{ headerTitle: '' }} name="Evolution Exhibit" component={EvolutionExhibit} />
        <Stack.Screen options={{ headerTitle: '' }} name="Fossil Clean-Up" component={FossilClean} />
        <Stack.Screen options={{ headerTitle: '' }} name="Species Exhibit" component={SpeciesExhibit} />
        <Stack.Screen options={{ headerTitle: '' }} name="Locate Human Arrivals" component={LocHumanArrivals} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;