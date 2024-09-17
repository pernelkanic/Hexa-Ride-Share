import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation
import tw from 'twrnc'; // Tailwind for React Native

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // State for checkbox
  const navigation = useNavigation(); // Navigation hook

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = () => {
    if (email && password) {
      navigation.navigate("LocationScreen"); // Navigate to LocationScreen on login
    } else {
      alert("Please enter your credentials");
    }
  };

  return (
    <View style={tw`flex-1 bg-blue-700 justify-center px-5`}>
      {/* Logo and Welcome message */}
      <View style={tw`absolute top-10 left-5`}>
        <Text style={tw`text-white text-4xl font-extrabold`}>Welcome!</Text>
        <Text style={tw`text-white text-lg font-semibold`}>
          Please login to continue
        </Text>
      </View>

      {/* Email Input */}
      <View style={tw`flex-row items-center bg-white rounded-lg px-4 py-3 mb-4 mt-20`}>
        <FontAwesome
          name="envelope"
          size={20}
          color="black"
          style={tw`mr-3`}
        />
        <TextInput
          style={tw`flex-1 text-base text-gray-800`}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Password Input */}
      <View style={tw`flex-row items-center bg-white rounded-lg px-4 py-3 mb-4`}>
        <MaterialIcons
          name="lock"
          size={20}
          color="black"
          style={tw`mr-3`}
        />
        <TextInput
          style={tw`flex-1 text-base text-gray-800`}
          placeholder="Enter your password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <MaterialIcons
            name={isPasswordVisible ? "visibility" : "visibility-off"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Remember Me & Forgot Password */}
      <View style={tw`flex-row justify-between items-center mb-5`}>
        <View style={tw`flex-row items-center`}>
          <Checkbox
            status={rememberMe ? "checked" : "unchecked"}
            onPress={() => setRememberMe(!rememberMe)}
            color="#fff"
            uncheckedColor="#fff"
          />
          <Text style={tw`text-white ml-2`}>Remember me</Text>
        </View>
        <TouchableOpacity>
          <Text style={tw`text-white underline`}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={tw`bg-black rounded-lg py-4 items-center mt-5`}
        onPress={handleLogin}
      >
        <Text style={tw`text-white text-lg font-bold`}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
