import "../../global.css";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";
import { useRouter } from "expo-router";

export default function MapScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={{ flex: 1, backgroundColor: "#FEFAE0" }}
      resizeMode="cover"
    >
      <View className="flex-1" style={{ backgroundColor: "transparent" }}>
        <ScrollView className="flex-grow overflow-visible">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 50,
              marginHorizontal: 20,
            }}
          >
            <Ionicons name="settings-sharp" size={32} color="#723D46" />
            <View
              style={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={require("../../assets/images/coins.png")} />
              {/*replace w text from backend*/}
              <Text
                style={{
                  position: "absolute",
                  color: "#723D46",
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "center",
                  paddingLeft: 15,
                }}
              >
                50
              </Text>
            </View>
          </View>
          <View className="flex justify-center items-center">
            <MapView
              style={{ width: "85%", height: 500, marginTop: 80 }}
              region={{
                latitude: 36.7783,
                longitude: -119.4179,
                latitudeDelta: 5,
                longitudeDelta: 5,
              }}
            />
          </View>
        </ScrollView>

        <View
          style={{
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#ECF8F8",
              paddingHorizontal: 45,
              paddingVertical: 15,
              borderRadius: 8,
              borderColor: "#723D46",
              borderWidth: 3,
            }}
            onPress={() => router.push("/review")}
          >
            <Text
              style={{
                color: "#723D46",
                fontSize: 30,
                fontWeight: "800",
                fontFamily: "bold",
              }}
            >
              POST
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}