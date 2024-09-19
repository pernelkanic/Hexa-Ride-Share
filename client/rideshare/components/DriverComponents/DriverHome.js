import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import tw from "twrnc"; // For Tailwind styles
import { useNavigation } from "@react-navigation/native";

const DriverHome = () => {
  const [rideRequests, setRideRequests] = useState([]);
  const navigation = useNavigation();

  // Fetch all ride requests when the app loads
  useEffect(() => {
    const fetchAllRideRequests = async () => {
      try {
        // Replace with your actual endpoint to get ride requests
        const response = await axios.get(
          "http://192.168.62.164:3000/api/ride-requests"
        );
        setRideRequests(response.data);
      } catch (error) {
        Alert.alert(
          "Error",
          `Failed to fetch ride requests. Error: ${error.message}`
        );
      }
    };

    fetchAllRideRequests();
  }, []);

  const handlePostRide = () => {
    // Handle Post Ride logic
    navigation.navigate("PostRideScreen"); // Navigate to the "Post Ride" screen
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Top Navigation Bar */}
      <View style={tw`bg-blue-600 p-4 flex-row justify-between items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold`}>Buddy</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>

      {/* Post Your Ride Button */}
      <View style={tw`flex-row justify-center mt-4`}>
        <TouchableOpacity
          style={tw`bg-white flex-row p-4 rounded-full shadow-lg w-10/12 justify-between items-center`}
          onPress={handlePostRide}
        >
          <Text style={tw`text-lg font-bold`}>Post Your Ride...</Text>
          <Ionicons name="arrow-forward-circle" size={32} color="black" />
        </TouchableOpacity>
      </View>

      {/* Requested Rides Section */}
      <ScrollView style={tw`p-5`}>
        <Text style={tw`text-lg font-bold mb-2`}>Requested Rides</Text>
        {rideRequests.length > 0 ? (
          rideRequests.map((request) => (
            <View
              key={request.id}
              style={tw`bg-white p-4 mb-3 rounded-lg shadow-md`}
            >
              <Text style={tw`text-base font-bold`}>
                Rider Name: {request.rider_name || "N/A"}
              </Text>
              <Text style={tw`text-base`}>Gender: {request.gender || "N/A"}</Text>
              <Text style={tw`text-base`}>
                Pickup Location: {request.pickup_location || "N/A"}
              </Text>
              <Text style={tw`text-base`}>
                Destination Location: {request.destination_location || "N/A"}
              </Text>
              <Text style={tw`text-base`}>Contact: {request.contact || "N/A"}</Text>
              
            </View>
          ))
        ) : (
          <Text style={tw`text-center text-gray-500`}>
            No ride requests available
          </Text>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={tw`flex-row justify-around bg-gray-100 p-3`}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={32} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle-outline" size={32} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DriverHome;
