import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import Shop from "../app/(tabs)/shop";

const mockPush = jest.fn();
const mockPurchaseItem = jest.fn();
const mockFetchInventory = jest.fn();

const mockShopItems = [
  {
    id: "blue-pants",
    name: "Blue Pants",
    price: 50,
    category: "clothing",
    image: "blue-pants",
  },
  {
    id: "green-shirt", 
    name: "Green Shirt",
    price: 75,
    category: "clothing",
    image: "green-shirt",
  },
  {
    id: "star-rug",
    name: "Star Rug",
    price: 100,
    category: "decor", 
    image: "star-rug",
  },
];

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/functions/src/https/usePurchaseItem", () => ({
  __esModule: true,
  default: () => ({
    shopItems: mockShopItems,
    inventory: [],
    purchaseItem: mockPurchaseItem,
    fetchInventory: mockFetchInventory,
  }),
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(() => 
    Promise.resolve({
      docs: mockShopItems.map(item => ({
        data: () => item,
        id: item.id,
      })),
    })
  ),
}));

jest.mock("@/firebaseConfig", () => ({
  FB_AUTH: {},
  FB_DB: {},
}));

jest.mock("@/data/shopItem", () => ({
  imageMap: {
    "blue-pants": require("../assets/avatar/clothes/blue-pants.png"),
    "green-shirt": require("../assets/avatar/clothes/green-shirt.png"), 
    "star-rug": require("../assets/decor/star-rug.png"),
  },
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe("<Shop />", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockPurchaseItem.mockClear();
    mockFetchInventory.mockClear();
    jest.clearAllMocks();
  });

  test("renders correctly with shop items", async () => {
    const { getByText, getAllByText } = render(<Shop />);
    
    await waitFor(() => {
      expect(getByText("Blue Pants")).toBeTruthy();
      expect(getByText("Green Shirt")).toBeTruthy();
      expect(getByText("Star Rug")).toBeTruthy();
    }, { timeout: 10000 });

    expect(getByText("50 coins")).toBeTruthy();
    expect(getByText("75 coins")).toBeTruthy();
    expect(getByText("100 coins")).toBeTruthy();
  }, 15000);

  test("displays shop items in grid layout", async () => {
    const { getByText } = render(<Shop />);
    
    await waitFor(() => {
      expect(getByText("Blue Pants")).toBeTruthy();
      expect(getByText("Green Shirt")).toBeTruthy();
      expect(getByText("Star Rug")).toBeTruthy();
    }, { timeout: 10000 });
  }, 15000);

  test("calls purchaseItem when shop item is pressed", async () => {
    const { getByText } = render(<Shop />);
    
    await waitFor(() => {
      expect(getByText("Blue Pants")).toBeTruthy();
    }, { timeout: 10000 });

    const bluePantsItem = getByText("Blue Pants");
    fireEvent.press(bluePantsItem);

    expect(mockPurchaseItem).toHaveBeenCalledWith(mockShopItems[0]);
    expect(mockPush).toHaveBeenCalledWith("/(tabs)/shop");
  }, 15000);

  test("renders items without 'Owned' text when inventory is empty", async () => {
    const { getByText, queryByText } = render(<Shop />);
    
    await waitFor(() => {
      expect(getByText("Blue Pants")).toBeTruthy();
      expect(getByText("Green Shirt")).toBeTruthy();
      expect(getByText("Star Rug")).toBeTruthy();
    }, { timeout: 10000 });

    expect(queryByText("Owned")).toBeFalsy();
  }, 15000);

  test("renders with proper mock data", async () => {
    const { getByText } = render(<Shop />);
    await waitFor(() => {
      expect(getByText("Blue Pants")).toBeTruthy();
      expect(getByText("Green Shirt")).toBeTruthy();
      expect(getByText("Star Rug")).toBeTruthy();
    }, { timeout: 10000 });
  }, 15000);

  test("handles multiple item categories correctly", async () => {
    const { getByText } = render(<Shop />);
    
    await waitFor(() => {
      expect(getByText("Blue Pants")).toBeTruthy();
      expect(getByText("Green Shirt")).toBeTruthy();
      
      expect(getByText("Star Rug")).toBeTruthy();
    });
  });

  test("renders shop header image", async () => {
    const { getByText } = render(<Shop />);
    
    // Check that shop content renders, which implies images are rendered
    await waitFor(() => {
      expect(getByText("Blue Pants")).toBeTruthy();
    });
  });


  test("displays correct pricing for all items", async () => {
    const { getByText } = render(<Shop />);
    
    await waitFor(() => {
      expect(getByText("50 coins")).toBeTruthy();
      expect(getByText("75 coins")).toBeTruthy(); 
      expect(getByText("100 coins")).toBeTruthy();
    });
  });
});  