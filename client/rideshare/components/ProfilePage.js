import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

const ProfilePage = ({ navigation }) => {
  const [userName, setUserName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`bg-blue-600 p-4 flex-row justify-between items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold`}>Profile</Text>
        <Ionicons name="person-circle" size={40} color="white" />
      </View>

      {/* Profile Picture */}
      <View style={tw`items-center mt-5`}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={tw`w-24 h-24 rounded-full`}
        />
      </View>

      {/* Profile Info */}
      <View style={tw`p-5`}>
        <Text style={tw`text-lg font-bold mb-3`}>User Information</Text>

        <TextInput
          style={tw`border border-gray-300 p-3 rounded mb-4`}
          value={userName}
          onChangeText={setUserName}
          placeholder="Name"
        />

        <TextInput
          style={tw`border border-gray-300 p-3 rounded mb-4`}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />

        <TouchableOpacity style={tw`bg-blue-500 p-4 rounded`}>
          <Text style={tw`text-white text-center`}>Update Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <View style={tw`mt-10 p-5`}>
        <TouchableOpacity
          style={tw`bg-red-500 p-4 rounded`}
          onPress={() => alert('Logged out')}
        >
          <Text style={tw`text-white text-center`}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePage;
