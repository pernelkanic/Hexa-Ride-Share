import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const RoleSelectionScreen = ({ navigation }) => {
  const handleRoleSelect = (role) => {
    // You can add the navigation to different screens based on the role
    console.log(`${role} selected`); // Log the selected role
    navigation.navigate("DestinationScreen"); // Navigate to the appropriate screen
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white px-4`}>
      <TouchableOpacity
        style={tw`bg-blue-500 flex-row items-center justify-between px-10 py-4 rounded-lg mb-4 w-80`}
        onPress={() => handleRoleSelect("Rider")}
      >
        <Text style={tw`text-white text-lg font-bold`}>RIDER</Text>
        <AntDesign name="rightcircleo" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`bg-blue-500 flex-row items-center justify-between px-10 py-4 rounded-lg w-80`}
        onPress={() => handleRoleSelect("Driver")}
      >
        <Text style={tw`text-white text-lg font-bold`}>DRIVER</Text>
        <AntDesign name="rightcircleo" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default RoleSelectionScreen;
