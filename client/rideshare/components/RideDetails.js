import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc"; // Tailwind CSS for styling
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RideDetails = ({ route }) => {
  const { requestId } = route.params;
  const [riderName, setRiderName] = useState("");
  const [gender, setGender] = useState("");
  const [time, setTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [contact, setContact] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (
      !riderName ||
      !gender ||
      !time ||
      !pickupLocation ||
      !destinationLocation ||
      !contact
    ) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    // Create a new ride request object
    const rideRequest = {
      rider_name: riderName,
      gender: gender,
      time: time,
      pickup_location: pickupLocation,
      destination_location: destinationLocation,
      contact: contact,
    };

    try {
      // Send POST request to create a new ride request
      await axios.post("http://192.168.62.164:3000/api/ride-requests", rideRequest);
      Alert.alert("Success", "Ride request has been submitted!");
      navigation.navigate("AvailableRides");
    } catch (error) {
      Alert.alert("Error", `Failed to submit ride request: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`bg-blue-600 p-4 flex-row justify-between items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold`}>Ride Request Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>

      {/* Ride Request Form */}
      <ScrollView style={tw`p-4`}>
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-bold mb-1`}>Rider Name:</Text>
          <TextInput
            style={tw`bg-gray-100 p-2 rounded`}
            placeholder="Enter your name"
            value={riderName}
            onChangeText={setRiderName}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-bold mb-1`}>Gender:</Text>
          <TextInput
            style={tw`bg-gray-100 p-2 rounded`}
            placeholder="Enter your gender"
            value={gender}
            onChangeText={setGender}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-bold mb-1`}>Time:</Text>
          <TextInput
            style={tw`bg-gray-100 p-2 rounded`}
            placeholder="Enter time (e.g., 10:00 AM)"
            value={time}
            onChangeText={setTime}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-bold mb-1`}>Pickup Location:</Text>
          <TextInput
            style={tw`bg-gray-100 p-2 rounded`}
            placeholder="Enter pickup location"
            value={pickupLocation}
            onChangeText={setPickupLocation}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-bold mb-1`}>Destination Location:</Text>
          <TextInput
            style={tw`bg-gray-100 p-2 rounded`}
            placeholder="Enter destination location"
            value={destinationLocation}
            onChangeText={setDestinationLocation}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-bold mb-1`}>Contact:</Text>
          <TextInput
            style={tw`bg-gray-100 p-2 rounded`}
            placeholder="Enter contact number"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={tw`bg-blue-500 p-4 rounded-full shadow-lg`}
          onPress={handleSubmit}
        >
          <Text style={tw`text-white text-center text-lg font-bold`}>Submit Ride Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RideDetails;
