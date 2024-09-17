import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import tw from 'twrnc'; // Tailwind import

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(coords);
      } catch (error) {
        console.log("Error fetching location: ", error); // Log error for debugging
        setErrorMsg("Failed to fetch location");
        Alert.alert("Location Error", "Failed to fetch location");
      }
    };

    fetchLocation();
  }, []);

  if (!location && !errorMsg) {
    return (
      <View style={tw`flex-1 items-center justify-center text-lg`}>
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
          latitudeDelta: 0.015,
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
