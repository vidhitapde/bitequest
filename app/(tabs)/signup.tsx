import "../../global.css"
import {View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Input } from "@/components/ui/input"
import React from "react";


export default function SignUp() {
    const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View className = "flex-1 bg-[#E9EDC9] content-center">
        <View className="mt-40">
            <Text className="text-center text-5xl font-baloo2 p-6 text-[#723D46]">Sign Up</Text>
            <Text className="text-center mb-6 mx-6">Create an account to explore BiteQuest.</Text>
            <View className="flex justify-center mx-auto w-5/6 m-6 gap-4">
                <Input
                    keyboardType="default"
                    textContentType="name"
                    autoComplete="name"
                    placeholder="Name"
                    className="p-4 rounded-full bg-white"
                />
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
                <View className="relative">
                    <Input
                        secureTextEntry={!showPassword}
                        placeholder="Confirm password"
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
            </View>
            <Button>
                <Text className ="bg-[#723D46] m-6 text-xl text-[#FEFAE0] p-2 px-10 rounded-full">Create Account</Text>
            </Button>
            <Text className="text-center">Already have an account? Log in here</Text>
        </View>
    </View>
  );
}