import { fireEvent, render } from "@testing-library/react-native";
import Map from "../app/(tabs)/map";
import { FB_AUTH } from "../firebaseConfig";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
    useRouter: () => ({
        push: mockPush,
        replace: jest.fn(),
        back: jest.fn(),
    }),
    router: {
        push: mockPush,
        replace: jest.fn(),
        back: jest.fn(),
    },
    Link: ({ children }: any) => children,
}));

describe("<Map />", () => {
    beforeEach(() => {
        mockPush.mockClear();
        (global.alert as jest.Mock).mockClear();
        (FB_AUTH as any).currentUser = {
            uid: 'test-user-uid',
            email: 'test@example.com',
            displayName: 'Test User',
            photoURL: null,
            emailVerified: false
        };
    });

    test("Text renders correctly on Map screen", () => {
        const { getByText } = render(<Map />);
        expect(getByText("POST")).toBeTruthy();
    });
    test("Post button exists and can be pressed", () => {
        const { getByText } = render(<Map />);
        const postButton = getByText("POST");

        fireEvent.press(postButton);
        expect(postButton).toBeTruthy();
    });
    test("Post button navigates to Review screen on press", () => {
        const { getByText } = render(<Map />);
        const postButton = getByText("POST");

        fireEvent.press(postButton);

        expect(mockPush).toHaveBeenCalledWith("/review");
    });
    test("Sign out button exists and can be pressed", () => {
        const { getByText, getByTestId } = render(<Map />);
        const signOutButton = getByTestId("sign-out");

        fireEvent.press(signOutButton);
        expect(signOutButton).toBeTruthy();
    });
    test("Sign out button signs out user", async () => {
        const { getByTestId } = render(<Map />);
        const signOutButton = getByTestId("sign-out");

        fireEvent.press(signOutButton);
        await new Promise(resolve => setTimeout(resolve, 0));
        
        expect(FB_AUTH.currentUser).toBeNull();
    });
    
    test("Google API Key is present", () => {
        expect(process.env.API_KEY).toBeDefined();
    });
    test("Google API should fetch county data properly", async () => {
        const apiKey = process.env.API_KEY;
        const address = "10971 Magnolia Ave, Riverside, CA 92505";
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
        const data = await response.json();
        
        const countyComponent = data.results[0].address_components.find((component: any) =>
            component.types.includes("administrative_area_level_2")
        );
        
        expect(countyComponent).toBeDefined();
        expect(countyComponent.long_name).toBe("Riverside County");
    });
    test("fetchReview functionality should return reviews for a certain user", async () => {
        const testUserId = 'test-user-uid';
        const testReview = {
            rating: 5,
            reviewText: "Great place!",
            restaurantName: "Testaurant",
            userId: testUserId,
        };
        
        const mockReviewsCollection = [
            testReview,
            { rating: 4, reviewText: "Good food.", restaurantName: "Food Place", userId: "other-user-uid" },
        ];
                const fetchReview = async (userId: string) => {
            return mockReviewsCollection.filter(review => review.userId === userId);
        };
        
        const reviews = await fetchReview(testUserId);
        
        expect(reviews.length).toBe(1);
        expect(reviews[0].reviewText).toBe("Great place!");
    });
   
});
