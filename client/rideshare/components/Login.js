import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import tw from "twrnc";
import LottieView from "lottie-react-native"; // Import Lottie

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Track success or error
  const scaleAnim = useRef(new Animated.Value(0)).current; // Initialize animation value

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Animation function
  const startScaleAnimation = () => {
    Animated.timing(scaleAnim, {
      toValue: 1, // Scale to 1x
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await fetch("http://192.168.29.122:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setIsSuccess(true);
          setModalMessage("Login Successful!");
          setIsModalVisible(true);
          startScaleAnimation(); // Start success animation
          setTimeout(() => {
            setIsModalVisible(false);
            navigation.navigate("LocationScreen"); // Navigate after delay
          }, 1500);
        } else {
          setIsSuccess(false);
          setModalMessage(data.error || "Login failed");
          setIsModalVisible(true);
          startScaleAnimation(); // Start error animation
          setTimeout(() => setIsModalVisible(false), 1500);
        }
      } catch (error) {
        console.error("Login error:", error);
        setIsSuccess(false);
        setModalMessage("An error occurred during login.");
        setIsModalVisible(true);
        startScaleAnimation();
        setTimeout(() => setIsModalVisible(false), 1500);
      }
    } else {
      setIsSuccess(false);
      setModalMessage("Please enter your credentials.");
      setIsModalVisible(true);
      startScaleAnimation();
      setTimeout(() => setIsModalVisible(false), 1500);
    }
  };

  return (
    <View style={tw`flex-1`}>
      {/* Blue Background Section */}
      <View
        style={[
          tw`flex-1 bg-blue-600 justify-center px-4`,
          {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 190,
            borderTopLeftRadius: 190,
          },
        ]}
      >
        {/* Logo and Welcome Text */}
        <View
          style={tw`absolute top-20 left-5 right-5 flex-row justify-between items-center`}
        >
          <View>
            <Text style={tw`text-white text-xs font-bold `}>
              Login to Continue..
            </Text>
            <Text style={tw`text-white text-2xl font-bold mb-40`}>
              WELCOME!
            </Text>
          </View>
          <Image
            source={{
              uri: "https://download.logo.wine/logo/Hexaware_Technologies/Hexaware_Technologies-Logo.wine.png",
            }}
            style={tw`w-30 h-25 mb-45`}
          />
        </View>

        {/* Email Input */}
        <View
          style={tw`flex-row items-center bg-white rounded-lg px-4 py-3 mb-4 mt-20`}
        >
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
        <View style={tw`flex-row items-center bg-white rounded-lg px-4 py-3 `}>
          <MaterialIcons name="lock" size={20} color="black" style={tw`mr-3`} />
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
            <Text style={tw`text-white`}>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text style={tw`text-white underline`}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* White Background Section */}
      <View style={tw`bg-white pt-5 items-center h-1/6`}>
        <TouchableOpacity
          style={tw`bg-blue-600 rounded-lg py-4 mb-5 w-1/2 items-center`}
          onPress={handleLogin}
        >
          <Text style={tw`text-white text-lg font-bold`}>LOGIN</Text>
        </TouchableOpacity>
      </View>

      {/* Success/Error Modal with Lottie Animation */}
      <Modal
        isVisible={isModalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <Animated.View
          style={[
            tw`p-10 bg-white rounded-lg justify-center items-center`,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {isSuccess ? (
            <LottieView
              source={require("./assets/success.json")} // Lottie animation for success
              autoPlay
              loop={false}
              style={{ width: 150, height: 150 }}
            />
          ) : (
            <LottieView
              source={require("./assets/error.json")} // Lottie animation for error
              autoPlay
              loop={false}
              style={{ width: 150, height: 150 }}
            />
          )}
          <Text
            style={tw`text-lg font-bold mt-3 ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {isSuccess ? "Success" : "Error"}
          </Text>
          <Text style={tw`text-base`}>{modalMessage}</Text>
        </Animated.View>
      </Modal>
    </View>
  );
};

export default Login;
