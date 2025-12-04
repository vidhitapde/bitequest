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
import React from "react";

import "../../global.css";
export default function Profile() {
  const {
    rating,
    setRating,
    reviewText,
    setReviewText,
    reviews,
    deleteReview,
    photoUri,
    pickImage,
    city,

  } = useReview();
  const [showAll, setShowAll] = useState(false);
  const displayReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <ScrollView className="flex-grow bg-[#EEF9F9] "
      contentContainerStyle={{ paddingBottom: 10 }}>
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
      <View className="px-10 mt-8 justify-center space-y-3 pb-10">
        <Text className="text-4xl justify-left text-[#723D46] font-balooregular leading-tight">
          Reviews
        </Text>
        <Text>

        </Text>
        {reviews.length === 0 && (

          <Text className="text-lg justify-left text-black font-balooregular leading-tight">
            You have not rated any restaurants yet!
          </Text>
        )}

        {displayReviews.map((review) => (
          <View
            key={review.id}
            style={{
              width: "100%",
              minHeight: 350,
              alignSelf: "center",
              backgroundColor: "#FEFAE0",
              borderRadius: 20,
              borderWidth: 3,
              borderColor: "#723D46",
              padding: 20,
              marginVertical: 16,
              position: "relative"
            }}
          >

            <TouchableOpacity onPress={() => deleteReview(review.id)}
              style={{ position: "absolute", top: 10, right: 10 }}>
              <AntDesign
                name="delete"
                testID={`delete-review-${review.id}`}
                size={24}
                color="red"
              />
            </TouchableOpacity>


            <Text className="text-2xl font-balooregular text-black">

              {review.restaurantName}
            </Text>
            <Text className="text-xl mt-1 font-balooregular text-black">
              {review.city}
            </Text>

            <View className="flex-row mb-3 ">
              {[1, 2, 3, 4, 5].map((star) => (
                <AntDesign
                  key={star}
                  name="star"
                  size={23}
                  color={review.rating >= star ? "#FFCB2E" : "gray"}
                  marginLeft={star === 1 ? 0 : 4}

                />
              ))}
              {review.images && review.images.length > 0 && (
                <View
                  style={{ flexDirection: "row", justifyContent: "center", marginTop: 40, marginLeft: -85 }}
                >
                  {review.images.map((imgUrl, index) => (
                    <Image
                      key={index}
                      source={{ uri: imgUrl }}
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: 10,
                      }}
                    />
                  ))}
                </View>
              )}
              <View className="items-center justify-center"
                style={{ position: "absolute", bottom: -40 }}>
                <Text className="text-md text-black text-center mt-2 mb-3" numberOfLines={4} style={{marginTop:30}}>
                  {review.reviewText}
                </Text>
              </View>
            </View>
          </View>

        ))}

        {!showAll && (<TouchableOpacity onPress={() => setShowAll(true)}>
          <View className="flex-row justify-end mt-2">
            <Text className="text-lg text-[#723D46] font-balooregular">
              view all →
            </Text>
          </View>

        </TouchableOpacity>
        )}

        {showAll && (<TouchableOpacity onPress={() => setShowAll(false)}>
          <View className="flex-row justify-start mt-2">
            <Text className="text-lg text-[#723D46] font-balooregular">
              view less ←
            </Text>
          </View>

        </TouchableOpacity>
        )}

      </View>
    </ScrollView>
  );
}