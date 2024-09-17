import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper"; // New import

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // State for checkbox

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className="flex-1 bg-blue-700 justify-center px-5">
      {/* Logo and other components */}
      <View className="absolute top-5 left-5">
        <Text className="text-white text-3xl font-bold mb-2">Welcome!</Text>
      </View>

      {/* Email input */}
      <View className="flex-row items-center bg-white rounded-lg px-3 py-2 mb-4">
        <FontAwesome
          name="envelope"
          size={20}
          color="black"
          style={{ marginRight: 10 }}
        />
        <TextInput
          className="flex-1 text-base text-gray-800"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password input */}
      <View className="flex-row items-center bg-white rounded-lg px-3 py-2 mb-4">
        <MaterialIcons
          name="lock"
          size={20}
          color="black"
          style={{ marginRight: 10 }}
        />
        <TextInput
          className="flex-1 text-base text-gray-800"
          placeholder="Enter your password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{ marginLeft: 10 }}
        >
          <MaterialIcons
            name={isPasswordVisible ? "visibility" : "visibility-off"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Remember me and forgot password */}
      <View className="flex-row justify-between items-center mb-5">
        <View className="flex-row items-center">
          <Checkbox
            status={rememberMe ? "checked" : "unchecked"}
            onPress={() => setRememberMe(!rememberMe)}
          />
          <Text className="text-white ml-2">Remember me</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-white underline">Forgot password</Text>
        </TouchableOpacity>
      </View>

      {/* Login button */}
      <TouchableOpacity className="bg-blue-800 rounded-lg py-4 items-center">
        <Text className="text-white text-lg font-bold">LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
