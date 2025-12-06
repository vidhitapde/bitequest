import AntDesign from "@expo/vector-icons/AntDesign";
import { useState, useEffect } from "react";
import { imageMap } from "@/data/closet";
import { useUser } from "../appprovider";
import { DeviceEventEmitter, RefreshControl } from "react-native";

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
  const { reviews, deleteReview } = useReview();

  const [showAll, setShowAll] = useState(false);
  const displayReviews = showAll ? reviews : reviews.slice(0, 3);
  const [loading, setLoading] = useState(false);
  const [hairImage, setHairImage] = useState(null);
  const [shirtImage, setShirtImage] = useState(null);
  const [pantsImage, setPantsImage] = useState(null);

  const { user } = useUser();

  const updateAvatarImages = async (currUser: any) => {
    const avatar = currUser.profile?.avatar;
    setHairImage(imageMap[avatar?.hair ?? "default-hair"]);
    setShirtImage(imageMap[avatar?.shirt ?? "default-shirt"]);
    setPantsImage(imageMap[avatar?.pants ?? "default-pants"]);
  };

  useEffect(() => {
    updateAvatarImages(user);
  }, [user]);

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener("avatarUpdated", () => {
      updateAvatarImages(user);
    });

    return () => sub.remove();
  }, [user]);

  const onRefresh = async () => {
    setLoading(true);

    updateAvatarImages(user);

    setLoading(false);
  };

  return (
    <ScrollView
      className="flex-grow bg-[#EEF9F9] "
      contentContainerStyle={{ paddingBottom: 10 }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          marginTop: 310,
          width: 200,
          height: 100,
          position: "relative",
          alignSelf: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: "-235%",
            left: "-11%",
            width: 240,
            height: 240,
            borderRadius: 200,
            backgroundColor: "#F6BD60",
            borderWidth: 3,
            borderColor: "#723D46",
            zIndex: -1,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: "-225%",
            left: "-6%",
            width: 220,
            height: 220,
            borderRadius: 200,
            backgroundColor: "#FEFAE0",
            borderWidth: 3,
            borderColor: "#723D46",
            zIndex: -1,
          }}
        />
        <Image
          source={hairImage}
          style={{
            width: "61%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 1,
            position: "absolute",
            top: "-220%",
            left: "19%",
          }}
        />
        <Image
          source={require("../../assets/avatar/body.png")}
          style={{
            marginTop: -160,
            width: "100%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 1.4,
            position: "absolute",
          }}
        />
        <Image
          source={shirtImage}
          style={{
            width: "39%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 1,
            position: "absolute",
            top: "-117.8%",
            left: "30%",
          }}
        />
        <Image
          source={pantsImage}
          style={{
            marginTop: -160,
            width: "30%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 1,
            position: "absolute",
            top: "91%",
            left: "34.5%",
          }}
        />
      </View>
      <View className="px-10 justify-center space-y-3 pb-10">
        <Text className="text-4xl mt-[-50] justify-left text-[#723D46] font-balooregular leading-tight">
          Reviews
        </Text>
        <Text></Text>
        {reviews.length === 0 && (
          <Text className="text-lg justify-left text-black font-balooregular leading-tight">
            You have not rated any restaurants yet!
          </Text>
        )}

        {displayReviews.map((review) => (
          <View
            key={review.id}
            style={{
              width: "105%",
              minHeight: review.images && review.images.length > 0 ? 380 : 150,
              alignSelf: "center",
              backgroundColor: "#FEFAE0",
              borderRadius: 20,
              borderWidth: 3,
              borderColor: "#723D46",
              padding: 20,
              marginVertical: 16,
              position: "relative",
            }}
          >
            <TouchableOpacity
              onPress={() => deleteReview(review.id)}
              style={{ position: "absolute", top: 10, right: 10 }}
            >
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

            <View className="flex-row ">
              {[1, 2, 3, 4, 5].map((star) => (
                <AntDesign
                  key={star}
                  name="star"
                  size={23}
                  color={review.rating >= star ? "#FFCB2E" : "gray"}
                  marginLeft={star === 1 ? 0 : 4}
                />
              ))}
            </View>
            <View>
              {review.images && review.images.length > 0 && (
                <View
                  className=""
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  {review.images.map((imgUrl, index) => (
                    <Image
                      key={index}
                      source={{ uri: imgUrl }}
                      style={{
                        width: 205,
                        height: 205,
                        borderRadius: 10,
                        marginTop: 10,
                      }}
                    />
                  ))}
                </View>
              )}
              <View className="mt-6">
                <Text
                  className="text-lg text-black font-baloo2"
                  numberOfLines={4}
                >
                  {review.reviewText}
                </Text>
              </View>
            </View>
          </View>
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

        {showAll && (
          <TouchableOpacity onPress={() => setShowAll(false)}>
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
