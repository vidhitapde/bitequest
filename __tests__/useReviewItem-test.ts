
jest.mock("../firebaseConfig.js", () =>
    require("../__mocks__/firebase.js"));
import useReview from "@/functions/src/types/useReview";
import { act, renderHook, waitFor } from "@testing-library/react-native";

import { router } from "expo-router";
import * as firebaseMock from "../__mocks__/firebase.js";

jest.mock("@/app/appprovider", () => ({
    useUser: () => ({ user: { uid: "test-user-uid" } }),
}));

jest.mock("react-native", () => ({
    DeviceEventEmitter: {
        emit: jest.fn()
    },
}));

jest.mock("expo-image-picker", () => ({
    requestMediaLibraryPermissionsAsync: jest.fn(() =>
        Promise.resolve({ granted: true })
    ),
    launchImageLibraryAsync: jest.fn(() =>
        Promise.resolve({
            canceled: false,
            assets: [{ uri: "mock://image.jpg" }],
        })
    ),
}));

jest.mock("expo-router", () => ({
    router: { push: jest.fn() },
}));




describe("useReview", () => {

    test("fetchReview forms an empty list of reviews", async () => {
        firebaseMock.getDocs.mockResolvedValue({ docs: [] });

        const { result } = renderHook(() => useReview());

        await waitFor(() => {
            expect(result.current.reviews.length).toBe(0);
        });
    });

    test("pickImage chooses picture from camera roll", async () => {
        const { result } = renderHook(() => useReview());

        await act(async () => {
            await result.current.pickImage();
        });

        expect(result.current.photoUri).toBe("mock://image.jpg");
    });

    test("addReview function: writes Firestore data, resets state and goes further", async () => {
        const { result } = renderHook(() => useReview());


        firebaseMock.addDoc.mockResolvedValue({ id: "review123" });

        (router.push as jest.Mock).mockImplementation(() => { });

        act(() => {
            result.current.photoUri = "mock://image.jpg";
            result.current.setRating(4);
            result.current.setReviewText("Good!");
            result.current.setSearchText("123 Test St");
            result.current.setCity("Test City");
            result.current.setSelectedRestaurant("Eureka!");
        });

        await act(async () => {
            await result.current.addReview();
        });

        expect(firebaseMock.addDoc).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
                rating: 4,
                reviewText: "Good!",
                restaurantName: "Eureka!",
                restaurantFullAddress: "123 Test St",
                city: "Test City",
                userId: "test-user-uid",
            })
        );

        expect(router.push).toHaveBeenCalledWith("/(tabs)/map");
    });

    test("deleteReview deletes review + emits event", async () => {
        firebaseMock.deleteDoc.mockResolvedValue();

        const { result } = renderHook(() => useReview());

        await act(async () => {
            await result.current.deleteReview("review123");
        });

        expect(firebaseMock.deleteDoc).toHaveBeenCalled();
    });


    test("searchRestaurants fetches autocomplete (predicts users choice)", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        predictions: [{ description: "Eureka!, City, CA, USA" }],
                    }),
            })
        ) as any;

        const { result } = renderHook(() => useReview());

        await act(async () => {
            await result.current.searchRestaurants("eu");
        });

        expect(result.current.searchResults.length).toBe(1);
        expect(result.current.showResults).toBe(true);
    });
    test("searchRestaurants is less than 2 chars", async () => {
        const { result } = renderHook(() => useReview());

        await act(async () => {
            await result.current.searchRestaurants("e");
        });

        expect(result.current.searchResults.length).toBe(0);
        expect(result.current.showResults).toBe(false);
    });
    test("selectRestaurant extracts name and city and the state", () => {
        const { result } = renderHook(() => useReview());

        const restaurant = {
            description: "Eureka!, Street, TestCity, CA, USA",
        };

        act(() => {
            result.current.selectRestaurant(restaurant);
        });

        expect(result.current.selectedRestaurant).toBe("Eureka!");
        expect(result.current.city).toBe("TestCity, CA");
        expect(result.current.searchText).toBe(restaurant.description);
    });
});
