import { useRouter } from 'expo-router';
import React from "react";
import { Button, Text, View } from "react-native";
import "/Users/nicholegodfrey/cs180/bitequest/global.css";
 
export default function Loading() {
  const router = useRouter();
  return (
    <View className = "flex-1 bg-[#E9EDC9]">
    <View className="flex-1 items-center justify-center">
      <Text className="text-[43px] text-[#723D46] font-balooregular">
        BiteQuest
      </Text>
      <Button title="Go to Profile" onPress={() => router.push("/profile")} />
    </View>
    </View>
  );
}