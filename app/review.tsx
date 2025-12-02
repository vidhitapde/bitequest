import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, TextInput, TouchableOpacity, View } from "react-native";
import { FB_AUTH, FB_DB } from "../firebaseConfig";
import useReview from "../functions/src/types/useReview";
import "../global.css";

export default function Review() {
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
  } = useReview();


  return (
    <View className="flex-1 bg-[#FEFAE0]">
      <View className="mt-24 w-5/6 mx-auto">
        <View className="flex-row items-center mx-auto border-b-2 py-6 border-[#723D46]">
          <MaterialIcons
            name="restaurant"
            size={36}
            color="black"
            className="bg-blue-400 p-4 text-center rounded-full w-fit"
          />
          <Text className="ml-10 text-3xl font-baloo2 text-[#723D46]">
            {selectedRestaurant}
          </Text>
        </View>

        <View className="mt-6 mb-4">
          <Text className="text-center font-baloo2 text-2xl mt-2 mb-2">
            Search for a restaurant
          </Text>
          <View className="relative">
            <TextInput
              placeholder="Search for restaurants..."
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                searchRestaurants(text);
              }}
              className="border-2 border-gray-400 bg-white rounded-md p-2"
            />
            {showResults && searchResults.length > 0 && (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.place_id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 8,
                  marginTop: 4,
                  maxHeight: 200,
                }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => selectRestaurant(item)}
                    style={{
                      backgroundColor: 'white',
                      padding: 13,
                      minHeight: 44,
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text className="text-black text-sm">
                      {item.description}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
        <Text className="text-center font-baloo2 text-2xl mt-8 mb-2">
          Leave a rating
        </Text>
        <View className="flex-row justify-center gap-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <AntDesign
              key={star}
              name="star"
              size={26}
              color={rating >= star ? "yellow" : "gray"}
              onPress={() => setRating(star)}
            />
          ))}
        </View>
        <Text className="text-center font-baloo2 text-2xl mt-12 mb-2">
          Write a review
        </Text>
        <Textarea
          placeholder="Type your review here..."
          numberOfLines={8}
          className="border-2 border-gray-400 bg-white rounded-md p-2"
          value={reviewText}
          onChangeText={setReviewText}
        />
        <Button onPress={addReview}>
          <Text className="bg-[#723D46] m-6 mt-12 text-xl text-[#FEFAE0] p-2 px-10 rounded-full">
            Post
          </Text>
        </Button>
      </View>
    </View>
  );
}
