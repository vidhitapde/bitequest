import { fireEvent, render} from "@testing-library/react-native";
import Review from "../app/review";
import { FB_AUTH } from "../firebaseConfig";

// Create mock function
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

const mockUseReview = {
    rating: 0,
    setRating: jest.fn(),
    reviewText: "",
    setReviewText: jest.fn(),
    reviews: [],
    addReview: jest.fn(),
    fetchReview: jest.fn(),
    selectedRestaurant: "Restaurant name",
    searchText: "",
    showResults: false,
    searchResults: [],
    setSearchText: jest.fn(),
    searchRestaurants: jest.fn(),
    selectRestaurant: jest.fn(),
    pickImage: jest.fn(),
    photoUri: null,
};

jest.mock("../functions/src/types/useReview", () => ({
    __esModule: true,
    default: () => mockUseReview,
}));

describe("<Review />", () => {
    beforeEach(() => {
        mockPush.mockClear();
        jest.clearAllMocks();
        
        // Reset mock to default state
        mockUseReview.selectedRestaurant = "Restaurant name";
        mockUseReview.searchText = "";
        mockUseReview.showResults = false;
        mockUseReview.searchResults = [];
        
        (FB_AUTH as any).currentUser = {
            uid: 'test-user-uid',
            email: 'test@example.com',
            displayName: 'Test User',
            photoURL: null,
            emailVerified: false
        };
    });
    test("navigates back to map when button is pressed",() => {
        const { getByTestId } = render(<Review />);
        const backButton = getByTestId("backbutton");
        expect(backButton).toBeTruthy();
        fireEvent.press(backButton);
        expect(mockPush).toHaveBeenCalledWith("/(tabs)/map");
    });

    test("Text renders correctly on Review screen", () => {
        const { getByText } = render(<Review />);
        expect(getByText("Write a review")).toBeTruthy();
        expect(getByText("Leave a rating")).toBeTruthy();
    });

    
    test("Restaurants can be searched and selected", () => {
        mockUseReview.searchText = "Eureka!";
        
        const { getByPlaceholderText } = render(<Review />);
        const searchInput = getByPlaceholderText("Search for restaurants...");
        expect(searchInput).toBeTruthy();
        expect(searchInput.props.value).toBe("Eureka!");
        
        fireEvent.changeText(searchInput, "New Restaurant");
        expect(mockUseReview.setSearchText).toHaveBeenCalledWith("New Restaurant");
    });

    test("Selected restaurant name appears on screen", () => {
        mockUseReview.selectedRestaurant = "Eureka Burger";
        
        const { getByText } = render(<Review />);
        
        expect(getByText("Eureka Burger")).toBeTruthy();
    });

    test("Restaurant selection updates the displayed name", () => {
        const mockRestaurant = {
            place_id: "123",
            description: "Eureka Burger, Main Street, City, State"
        };
        
        mockUseReview.showResults = true;
        mockUseReview.searchResults = [mockRestaurant] as any;
        mockUseReview.selectedRestaurant = "Eureka Burger"; 
        
        const { getByText } = render(<Review />);
        
        expect(getByText("Eureka Burger")).toBeTruthy();
    });
    test("Review text input works correctly", () => {
        const { getByPlaceholderText } = render(<Review />);
        const reviewInput = getByPlaceholderText("Type your review here...");
        expect(reviewInput).toBeTruthy();

        fireEvent.changeText(reviewInput, "Great food and service!");
        expect(mockUseReview.setReviewText).toHaveBeenCalledWith("Great food and service!");
    });
    test("Able to upload a photo for the review", () => {
        const { getByText } = render(<Review />);
        const uploadButton = getByText("Upload Photo");
        expect(uploadButton).toBeTruthy();

        fireEvent.press(uploadButton);
        expect(mockUseReview.pickImage).toHaveBeenCalled();
    });
    test("Able to press post review button", () => {
        const { getByText } = render(<Review />);
        const postButton = getByText("Post");
        expect(postButton).toBeTruthy();

        fireEvent.press(postButton);
        expect(mockUseReview.addReview).toHaveBeenCalled();
    });
   
    test("Able to choose amount of stars for a rating", () => {
        const { getByTestId, getAllByTestId } = render(<Review />);
        
        const stars = getAllByTestId(/^[1-5]$/);
        expect(stars).toHaveLength(5);
        
        const star3 = getByTestId("3");
        expect(star3).toBeTruthy();

        fireEvent.press(star3);
        const star1 = getByTestId("1");
        const star2 = getByTestId("2");
        expect(star1).toBeTruthy();
        expect(star2).toBeTruthy();
        expect(star3).toBeTruthy();
    });
});
