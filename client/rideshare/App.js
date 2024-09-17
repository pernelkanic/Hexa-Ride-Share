import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LocationScreen from "./components/LocationScreen";
import Login from "./components/Login";
import RoleSelectionScreen from "./components/RoleSelectionScreen"; // Import the new Role Selection Screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LocationScreen"
          component={LocationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RoleSelection"
          component={RoleSelectionScreen}
          options={{ headerShown: false }} // Ensure the header is not shown
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
