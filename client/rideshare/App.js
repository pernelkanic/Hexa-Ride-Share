import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LocationScreen from "./components/LocationScreen";
import Login from "./components/Login";
import MapScreen from "./components/MapScreen";
import ProfilePage from "./components/ProfilePage";
import RideShareApp from "./components/RideShareApp";
import RoleSelectionScreen from "./components/RoleSelectionScreen";
import DriverHome from "./components/DriverComponents/DriverHome";
import AvailableRides from "./components/AvailableRides";
import RideDetails from "./components/RideDetails";
import PostRideScreen from "./components/DriverComponents/PostRideScreen";

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
          name="RoleSelectionScreen"
          component={RoleSelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RideShareApp"
          component={RideShareApp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfilePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverHome"
          component={DriverHome}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AvailableRides"
          component={AvailableRides}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="RideDetails"
          component={RideDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
         name="PostRideScreen"
          component={PostRideScreen}
          options={{ headerShown: false }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
