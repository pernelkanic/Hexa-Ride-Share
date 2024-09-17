import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Modal from "react-native-modal";
import tw from "twrnc"; // Tailwind import

const LocationScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Request for location permissions and get location automatically
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          Alert.alert(
            "Location Error",
            "Permission to access location was denied"
          );
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

  const handleUseLocation = async () => {
    console.log("Use My Location button clicked"); // Debugging statement

    try {
      // Request location
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      console.log("Location fetched: ", coords); // Log location for debugging

      // Update state and navigate
      setLocation(coords);
      setModalVisible(false);

      // Delay navigation to ensure modal state is updated
      setTimeout(() => {
        console.log("Navigating to RoleSelection"); // Debugging statement
        navigation.navigate("RoleSelection");
      }, 10);
    } catch (error) {
      // Error handling
      console.log("Error fetching location: ", error); // Log error for debugging
      setErrorMsg("Failed to fetch location");
      Alert.alert("Location Error", "Failed to fetch location");
    }
  };

  const handleSkip = () => {
    setModalVisible(false);
    navigation.navigate("RoleSelection");
  };

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

      <Modal
        isVisible={modalVisible}
        style={tw`m-0 items-center justify-center`}
      >
        <View style={tw`bg-white rounded-lg p-5 w-80`}>
          <View style={tw`items-center mb-5`}>
            <Text style={tw`text-5xl pt-2`}>📍</Text>
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
    </View>
  );
};

export default LocationScreen;
