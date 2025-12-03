import {
  addDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "../../../app/appprovider";
import { FB_DB, GOOGLE, FB_STORAGE } from "../../../firebaseConfig.js";
import { router } from "expo-router";
import { Alert, Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function useReview() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReview] = useState<any>([]);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState("Restaurant name");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const { user } = useUser();
  const reviewsCollection = collection(FB_DB, "reviews");

  useEffect(() => {
    fetchReview();
  }, [user]);

  const fetchReview = async () => {
    if (user) {
      const q = query(reviewsCollection, where("userId", "==", user.uid));
      const data = await getDocs(q);
      const userReviews = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(userReviews);
      setReview(userReviews);
    } else {
      console.log("No user information found, not logged in");
    }
  };
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  // };
  //    const addReview = async () => {
  //        if (user) {
  //            await addDoc(reviewsCollection, { rating, reviewText, userId: user.uid });
  //            setRating(0);
  //            setReviewText('');
  //            fetchReview();

  //        }
  //        else {
  //            console.log("No user logged in");
  //        }
  //    }
  const searchRestaurants = async (text: string) => {
    if (text.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(text)}&types=restaurant&key=${GOOGLE}`,
      );
      const data = await response.json();

      if (data.predictions) {
        setSearchResults(data.predictions);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Error searching restaurants:", error);
    }
  };

  const selectRestaurant = (restaurant: any) => {
    //just restuarant name from full addy
    const restaurantName = restaurant.description.split(",")[0].trim();
    setSelectedRestaurant(restaurantName);
    setSearchText(restaurant.description);
    setShowResults(false);
  };

  const addReview = async () => {
    //   if (user) {
    //     if (photoUri) {
    //       try {
    //         imageUrl = await uploadReviewImage(photoUri);
    //       }
    //  }
    await addDoc(reviewsCollection, {
      rating,
      reviewText,
      userId: user.uid,
      restaurantName: selectedRestaurant,
      restaurantFullAddress: searchText,
      // imageUrl: imageUrl,
    });
    setRating(0);
    setReviewText("");
    fetchReview();
    router.push("/(tabs)/map");
  };

  const deleteReview = async (id: string) => {
    const reviewDoc = doc(FB_DB, "reviews", id);
    await deleteDoc(reviewDoc);
    fetchReview();
  };

  return {
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
    photoUri,
    pickImage,
  };

  // const updateReview = async(id: string) =>
  // {
  //   const reviewDoc = doc(FB_DB, 'reviews', id);
  //   fetchReview();
  // }
}
