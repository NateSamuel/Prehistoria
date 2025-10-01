import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CategoriesProvider } from "./CategoriesProvider";
import DinoDashboard from "../screens/DinoDashboardScreen";
import QuestionScreen from "../screens/QuestionScreen";

const Stack = createStackNavigator();

//this nested navigation stack was required to be created in order for the two items to share information with each other about questions that were correct etc. before being submitted to the database
const DinoNavStack = () => (
  <CategoriesProvider>
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen options={{ headerTitle: "" , headerShown: false}} name="Dinosaur Dashboard" component={DinoDashboard} />
      <Stack.Screen options={{ headerTitle: "Categorizer"}} name="Question Screen" component={QuestionScreen} />
    </Stack.Navigator>
  </CategoriesProvider>
);

export default DinoNavStack;