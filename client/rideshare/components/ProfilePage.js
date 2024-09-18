import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
//import { Picker } from "@react-native-picker/picker"; // Import Picker

const ProfilePage = ({ navigation }) => {
  const [userName, setUserName] = useState("Elan");
  const [email, setEmail] = useState("example@email.com");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("Gender"); // Default gender is set to 'Male'
  const [showGenderPicker, setShowGenderPicker] = useState(false); // State to toggle picker visibility

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`bg-white p-4 flex-row justify-between items-center mt-5`}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={tw`items-center`}>
          <Text style={tw`text-lg font-bold`}>Profile</Text>
        </View>
        <Ionicons name="notifications" size={24} color="black" />
      </View>

      {/* Profile Picture */}
      <View style={tw`items-center mt-5`}>
        <View style={tw`relative`}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={tw`w-24 h-24 rounded-full border-4 border-white`}
          />
          <View style={tw`absolute bottom-0 right-0`}>
            <Ionicons name="checkmark-circle" size={24} color="green" />
          </View>
        </View>
        <Text style={tw`text-2xl font-bold mt-2`}>{userName}</Text>
      </View>

      {/* Profile Info */}
      <View style={tw`p-5`}>
        {/* Email Input */}
        <TextInput
          style={tw`border border-gray-300 p-3 rounded mb-4`}
          value={email}
          onChangeText={setEmail}
          placeholder="example@email.com"
          keyboardType="email-address"
        />

        {/* Mobile Input with Country Flag */}
        <View
          style={tw`flex-row items-center border border-gray-300 p-3 rounded mb-4`}
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png",
            }}
            style={tw`w-6 h-4 mr-2`}
          />
          <Text style={tw`mr-2`}>+91</Text>
          <TextInput
            style={tw`flex-1`}
            value={mobile}
            onChangeText={setMobile}
            placeholder="Your mobile number"
            keyboardType="phone-pad"
          />
        </View>

        {/* Gender Dropdown */}
        <View
          style={tw`border border-gray-300 p-3 rounded flex-row justify-between items-center mb-4`}
        >
          <Text>{gender}</Text>
          <Ionicons
            name="chevron-down"
            size={24}
            color="black"
            onPress={() => setShowGenderPicker(!showGenderPicker)}
          />
        </View>

        {showGenderPicker && (
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => {
              setGender(itemValue);
              setShowGenderPicker(false); // Close picker after selection
            }}
            style={tw`border border-gray-300 rounded mb-4`}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        )}

        {/* Buttons */}
        <View style={tw`flex justify-center items-center`}>
          <TouchableOpacity
            style={[tw`bg-blue-500 p-4 rounded mb-3`, { width: "50%" }]}
          >
            <Text style={tw`text-white text-center`}>History</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`flex justify-center items-center`}>
          <TouchableOpacity
            style={[tw`bg-red-700 p-4 rounded mb-3`, { width: "50%" }]}
          >
            <Text style={tw`text-white text-center`}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View
        style={tw`flex-row justify-between items-center bg-gray-200 p-4 absolute bottom-0 w-full`}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <FontAwesome5 name="home" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePage;
