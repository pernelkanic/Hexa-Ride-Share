import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const RoleSelectionScreen = ({ navigation }) => {
  // Function to handle Rider selection
  const handleRiderSelect = () => {
    navigation.navigate("RideShareApp"); // Navigate to RiderPage
  };

  // Function to handle Driver selection
  const handleDriverSelect = () => {
    navigation.navigate("DriverHome"); // Navigate to DriverPage
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white px-4`}>
      <TouchableOpacity
        style={tw`bg-blue-600 flex-row items-center justify-between px-10 py-4 rounded-lg mb-4 w-80`}
        onPress={handleRiderSelect}
      >
        <Text style={tw`text-white text-3xl font-bold`}>RIDER</Text>
        <AntDesign name="rightcircle" size={35} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`bg-blue-600 flex-row items-center justify-between px-10 py-4 rounded-lg w-80`}
        onPress={handleDriverSelect}
      >
        <Text style={tw`text-white text-3xl font-bold`}>DRIVER</Text>
        <AntDesign name="rightcircle" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default RoleSelectionScreen;
