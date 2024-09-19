import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RideShareApp = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false); // Track if search is applied
  const navigation = useNavigation();

  // Fetch all rides when the app loads
  useEffect(() => {
    const fetchAllRides = async () => {
      try {
        const response = await axios.get('http://192.168.62.164:3000/api/rides'); // Use your machine's local IP address
        setRides(response.data);
        setFilteredRides(response.data); // Initially show all rides
      } catch (error) {
        Alert.alert('Error', `Failed to fetch rides. Error: ${error.message}`);
      }
    };

    fetchAllRides(); // Fetch rides when component mounts
  }, []);

  const handleSearch = async () => {
    if (!pickupLocation || !destination) {
      Alert.alert('Error', 'Please enter both pickup location and destination to search for rides.');
      return;
    }

    try {
      const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      const formattedTime = time.toTimeString().split(' ')[0]; // Format time as HH:MM:SS

      // Fetch all rides again and then filter locally
      const response = await axios.get('http://192.168.62.164:3000/api/rides', {
        params: {
          date: formattedDate,
          time: formattedTime,
        },
      });

      // Debugging: log API response
      console.log('API Response:', response.data);

      const filtered = response.data.filter((ride) =>
        ride.origin.trim().toLowerCase().includes(pickupLocation.trim().toLowerCase()) &&
        ride.destination.trim().toLowerCase().includes(destination.trim().toLowerCase())
      );

      // Debugging: log filtered results
      console.log('Filtered Rides:', filtered);

      setFilteredRides(filtered); // Update filtered rides based on search results
      setIsFiltered(true); // Mark that search has been applied

      if (filtered.length === 0) {
        Alert.alert('No Results', 'No rides match your search criteria.');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to fetch rides. Error: ${error.message}`);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const handleSelectOnMap = () => {
    navigation.navigate('MapScreen', {
      setLocation: (pickup, dest) => {
        setPickupLocation(pickup);
        setDestination(dest);
      },
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <View style={tw`bg-blue-600 p-4 flex-row justify-between items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold`}>Buddy</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>

      <View style={tw`bg-white p-5 m-4 rounded-lg shadow-lg`}>
        <TextInput
          style={tw`border border-gray-300 p-3 rounded mt-2`}
          placeholder="Your current location"
          value={pickupLocation}
          onChangeText={setPickupLocation}
        />
        <TextInput
          style={tw`border border-gray-300 p-3 rounded mt-2`}
          placeholder="Destination"
          value={destination}
          onChangeText={setDestination}
        />
        <View style={tw`flex-row justify-between mt-2`}>
          <TouchableOpacity
            style={tw`flex-row items-center border border-gray-300 p-3 rounded`}
            onPress={handleSelectOnMap}
          >
            <FontAwesome name="map-marker" size={24} color="black" />
            <Text style={tw`ml-2`}>Select on Map</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row items-center border border-gray-300 p-3 rounded`}
            onPress={() => setShowDatePicker(true)}
          >
            <FontAwesome name="calendar" size={24} color="black" />
            <Text style={tw`ml-2`}>Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row items-center border border-gray-300 p-3 rounded`}
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

        <TouchableOpacity style={tw`bg-blue-500 p-4 rounded mt-4`} onPress={handleSearch}>
          <Text style={tw`text-white text-center text-lg`}>Search</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={tw`p-5`}>
        {/* Show filtered rides if search has been applied */}
        {isFiltered ? (
          <>
            <Text style={tw`text-lg font-bold mb-2`}>Filtered Rides</Text>
            {filteredRides.length > 0 ? (
              filteredRides.map((ride) => (
                <View
                  key={ride.id}
                  style={tw`bg-white p-4 mb-3 rounded-lg shadow-md`}
                >
                  <Text style={tw`text-base`}>Driver Name: {ride.driver_name}</Text>
                  <Text style={tw`text-base`}>Vehicle Info: {ride.vehicle_info}</Text>
                  <Text style={tw`text-base`}>Origin: {ride.origin}</Text>
                  <Text style={tw`text-base`}>Destination: {ride.destination}</Text>
                  <Text style={tw`text-base`}>Available Seats: {ride.available_seats}</Text>
                </View>
              ))
            ) : (
              <Text style={tw`text-center text-gray-500`}>No rides found for your search</Text>
            )}
          </>
        ) : (
          <>
            <Text style={tw`text-lg font-bold mb-2`}>Available Rides</Text>
            {rides.length > 0 ? (
              rides.map((ride) => (
                <View
                  key={ride.id}
                  style={tw`bg-white p-4 mb-3 rounded-lg shadow-md`}
                >
                  <Text style={tw`text-base`}>Driver Name: {ride.driver_name}</Text>
                  <Text style={tw`text-base`}>Vehicle Info: {ride.vehicle_info}</Text>
                  <Text style={tw`text-base`}>Origin: {ride.origin}</Text>
                  <Text style={tw`text-base`}>Destination: {ride.destination}</Text>
                  <Text style={tw`text-base`}>Available Seats: {ride.available_seats}</Text>
                </View>
              ))
            ) : (
              <Text style={tw`text-center text-gray-500`}>No rides available</Text>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RideShareApp;
