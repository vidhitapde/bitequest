import { fireEvent, render } from "@testing-library/react-native";
import Profile from "../app/(tabs)/profile";
import { FB_AUTH } from "../firebaseConfig";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

type Review = {
    id: string;
    userId: string;
    restaurantName: string;
    rating: number;
    reviewText: string;
    photoUrl: string | null;
};

const mockUseReview: {
    rating: number;
    setRating: jest.Mock;
    reviewText: string;
    setReviewText: jest.Mock;
    reviews: Review[];
    addReview: jest.Mock;
    fetchReview: jest.Mock;
    selectedRestaurant: string;
    searchText: string;
    showResults: boolean;
    searchResults: any[];
    setSearchText: jest.Mock;
    searchRestaurants: jest.Mock;
    selectRestaurant: jest.Mock;
    pickImage: jest.Mock;
    photoUri: string | null;
    deleteReview: jest.Mock;
    city: string;
} = {
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
    deleteReview: jest.fn(),
    city: "Test City",
};
jest.mock("../functions/src/types/useReview", () => ({
    __esModule: true,
    default: () => mockUseReview,
}));
describe("<Profile />", () => {
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

      test("Text renders correctly on Profile screen", () => {
          const { getByText } = render(<Profile />);
          expect(getByText("Reviews")).toBeTruthy();
      });
      test("If no reviews exist, they are not displayed", () => {
          const { getByText } = render(<Profile />);
        expect(getByText("You have not rated any restaurants yet!")).toBeTruthy();
      });
      test("When reviews exist, they are displayed", () => {
          mockUseReview.reviews = [
              {
                  id: 'review1',
                  userId: 'test-user-uid',
                  restaurantName: 'Test Restaurant',
                  rating: 4,
                  reviewText: 'Great food!',
                  photoUrl: null,
              },
          ];
          const { getByText } = render(<Profile />);
          expect(getByText("Test Restaurant")).toBeTruthy();
          expect(getByText("Great food!")).toBeTruthy();
      });
      test("When the delete button is pressed, the review is deleted", () => {
          mockUseReview.reviews = [
              {
                  id: 'review1',
                  userId: 'test-user-uid',
                  restaurantName: 'Test Restaurant',
                  rating: 4,
                  reviewText: 'Great food!',
                  photoUrl: null,
              },
          ];
          const { getByTestId } = render(<Profile />);
          const deleteButton = getByTestId("delete-review-review1");

          fireEvent.press(deleteButton);

          expect(mockUseReview.deleteReview).toHaveBeenCalledWith('review1');
      });
      test("View all button loads more reviews", () => {
          mockUseReview.reviews = [
              {
                  id: 'review1',
                  userId: 'test-user-uid',
                  restaurantName: 'Test Restaurant 1',
                  rating: 4,
                  reviewText: 'Great food!',
                  photoUrl: null,
              },
              {
                  id: 'review2',
                  userId: 'test-user-uid',
                  restaurantName: 'Test Restaurant 2',
                  rating: 5,
                  reviewText: 'Excellent service!',
                  photoUrl: null,
              },
              {
                  id: 'review3',
                  userId: 'test-user-uid',
                  restaurantName: 'Test Restaurant 3',
                  rating: 5,
                  reviewText: 'Excellent service!',
                  photoUrl: null,
              },
              {
                  id: 'review4',
                  userId: 'test-user-uid',
                  restaurantName: 'Test Restaurant 4',
                  rating: 5,
                  reviewText: 'Excellent service!',
                  photoUrl: null,
              },
          ];
          const { getByText } = render(<Profile />);
          const viewAllButton = getByText("view all →");

          fireEvent.press(viewAllButton);

        });
        test("View less button collapses reviews", () => {
          mockUseReview.reviews = [
              {
                  id: 'review1',
                  userId: 'test-user-uid',
                  restaurantName: 'Test Restaurant 1',
                  rating: 4,
                  reviewText: 'Great food!',
                  photoUrl: null,
              },
              {
                  id: 'review2',
                  userId: 'test-user-uid',
                  restaurantName: 'Test Restaurant 2',
                  rating: 5,
                  reviewText: 'Excellent service!',
                  photoUrl: null,
              },
              {
                  id: 'review3',
                  userId: 'test-user-uid',
                  restaurantName: 'Test Restaurant 3',
                  rating: 5,
                  reviewText: 'Excellent service!',
                  photoUrl: null,
              },
              {
                  id: 'review4',
                  userId: 'test-user-uid',
                  restaurantName: 'Test Restaurant 4',
                  rating: 5,
                  reviewText: 'Excellent service!',
                  photoUrl: null,
              },
          ];
          const { getByText } = render(<Profile />);
          const viewAllButton = getByText("view all →");

          fireEvent.press(viewAllButton);

          const viewLessButton = getByText("view less ←");

          fireEvent.press(viewLessButton);
        });
});
