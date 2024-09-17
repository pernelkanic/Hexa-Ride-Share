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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

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

  return (
    <View style={tw`flex-1`}>
      <MapView
        style={tw`flex-1`}
        region={{
          latitude: location?.latitude || 37.78825,
          longitude: location?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={"Your Location"}
          />
        )}
      </MapView>

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
    </View>
  );
};

export default LocationScreen;
