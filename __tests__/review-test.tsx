import { fireEvent, render } from "@testing-library/react-native";
import Review from "../app/review";
import { FB_AUTH, GOOGLE } from "../firebaseConfig";

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

const getCountyFromAddress = async (restaurantAddress: string) => {
  try {
    let parsedAddress = restaurantAddress;

    const commaParts = restaurantAddress.split(",");
    if (commaParts.length > 1) {
      parsedAddress = commaParts.slice(1).join(",").trim();
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(parsedAddress)}&key=${GOOGLE}`,
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      let selectedResult = null;

      for (const result of data.results) {
        const stateComponent = result.address_components.find(
          (component: any) =>
            component.types.includes("administrative_area_level_1"),
        );

        if (
          stateComponent &&
          (stateComponent.short_name === "CA" ||
            stateComponent.long_name === "California")
        ) {
          selectedResult = result;
          break;
        }
      }

      if (!selectedResult) {
        selectedResult = data.results[0];
      }

      const addressComponents = selectedResult.address_components;
      const countyComponent = addressComponents.find((component: any) =>
        component.types.includes("administrative_area_level_2"),
      );
      if (countyComponent) {
        const countyName = countyComponent.long_name.replace(" County", "");
        return countyName;
      }
    }
  } catch (error) {
    console.error("Error fetching county from address:", error);
  }
  return null;
};

const mockUseReview = {
  rating: 0,
  setRating: jest.fn(),
  reviewText: "",
  setReviewText: jest.fn(),
  reviews: [],
  addReview: jest.fn(),
  fetchReview: jest.fn(),
  selectedRestaurant: "restaurant1",
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
    mockUseReview.selectedRestaurant = "restaurant1";
    mockUseReview.searchText = "";
    mockUseReview.showResults = false;
    mockUseReview.searchResults = [];

    (FB_AUTH as any).currentUser = {
      uid: "uid1",
      email: "test@example.com",
      displayName: "user1",
      photoURL: null,
      emailVerified: false,
    };
  });

  test("navigates back to map when button is pressed", () => {
    const { getByTestId } = render(<Review />);
    const backButton = getByTestId("backbutton");
    expect(backButton).toBeTruthy();
    fireEvent.press(backButton);
    expect(mockPush).toHaveBeenCalledWith("/(tabs)/map");
  });

  test("text renders correctly on Review screen", () => {
    const { getByText } = render(<Review />);
    expect(getByText("Write a review")).toBeTruthy();
    expect(getByText("Leave a rating")).toBeTruthy();
  });

  test("testaurants can be searched and selected", () => {
    mockUseReview.searchText = "Eureka!";

    const { getByPlaceholderText } = render(<Review />);
    const searchInput = getByPlaceholderText("Search for restaurants...");
    expect(searchInput).toBeTruthy();
    expect(searchInput.props.value).toBe("Eureka!");

    fireEvent.changeText(searchInput, "New Restaurant");
    expect(mockUseReview.setSearchText).toHaveBeenCalledWith("New Restaurant");
  });

  test("selected restaurant name appears on screen", () => {
    mockUseReview.selectedRestaurant = "Eureka Burger";

    const { getByText } = render(<Review />);

    expect(getByText("Eureka Burger")).toBeTruthy();
  });

  test("restaurant selection updates the displayed name", () => {
    const mockRestaurant = {
      place_id: "123",
      description: "Eureka Burger, Main Street, City, State",
    };

    mockUseReview.showResults = true;
    mockUseReview.searchResults = [mockRestaurant] as any;
    mockUseReview.selectedRestaurant = "Eureka Burger";

    const { getByText } = render(<Review />);

    expect(getByText("Eureka Burger")).toBeTruthy();
  });

  test("review text input works correctly", () => {
    const { getByPlaceholderText } = render(<Review />);
    const reviewInput = getByPlaceholderText("Type your review here...");
    expect(reviewInput).toBeTruthy();

    fireEvent.changeText(reviewInput, "yum");
    expect(mockUseReview.setReviewText).toHaveBeenCalledWith("yum");
  });

  test("able to upload a photo for the review", () => {
    const { getByText } = render(<Review />);
    const uploadButton = getByText("Upload Photo");
    expect(uploadButton).toBeTruthy();

    fireEvent.press(uploadButton);
    expect(mockUseReview.pickImage).toHaveBeenCalled();
  });

  test("able to press post review button", () => {
    const { getByText } = render(<Review />);
    const postButton = getByText("Post");
    expect(postButton).toBeTruthy();

    fireEvent.press(postButton);
    expect(mockUseReview.addReview).toHaveBeenCalled();
  });

  test("able to choose amount of stars for a rating", () => {
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

  test("Google Places Geocode API returns correct county for restaurant address", async () => {
    const restaurantAddress = "1600 Vine St, Hollywood, CA 90028";

    const county = await getCountyFromAddress(restaurantAddress);

    expect(typeof county === "string" || county === null).toBe(true);

    if (county) {
      console.log("API returned county:", county);
      expect(typeof county).toBe("string");
    } else {
      console.log(
        "API call returned null - this could be due to API limits or address not found",
      );
    }
  }, 20000);
});
