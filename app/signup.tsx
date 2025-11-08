import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Pressable, View } from "react-native";

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);
  // const auth = FB_AUTH;

  // const signUp = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await createUserWithEmailAndPassword(auth, email, password);
  //     console.log(response);
  //     alert('Check your emails!');
  //   } catch (error: any) {
  //     console.log(error);
  //     alert('Registration failed: ' + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

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
          />
          <Input
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            placeholder="Email"
            className="p-4 rounded-full bg-white"
            // value={email}
            // autoCapitalize="none"
            // onChangeText={(text) => setEmail(text)}
          />
          <View className="relative">
            <Input
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
              keyboardType="default"
              returnKeyType="done"
              textContentType="password"
              className="p-4 rounded-full bg-white"
              // value={password}
              // autoCapitalize="none"
              // onChangeText={(text) => setPassword(text)}
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
        <Button onPressIn={() => router.push("/(tabs)/map")}>
          {/* onPress={async () => {
            await signUp();
            router.push("/(tabs)/map");
          }}
        > */}
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
