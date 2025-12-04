import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  DeviceEventEmitter,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { G, Path } from "react-native-svg";
import { FB_AUTH, FB_DB, GOOGLE } from "../../firebaseConfig";
import "../../global.css";
import { useUser } from "../appprovider";
const { californiaCounties } = require("../geojson2svg");

export default function MapScreen() {
  const router = useRouter();
  const auth = FB_AUTH;
  const [reviews, setReviews] = useState<any[]>([]);
  const { user } = useUser();
  const reviewsCollection = collection(FB_DB, "reviews");
  const [visitedCounties, setVisitedCounties] = useState(new Set());
  const [loading, setLoading] = useState(false);
  auth.onAuthStateChanged((user) => {
    if(!user) router.replace('/');
  })

  useEffect(() => {
    fetchReviews(user);
  }, []);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener("reviewsUpdated", () =>{
      fetchReviews(user);
    });

    return () => subscription.remove();
  }, [user]);

  const onRefresh = async () => {
    setLoading(true);
    await fetchReviews(user);
    setLoading(false);
  };

  const fetchReviews = async (currentUser: any) => {
    if (currentUser) {
      try {
        const q = query(
          reviewsCollection,
          where("userId", "==", currentUser.uid),
        );
        const data = await getDocs(q);
        const userReviews = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setReviews(userReviews);

        const counties = new Set();
        for (const review of userReviews) {
          if ((review as any).restaurantFullAddress) {
            const county = await getCountyFromAddress(
              (review as any).restaurantFullAddress,
            );
            console.log(
              "County found for restaurant:",
              (review as any).restaurantFullAddress,
              "-> County:",
              county,
            );
            if (county) {
              counties.add(county);
            }
          }
        }

        console.log("All counties found:", Array.from(counties));
        console.log(
          "Available counties in map:",
          Object.keys(californiaCounties),
        );
        setVisitedCounties(counties);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    } else {
      console.log("No user information found, not logged in");
      setReviews([]);
      setVisitedCounties(new Set());
    }
  };

  const getCountyFromAddress = async (restaurantAddress: string) => {
    try {
      let parsedAddress = restaurantAddress;

      const commaParts = restaurantAddress.split(",");
      if (commaParts.length > 1) {
        parsedAddress = commaParts.slice(1).join(",").trim();
        console.log("address from:", restaurantAddress, "to:", parsedAddress);
      }

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(parsedAddress)}&key=${GOOGLE}`,
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        let selectedResult = null;

        for (const result of data.results) {
          const stateComponent = result.address_components.find(
            (component: any) =>
              component.types.includes("administrative_area_level_1"),
          );

          if (
            stateComponent &&
            (stateComponent.short_name === "CA" ||
              stateComponent.long_name === "California")
          ) {
            selectedResult = result;
            console.log("Found California result:", result.formatted_address);
            break;
          }
        }

        // If no California result found, use the first result
        if (!selectedResult) {
          selectedResult = data.results[0];
          console.log(
            "No California result found, using:",
            selectedResult.formatted_address,
          );
        }

        const addressComponents = selectedResult.address_components;
        const countyComponent = addressComponents.find((component: any) =>
          component.types.includes("administrative_area_level_2"),
        );
        if (countyComponent) {
          const countyName = countyComponent.long_name.replace(" County", "");
          console.log(
            "Found county:",
            countyName,
            "for address:",
            parsedAddress,
          );
          return countyName;
        }
      } else {
        console.log("No results found for:", parsedAddress);
      }
    } catch (error) {
      console.error("Error fetching county from address:", error);
    }
    return null;
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={{ flex: 1, backgroundColor: "#FEFAE0" }}
      resizeMode="cover"
    >
      <View className="flex-1" style={{ backgroundColor: "transparent" }}>
        <ScrollView className="flex-grow overflow-visible" refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 50,
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity onPress={() => auth.signOut()}>
              <Ionicons name="exit-outline" size={32} color="#723D46" strokeWidth={20} testID="sign-out" />
            </TouchableOpacity>

            <View
              style={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={require("../../assets/images/coins.png")} />
              {/* show user's coins from app context */}
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
                {(() => {
                  const coins = user?.balance ?? 0;
                  return String(coins);
                })()}
              </Text>
            </View>
          </View>
          <View className="flex justify-center items-center">
            <View>
              <Svg
                width={400}
                height={500}
                viewBox="0 0 800 600"
                preserveAspectRatio="xMidYMid meet"
              >
                <G>
                  {Object.entries(
                    californiaCounties as { [key: string]: string },
                  ).map(([countyName, pathData]) => {
                    const isVisited = visitedCounties.has(countyName);

                    return (
                      <Path
                        key={countyName}
                        d={pathData}
                        fill={isVisited ? "pink" : "#ECF8F8"}
                        stroke="#723D46"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      />
                    );
                  })}
                </G>
              </Svg>
            </View>
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
