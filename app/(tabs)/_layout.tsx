import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useFonts } from "expo-font";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -25 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [fonts] = useFonts({
    Baloo2: require("../../assets/fonts/Baloo2-SemiBold.ttf"),
    Baloo: require("../../assets/fonts/Baloo-Regular.ttf"),
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: { backgroundColor: "#723D46" },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="shop"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="shop"
              size={30}
              style={{ marginBottom: -24 }}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="map"
              size={30}
              style={{ marginBottom: -23 }}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="closet"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="hanger"
              size={33}
              style={{ marginBottom: -21 }}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Feather
              name="user"
              size={30}
              style={{ marginBottom: -24 }}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
