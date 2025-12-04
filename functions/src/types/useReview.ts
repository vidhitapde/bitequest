import {
  addDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "../../../app/appprovider";
import { FB_DB, GOOGLE, FB_STORAGE } from "../../../firebaseConfig.js";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { router } from "expo-router";
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function useReview() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReview] = useState<any>([]);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState("Restaurant name");
  const [city, setCity] =
    useState("Restaurant name");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
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


  const uploadImage = async (uri: string) => {
    if (!user || !uri) {
      console.log(`User: ${user}, Image: ${uri}`); // Add logging to check values
      Alert.alert('No user or image found!');
      return;
    }

    console.log("Attempting to upload image: ", uri); // Log the image URI for debugging

    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      console.log("Blob created: ", blob); // Log the blob for debugging

      const storageRef = ref(FB_STORAGE, `images/${user.uid}/${Date.now()}`);
      await uploadBytes(storageRef, blob);

      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error: any) {
      console.error("Error uploading image: ", error);
      Alert.alert('Upload failed!', error.message);
      return null;
    }
  };



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
  const selectAddress = (restaurant: any) => {
    //just restuarant name from full addy
    const cityName = restaurant.description.split(",")[2].trim();
    const stateName = restaurant.description.split(",")[3].trim();
    const combinedName = cityName + ", " + stateName;
    setCity(combinedName);
    setSearchText(restaurant.description);
    setShowResults(false);
  };

  const selectRestaurant = (restaurant: any) => {
    //just restuarant name from full addy
    const restaurantName = restaurant.description.split(",")[0].trim();
    setSelectedRestaurant(restaurantName);
    selectAddress(restaurant);
    setSearchText(restaurant.description);
    setShowResults(false);
  };


  const addReview = async () => {
    let uploadedUrls = [];
    if (photoUri) {
      const imgurl = await uploadImage(photoUri)
      if (imgurl) {
        uploadedUrls.push(imgurl);
      }
    }
    uploadedUrls = [...uploadedUrls, ...images];
    await addDoc(reviewsCollection, {
      rating,
      reviewText,
      userId: user.uid,
      restaurantName: selectedRestaurant,
      restaurantFullAddress: searchText,
      images: uploadedUrls,
      city: city,
    });
    await updateCoins(20);
    setRating(0);
    setReviewText("");
    fetchReview();
    setPhotoUri(null);;
    router.push("/(tabs)/map");
  };

  // coins, and increments a certain amounnt of points after user adds a review
  const updateCoins = async(amount: number) => 
  {
    if(!user)
    {
      console.log("User not logged in or not found")
      return;
    }
    const userRef = doc(FB_DB, "users", user.uid);
      try{
        await updateDoc(userRef, {
          balance: increment(amount)
        });
        user.balance += amount;
      }catch(error)
      {
        console.error("Error updating coins: ", error);


    }
  }

  const deleteReview = async (id: string) => {
    const reviewDoc = doc(FB_DB, 'reviews', id);
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
    selectAddress,
    city,

  };

  // const updateReview = async(id: string) =>
  // {
  //   const reviewDoc = doc(FB_DB, 'reviews', id);
  //   fetchReview();
  // }
};