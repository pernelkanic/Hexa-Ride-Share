import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const DriverPage = ({ navigation }) => {
  const [driverName, setDriverName] = useState("");
  const [carType, setCarType] = useState("");
  const [gender, setGender] = useState(""); // State to store driver's gender

  // Function to handle driver registration or profile creation
  const handleRegister = () => {
    if (!driverName || !carType || !gender) {
      Alert.alert("Error", "Please fill out all fields including gender.");
      return;
    }

    // Assuming the backend or context is set to save the driver's data
    const driverData = {
      driverName,
      carType,
      gender,
    };

    console.log("Driver registered:", driverData);

    // After registering, navigate back or to another page
    navigation.navigate("RideShareApp"); // Navigate to RiderPage or homepage after registration
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white px-4`}>
      <Text style={tw`text-3xl font-bold mb-6`}>Driver Registration</Text>

      {/* Driver Name Input */}
      <TextInput
        style={tw`border border-gray-300 p-3 rounded mt-2 w-80`}
        placeholder="Enter your name"
        value={driverName}
        onChangeText={setDriverName}
      />

      {/* Car Type Input */}
      <TextInput
        style={tw`border border-gray-300 p-3 rounded mt-4 w-80`}
        placeholder="Enter car type (e.g., Sedan, SUV)"
        value={carType}
        onChangeText={setCarType}
      />

      {/* Gender Selection Picker */}
      <View style={tw`border border-gray-300 p-3 rounded mt-4 w-80`}>
        <Text style={tw`text-lg mb-2`}>Select your Gender</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={tw`border border-gray-300 p-3 rounded`}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* Register Button */}
      <TouchableOpacity
        style={tw`bg-blue-600 px-10 py-4 rounded-lg mt-6 w-80`}
        onPress={handleRegister}
      >
        <Text style={tw`text-white text-center text-xl font-bold`}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DriverPage;
