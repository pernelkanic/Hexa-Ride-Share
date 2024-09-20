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
import tw from "twrnc"; // Tailwind CSS for styling
import { useNavigation } from "@react-navigation/native";

const AvailableRides = () => {
  const [rideRequests, setRideRequests] = useState([]);
  const navigation = useNavigation();

  // Fetch available ride requests
  useEffect(() => {
    const fetchRideRequests = async () => {
      try {
        const response = await axios.get("http://192.168.62.164:3000/api/rides");
        setRideRequests(response.data);
      } catch (error) {
        Alert.alert("Error", `Failed to fetch ride requests: ${error.message}`);
      }
    };

    fetchRideRequests();
  }, []);

  // Handle navigation to ride details page
  const handleMoreDetails = (requestId) => {
    navigation.navigate("RideDetails", { requestId });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`bg-blue-600 p-4 flex-row justify-between items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold`}>Available Rides</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>

      {/* List of Rides */}
      <ScrollView style={tw`p-4`}>
        {rideRequests.length > 0 ? (
          rideRequests.map((ride) => (
            <View key={ride.id} style={tw`bg-gray-100 p-4 mb-4 rounded-lg shadow-lg`}>
              <Text style={tw`text-lg font-bold`}>Driver Name: {ride.driver_name || "xxx"}</Text>
              <Text style={tw`text-base`}>Gender: {ride.gender || "Male"}</Text>
              <Text style={tw`text-base`}>Car Type: {ride.car_type || "Swift"}</Text>
              <Text style={tw`text-base`}>Seats Available: {ride.seats_available || 2}</Text>
              <Text style={tw`text-base`}>Estimated Time: {ride.estimated_time || "2 minutes"}</Text>
              <TouchableOpacity
                style={tw`bg-blue-500 p-2 rounded mt-2`}
                onPress={() => handleMoreDetails(ride.id)}
              >
                <Text style={tw`text-white text-center`}>More Details</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={tw`text-center text-gray-500`}>No rides available at the moment</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AvailableRides;
