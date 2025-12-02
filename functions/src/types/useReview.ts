import { router } from "expo-router";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "../../../app/appprovider";
import { FB_AUTH, FB_DB, GOOGLE } from "../../../firebaseConfig.js";

export default function useReview() {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReview] = useState<any>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState('Restaurant name');
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);
    const auth = FB_AUTH;
    // const user = auth.currentUser;
    const { user } = useUser();
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
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(text)}&types=restaurant&key=${GOOGLE}`
            );
            const data = await response.json();

            if (data.predictions) {
                setSearchResults(data.predictions);
                setShowResults(true);
            }
        } catch (error) {
            console.error('Error searching restaurants:', error);
        }
    };

    const selectRestaurant = (restaurant: any) => {
        //just restuarant name from full addy
        const restaurantName = restaurant.description.split(',')[0].trim();
        setSelectedRestaurant(restaurantName);
        setSearchText(restaurant.description);
        setShowResults(false);
    };

    const addReview = async () => {
        if (user) {
            await addDoc(reviewsCollection, {
                rating,
                reviewText,
                userId: user.uid,
                restaurantName: selectedRestaurant,
                restaurantFullAddress: searchText
            });
            setRating(0);
            setReviewText('');
            fetchReview();
            router.push("/(tabs)/map");
        }
        else {
            console.log("No user logged in");
        }
    }





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
    };


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
}
