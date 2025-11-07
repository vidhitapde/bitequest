import "../global.css";
import { Platform, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import React from "react";

export default function LogIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const [state, setState] = React.useState({
    rememberMe: false,
  });

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
          />
          <View className="relative">
            <Input
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
              keyboardType="default"
              returnKeyType="done"
              textContentType="password"
              className="p-4 rounded-full bg-white"
            />
            <View className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text className="text-muted-foreground">
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="gray"
                  />
                </Text>
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
        <Button onPress={() => router.push("/(tabs)/map")}>
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
