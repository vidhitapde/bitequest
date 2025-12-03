import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useReview from "../../functions/src/types/useReview";

import "../../global.css";
export default function Profile() {
  const {
    rating,
    setRating,
    reviewText,
    setReviewText,
    reviews,
    addReview,
    fetchReview,
    selectedRestaurant,
    searchText,
    showResults,
    searchResults,
    setSearchText,
    searchRestaurants,
    selectRestaurant,
    deleteReview,
  } = useReview();
  const [showAll, setShowAll] = useState(false);
  const displayReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <ScrollView className="flex-grow bg-[#EEF9F9] overflow-visible">
      <View className="mt-20 relative" style={{ alignSelf: "center" }}>
        <Image source={require("../../assets/images/profile-pic.png")} />
        <TouchableOpacity
          onPress={() => console.log("Edit button pressed")}
          className="absolute top-48 left-44"
        >
          <Image
            source={require("../../assets/images/editButton.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Text className="text-lg mt-4 text-center text-[#723D46] font-balooregular">
        Location:
      </Text>
      <View className="px-12 mt-8 justify-center space-y-3 pb-10">
        <Text className="text-4xl justify-left text-[#723D46] font-balooregular leading-tight">
          Reviews
        </Text>

        {displayReviews.map((review) => (
          <ImageBackground
            key={review.id}
            source={require("../../assets/images/reviews.png")}
            style={{
              width: 370,
              height: 200,
              aspectRatio: 16 / 9,
              paddingHorizontal: 20,
              marginVertical: -40,
              alignSelf: "center",
              justifyContent: "center",
            }}
            resizeMode="contain"
          >
            <View>
              <View className="flex-row">
                {/* <MaterialIcons
                  name="location-pin"
                  size={26}
                  color="red"
                /> */}
                <Text className="text-2xl font-balooregular text-black">
                  {review.restaurantName}
                </Text>

                <View className="flex-row ml-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <AntDesign
                      key={star}
                      name="star"
                      size={23}
                      color={review.rating >= star ? "#FFCB2E" : "gray"}
                      marginLeft={4}
                    />
                  ))}
                </View>
                <View className="flex-row ml-2 ">
                  <TouchableOpacity onPress={() => deleteReview(review.id)}>
                    <AntDesign name="close" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text className="text-md text-black mt-2" numberOfLines={4}>
                  {review.reviewText}
                </Text>
              </View>
            </View>
          </ImageBackground>
        ))}
        {!showAll && (
          <TouchableOpacity onPress={() => setShowAll(true)}>
            <View className="flex-row justify-end mt-2">
              <Text className="text-lg text-[#723D46] font-balooregular">
                view all →
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <View className="flex-grow">
          <Text className="text-4xl mt-10 justify-left text-[#723D46] font-balooregular leading-tight">
            Badges
          </Text>
        </View>

        <Image
          source={require("../../assets/images/badges.png")}
          style={{ alignSelf: "center" }}
        />
        <Image
          className="mt-4"
          source={require("../../assets/images/badges.png")}
          style={{ alignSelf: "center" }}
        />
        <Image
          className="mt-4"
          source={require("../../assets/images/badges.png")}
          style={{ alignSelf: "center" }}
        />
        <View className="flex-row justify-end mt-2">
          <Text className="text-lg text-[#723D46] font-balooregular">
            view all →
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
