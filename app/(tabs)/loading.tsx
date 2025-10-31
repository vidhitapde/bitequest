import "../../global.css"
import {Text, View } from "react-native";
 
export default function Loading() {
  return (
    <View className = "flex-1 bg-[#E9EDC9]">
    <View className="flex-1 items-center justify-center">
      <Text className="text-[43px] text-[#723D46]">
        BiteQuest
      </Text>
    </View>
    </View>
  );
}