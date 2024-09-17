import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import tw from 'twrnc'; // Tailwind import

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Request for location permissions and get location automatically
  useEffect(() => {
    (async () => {
      try {
        // Request foreground location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        // Get the current location with higher accuracy
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(coords);
      } catch (error) {
        setErrorMsg('Failed to fetch location');
        Alert.alert("Location Error", errorMsg);
      }
    })();
  }, []);

  if (!location && !errorMsg) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text>Fetching your location...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <MapView
        style={tw`flex-1`}
        region={{
          latitude: location?.latitude || 37.78825,
          longitude: location?.longitude || -122.4324,
          latitudeDelta: 0.015,  // Smaller delta for a more zoomed-in view
          longitudeDelta: 0.0121,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            description="This is where you are currently located"
          />
        )}
      </MapView>
    </View>
  );
};

export default LocationScreen;
