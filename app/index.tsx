import "../global.css";
import { useRouter } from 'expo-router';
import { Button, Text, View } from "react-native";
import React, {useEffect} from 'react';
import { useFonts } from 'expo-font';
 
export const screenOptions = {
  headerShown: false,
};

export default function Loading() {
  const router = useRouter();

  const [fonts] = useFonts({
    Baloo2: require('../assets/fonts/Baloo2-SemiBold.ttf'),
    Baloo: require('../assets/fonts/Baloo-Regular.ttf'),

  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 1500); 
    return () => clearTimeout(timer);
  },[router]);

  return (
  <View className = "flex-1 bg-[#E9EDC9]">
    <View className="flex-1 items-center justify-center">
      <Text className="text-[43px] text-[#723D46] font-balooregular">
        BiteQuest
      </Text>
    </View>
    </View>
  );
}
