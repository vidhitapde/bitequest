import "../global.css";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { FB_AUTH } from "../firebaseConfig";
import { FB_DB } from "../firebaseConfig";

export default function Review() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [review, setReview] = useState<any>([]);
  const auth = FB_AUTH;
  const user = auth.currentUser;
  const reviewsCollection = collection(FB_DB, 'reviews');

  useEffect(() => {
    fetchReview();
  }, [user]);

  const fetchReview = async () => {
    if (user) {
      const q = query(reviewsCollection, where('userId', "==", user.uid));
      const data = await getDocs(q);
      const userReviews = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(userReviews);
      setReview(userReviews);
    }
    else {
      console.log("No user information found, not logged in");
    }
  }
  const addReview = async () => {
    if (user) {
      await addDoc(reviewsCollection, { rating, reviewText, userId: user.uid });
      setRating(0);
      setReviewText('');
      fetchReview();

    }
    else {
      console.log("No user logged in");
    }
  }

  // const updateReview = async(id: string) =>
  // {
  //   const reviewDoc = doc(FB_DB, 'reviews', id);
  //   fetchReview();
  // }

  // const deleteReview  = async(id: string) => {
  //   const reviewDoc = doc(FB_DB, 'reviews', id);
  //   await deleteDoc(reviewDoc);
  //   fetchReview();
  // }


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
            Restaurant name
          </Text>
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
