import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Platform, Pressable, View } from "react-native";
import { FB_AUTH } from "../firebaseConfig";
import { UserRepo } from "../functions/src/types/User";
import "../global.css";
import { useUser } from "./appprovider";

export default function LogIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const auth = FB_AUTH;

  const [state, setState] = React.useState({
    rememberMe: false,
  });

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (!response.user) console.log("FAILED SIGN IN");
      console.log(response.user);
      const user = await UserRepo.load(response.user.uid);
      if (!user) console.error("USER DOES NOT EXIST");
      if (!user) {
        const uid = response.user.uid;
        const name = response.user.displayName ?? "";
        const newUser = new User(uid, email, name);
        await UserRepo.save(newUser);
        setUser(newUser);
      } else {
        setUser(user);
      }
      console.log("User signed in successfully: ", response.user);
      router.push("/(tabs)/map");
      alert("Welcome back, " + response.user.displayName + "!");
    } catch (error) {
      console.error("Error signing in: ", error);
      alert("Failed to sign in. Please check your credentials and try again.");
    }
  };

  function toggleCheckedState(key: keyof typeof state) {
    return () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setState((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };
  }

  return (
    <View className="flex-1 bg-[#E9EDC9] content-center">
      <View className="mt-40">
        <Text className="text-center text-5xl font-baloo2 p-6 text-[#723D46]">
          Log In
        </Text>
        <Text className="text-center mb-6 mx-6">
          Enter your email and password to access BiteQuest.
        </Text>
        <View className="flex justify-center mx-auto w-5/6 m-6 gap-4">
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
                onPress={() => setShowPassword(!showPassword)}
              >
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={24}
                    color="gray"
                  />
               
              </Button>
            </View>
          </View>
          <View className="flex-row justify-between">
            <View className="flex flex-row items-center gap-3">
              <Checkbox
                id="terms"
                checked={state.rememberMe}
                onCheckedChange={toggleCheckedState("rememberMe")}
              />
              <Label
                onPress={Platform.select({
                  native: toggleCheckedState("rememberMe"),
                })}
                htmlFor="terms"
              >
                Remember me
              </Label>
            </View>
            <Pressable onPress={() => router.push("/forgotpassword")}>
              <Text className="">Forgot password?</Text>
            </Pressable>
          </View>
        </View>
        <Button onPress={signIn}>
          <Text className="bg-[#723D46] m-6 text-xl text-[#FEFAE0] p-2 px-10 rounded-full">
            Login
          </Text>
        </Button>
        <View className="flex-row justify-center">
          <Text>Don't have an account? Sign up </Text>
          <Pressable onPress={() => router.push("/signup")}>
            <Text className="text-blue-600 font-bold">here</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
