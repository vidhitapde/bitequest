import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { FB_AUTH } from "../firebaseConfig";
import { User, UserRepo } from "../functions/src/types/User";
import "../global.css";
import { useUser } from "./appprovider";

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUser } = useUser();
  const auth = FB_AUTH;

  const signUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const uid = response.user.uid;
      const user = new User(uid, email, name);
      await UserRepo.save(user);
      setUser(user);
      updateProfile(response.user, { displayName: name });
      console.log("User created successfully: ", response.user);
      router.push("/(tabs)/map");
      alert("Account created successfully! Welcome, " + name + "!");
    } catch (error) {
      console.error("Error signing up: ", error);
      alert("Failed to sign in. Please check your credentials and try again.");
    }
  };

  return (
    <View className="flex-1 bg-[#E9EDC9] content-center">
      <View className="mt-40">
        <Text className="text-center text-5xl font-baloo2 p-6 text-[#723D46]">
          Sign Up
        </Text>
        <Text className="text-center mb-6 mx-6">
          Create an account to explore BiteQuest.
        </Text>
        <View className="flex justify-center mx-auto w-5/6 m-6 gap-4">
          <Input
            keyboardType="default"
            textContentType="name"
            autoComplete="name"
            placeholder="Name"
            className="p-4 rounded-full bg-white"
            value={name}
            autoCapitalize="none"
            onChangeText={(text) => setName(text)}
          />
          <Input
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            placeholder="Email"
            className="p-4 rounded-full bg-white"
            value={email}
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <View className="relative">
            <Input
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
              keyboardType="default"
              returnKeyType="done"
              textContentType="password"
              className="p-4 rounded-full bg-white"
              value={password}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
            <View className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                testID="togglePasswordVisibility"
                onPress={() => setShowPassword(!showPassword)}
              >
                
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="gray"
                  />
               
              </Button>
            </View>
          </View>
          <View className="relative">
            <Input
              secureTextEntry={!showPassword}
              placeholder="Confirm password"
              keyboardType="default"
              returnKeyType="done"
              textContentType="password"
              className="p-4 rounded-full bg-white"
              value={confirmPassword}
              autoCapitalize="none"
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <View className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Button
                variant="ghost"
                testID="togglePasswordVisibility2"
                size="icon"
                onPress={() => setShowPassword(!showPassword)}
              >
               
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="gray"
                  />
               
              </Button>
            </View>
          </View>
          <Text className="text-left mb-6 mx-6">
            Password must be at least 6 characters long.
          </Text>
        </View>
        <Button onPress={signUp}>
          <Text className="bg-[#723D46] m-6 text-xl text-[#FEFAE0] p-2 px-10 rounded-full">
            Create Account
          </Text>
        </Button>
        <View className="flex-row justify-center">
          <Text>Already have an account? Log in </Text>
          <Pressable onPress={() => router.push("/login")}>
            <Text className="text-blue-600 font-bold">here</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
