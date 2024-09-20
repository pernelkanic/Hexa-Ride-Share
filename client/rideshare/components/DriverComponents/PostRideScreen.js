import { FontAwesome, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

const PostRideScreen = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [carNumber, setCarNumber] = useState(""); // Car Number state
  const [seatsAvailable, setSeatsAvailable] = useState(""); // Seats Available state
  const [carName, setCarName] = useState(""); // Car Name state
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/rides", {
          params: {
            pickupLocation,
            destination,
            date: date.toISOString(),
            time: time.toISOString(),
          },
        });
        setRides(response.data);
        setFilteredRides(response.data);
      } catch (error) {
        console.error(error);
        setRides([]);
        setFilteredRides([]);
      }
    };

    if (pickupLocation && destination) {
      fetchRides();
    }
  }, [pickupLocation, destination, date, time]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  const handleSearch = () => {
    if (!pickupLocation || !destination) {
      Alert.alert("Error", "Please enter both pickup location and destination");
      return;
    }
  };

  const handleSelectOnMap = () => {
    navigation.navigate("MapScreen", {
      setLocation: (pickup, dest) => {
        setPickupLocation(pickup);
        setDestination(dest);
      },
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`bg-blue-600 p-4 flex-row justify-between items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold`}>Buddy</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>

      {/* Form Container */}
      <View style={tw`bg-white p-5 m-4 rounded-lg shadow-lg flex-1`}>
        <View style={tw`bg-white p-4 rounded-lg shadow`}>
          <TextInput
            style={tw`border-b border-gray-300 p-3`}
            placeholder="Your Starting Point"
            value={pickupLocation}
            onChangeText={setPickupLocation}
          />
          <TextInput
            style={tw`border-b border-gray-300 p-3`}
            placeholder="Destination"
            value={destination}
            onChangeText={setDestination}
          />
        </View>

        <View style={tw`flex-row justify-around mt-3`}>
          <TouchableOpacity
            style={tw`flex-row items-center border border-gray-300 p-2 rounded`}
            onPress={handleSelectOnMap}
          >
            <FontAwesome name="map-marker" size={24} color="black" />
            <Text style={tw`ml-2`}>Select on Map</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row items-center border border-gray-300 p-2 rounded`}
            onPress={() => setShowDatePicker(true)}
          >
            <FontAwesome name="calendar" size={24} color="black" />
            <Text style={tw`ml-2`}>Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row items-center border border-gray-300 p-2 rounded`}
            onPress={() => setShowTimePicker(true)}
          >
            <FontAwesome name="clock-o" size={24} color="black" />
            <Text style={tw`ml-2`}>Time</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        {/* Car Number Input */}
        <TextInput
          style={tw`border border-gray-300 p-3 rounded mt-3`}
          placeholder="Car Number"
          value={carNumber}
          onChangeText={setCarNumber}
        />

        {/* Seats Available Input */}
        <TextInput
          style={tw`border border-gray-300 p-3 rounded mt-3`}
          placeholder="Seats Available"
          value={seatsAvailable}
          onChangeText={setSeatsAvailable}
          keyboardType="numeric"
        />

        {/* Car Name Input */}
        <TextInput
          style={tw`border border-gray-300 p-3 rounded mt-3`}
          placeholder="Car Name"
          value={carName}
          onChangeText={setCarName}
        />

        {/* Post Ride Button */}
        <TouchableOpacity
          style={tw`bg-blue-600 p-4 mt-4 rounded-lg flex-row justify-center items-center`}
          onPress={handleSearch}
        >
          <FontAwesome name="car" size={24} color="white" />
          <Text style={tw`ml-2 text-white text-lg`}>Post Ride</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View
        style={tw`absolute bottom-0 w-full bg-gray-200 flex-row justify-around p-5 border-t border-gray-300`}
      >
        <TouchableOpacity onPress={() => navigation.navigate("DriverHome")}>
          <Ionicons name="home" size={24} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person" size={24} color="black" />
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PostRideScreen;
