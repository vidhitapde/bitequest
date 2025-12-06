import "../global.css";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { useRouter } from "expo-router";
import { FB_AUTH } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const auth = FB_AUTH;
  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
      router.push("/(tabs)/map");
    } catch (error) {
      console.error("Error sending password reset email: ", error);
    }
  };
  return (
    <View className="flex-1 bg-[#E9EDC9] content-center">
      <View className="mt-40">
        <Text className="text-center text-5xl font-baloo2 p-6 text-[#723D46]">
          Forgot Password?
        </Text>
        <Text className="text-center mx-6 mb-6">
          Enter your email below to receive a reset password link to recover
          your account.
        </Text>
        <View className="flex justify-center mx-auto w-5/6 m-6 gap-4">
          <Input
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            placeholder="Email"
            className="p-4 rounded-full bg-white"
            value={email}
            onChangeText={setEmail}
          />
          <Button onPress={resetPassword}>
            {" "}
            Reset Password
            <Text className="bg-[#723D46] m-6 mt-20 text-xl text-[#FEFAE0] p-2 px-10 rounded-full">
              Continue
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
