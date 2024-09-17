<<<<<<< HEAD
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Modal from "react-native-modal";
import tw from "twrnc"; // Tailwind import

const LocationScreen = ({ navigation }) => {
  // Make sure to receive the navigation prop
  const [modalVisible, setModalVisible] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

=======
import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import tw from 'twrnc'; // Tailwind import

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Request for location permissions and get location automatically
>>>>>>> 0df5e7df0822de25627f86996efbb1ce6c4e39af
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

<<<<<<< HEAD
  const handleUseLocation = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
    setModalVisible(false);
    // Navigate to RoleSelectionScreen after location is set
    navigation.navigate("RoleSelection");
  };

  const handleSkip = () => {
    setModalVisible(false);
    // Navigate to RoleSelectionScreen even if the user skips location
    navigation.navigate("RoleSelection");
  };
=======
  if (!location && !errorMsg) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text>Fetching your location...</Text>
      </View>
    );
  }
>>>>>>> 0df5e7df0822de25627f86996efbb1ce6c4e39af

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
<<<<<<< HEAD

      <Modal
        isVisible={modalVisible}
        style={tw`m-0 items-center justify-center`}
      >
        <View style={tw`bg-white rounded-lg p-5 w-80`}>
          <View style={tw`items-center mb-5`}>
            <Text style={tw`text-5xl`}>📍</Text>
          </View>
          <Text style={tw`text-xl font-bold text-center`}>
            Enable your location
          </Text>
          <Text style={tw`text-center text-gray-500 my-3`}>
            Choose your location to start finding requests around you
          </Text>
          <TouchableOpacity
            style={tw`bg-blue-600 rounded-lg py-3 items-center mb-3`}
            onPress={handleUseLocation}
          >
            <Text style={tw`text-white text-lg font-bold`}>
              Use my location
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={tw`text-blue-600 text-center underline`}>
              Skip for now
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
=======
>>>>>>> 0df5e7df0822de25627f86996efbb1ce6c4e39af
    </View>
  );
};

export default LocationScreen;
