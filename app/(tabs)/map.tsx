import { GOOGLE, FB_AUTH, FB_DB } from "@/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { G, Path } from "react-native-svg";
import "../../global.css";
const { californiaCounties } = require("../geojson2svg");

export default function MapScreen() {
  const router = useRouter();
  const auth = FB_AUTH;
  const [reviews, setReviews] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const reviewsCollection = collection(FB_DB, "reviews");
  const [visitedCounties, setVisitedCounties] = useState(new Set());

  useEffect(() => {
    const loggedIn = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.replace("/");
      } else {
        setUser(currentUser);
        fetchReviews(currentUser);
      }
    });

    return () => loggedIn();
  }, []);

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
        console.log("User reviews fetched:", userReviews);
        setReviews(userReviews);

        const counties = new Set();
        for (const review of userReviews) {
          if ((review as any).restaurantName) {
            const county = await getCountyFromAddress(
              (review as any).restaurantName,
            );
            console.log(
              "County found for restaurant:",
              (review as any).restaurantName,
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
  const getCountyFromAddress = async (restaurantName: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(restaurantName + " California")}&key=${GOOGLE}`,
      );
      const data = await response.json();

      console.log("Geocoding API response for", restaurantName, ":", data);

      if (data.results && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const countyComponent = addressComponents.find((component: any) =>
          component.types.includes("administrative_area_level_2"),
        );
        if (countyComponent) {
          const countyName = countyComponent.long_name.replace(" County", "");
          console.log(
            "Found county:",
            countyName,
            "for restaurant:",
            restaurantName,
          );
          return countyName;
        }
      } else {
        console.log("No results found for:", restaurantName);
      }
    } catch (error) {
      console.error("Error fetching county from restaurant name:", error);
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
            <TouchableOpacity onPress={() => auth.signOut()}>
              <Ionicons name="settings-sharp" size={32} color="#723D46" />
            </TouchableOpacity>

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
