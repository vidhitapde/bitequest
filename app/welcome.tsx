import "../global.css";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";

export default function LogIn() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#E9EDC9] content-center">
      <Text className="text-4xl font-baloo2 text-center p-4 border-2">
        Welcome!
      </Text>
      <Button onPress={() => router.push("/signup")}>
        <Text className="bg-[#723D46] m-6 text-xl text-[#FEFAE0] p-2 px-10 rounded-full">
          Sign Up
        </Text>
      </Button>
      <Button onPress={() => router.push("/login")}>
        <Text className="bg-[#723D46] m-6 text-xl text-[#FEFAE0] p-2 px-10 rounded-full">
          Login
        </Text>
      </Button>
    </View>
  );
}
