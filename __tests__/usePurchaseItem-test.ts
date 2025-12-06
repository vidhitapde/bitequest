import { useUser } from "@/app/appprovider";
import usePurchaseItem from "@/functions/src/https/usePurchaseItem";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import * as firestore from "firebase/firestore";
import { DeviceEventEmitter } from "react-native";

jest.mock("../firebaseConfig.js", () => ({
  FB_DB: {}, 
  FB_AUTH: {},
  FB_APP: {}
}));

jest.mock("firebase/firestore", () => ({
  getDocs: jest.fn(),
  getDocFromServer: jest.fn(),
  updateDoc: jest.fn(),
  increment: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
}));

jest.mock("react-native", () => ({
  DeviceEventEmitter: {
    emit: jest.fn(),
  },
}));

jest.mock("@/app/appprovider", () => ({
  useUser: jest.fn(),
}));

describe("usePurchaseItem", () => {
  const mockUser = {
    uid: "user1",
    balance: 100,
    inventory: [],
  };

  beforeEach(() => {
    jest.mocked(useUser).mockReturnValue({ user: mockUser });
    jest.clearAllMocks();
    jest.mocked(firestore.doc).mockReturnValue({ id: "mock" } as any);
  });

  it("fetches shop items on mount", async () => {
    const mockShopItems = [
      { id: "item1", price: 50 },
      { id: "item2", price: 150 },
    ];
    
    jest.mocked(firestore.getDocs).mockResolvedValue({
      docs: mockShopItems.map((item) => ({
        id: item.id,
        data: () => item,
      })),
    } as any);

    jest.mocked(firestore.getDocFromServer).mockResolvedValue({
      exists: () => false, 
    } as any);

    const { result } = renderHook(() => usePurchaseItem());

    await waitFor(() => {
      expect(result.current.shopItems).toEqual(mockShopItems);
    });
  });

  it("fetches user inventory on mount", async () => {
    const mockInventory = ["item1"];
    
    jest.mocked(firestore.getDocFromServer).mockResolvedValue({
      exists: () => true,
      data: () => ({ inventory: mockInventory }),
    } as any);

    jest.mocked(firestore.getDocs).mockResolvedValue({ docs: [] } as any);

    const { result } = renderHook(() => usePurchaseItem());

    await waitFor(() => {
      expect(result.current.inventory).toEqual(mockInventory);
    });
  });

  it("block purchase if balance is too low", async () => {
    const poorUser = { uid: "user1", balance: 10, inventory: [] };
    jest.mocked(useUser).mockReturnValue({ user: poorUser });
    
    const alertSpy = jest.spyOn(global, "alert").mockImplementation(() => {});

    jest.mocked(firestore.getDocFromServer).mockResolvedValue({ exists: () => true, data: () => ({ inventory: [] }) } as any);
    jest.mocked(firestore.getDocs).mockResolvedValue({ docs: [] } as any);

    const { result } = renderHook(() => usePurchaseItem());

    const expensiveItem = { id: "item3", price: 1000 };
    await result.current.purchaseItem(expensiveItem);

    expect(firestore.updateDoc).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith("Not enough coins!");
    
    alertSpy.mockRestore();
  });

  it("block purchase if item is already owned", async () => {
    const userWithSword = { uid: "user1", balance: 500, inventory: [] };
    jest.mocked(useUser).mockReturnValue({ user: userWithSword });

    jest.mocked(firestore.getDocFromServer).mockResolvedValue({
      exists: () => true,
      data: () => ({ inventory: ["item4"] }),
    } as any);

    jest.mocked(firestore.getDocs).mockResolvedValue({ docs: [] } as any);

    const { result, waitForNextUpdate } = renderHook(() => usePurchaseItem());
    
    await waitFor(() => expect(result.current.inventory).toContain("item4"));

    const swordItem = { id: "item4", price: 10 };
    await result.current.purchaseItem(swordItem);

    expect(firestore.updateDoc).not.toHaveBeenCalled();
  });

  it("does not fetch inventory if user is not logged in", async () => {
    jest.mocked(useUser).mockReturnValue({ user: null });

    const { result } = renderHook(() => usePurchaseItem());

    await waitFor(() => {});

    expect(firestore.getDocFromServer).not.toHaveBeenCalled();
    expect(result.current.inventory).toEqual([]);
  });

  it("successfully purchases item: updates firestore + local state, emits events", async () => {
    const richUser = { uid: "user1", balance: 100, inventory: [] };
    jest.mocked(useUser).mockReturnValue({ user: richUser });

    jest.mocked(firestore.getDocFromServer).mockResolvedValue({ exists: () => true, data: () => ({ inventory: [] }) } as any);

    jest.mocked(firestore.getDocs).mockResolvedValue({ docs: [] } as any);

    const { result } = renderHook(() => usePurchaseItem());
    
    await waitFor(() => expect(result.current.inventory).toEqual([]));

    const newItem = { id: "item5", price: 50 };

    await act(async () => {
      await result.current.purchaseItem(newItem);
    });

    expect(firestore.updateDoc).toHaveBeenCalledWith(
      { id: "mock" },
      expect.objectContaining({
        inventory: ["item5"] 
      })
    );

    expect(result.current.inventory).toContain("item5");

    expect(DeviceEventEmitter.emit).toHaveBeenCalledWith("reviewsUpdated");
    expect(DeviceEventEmitter.emit).toHaveBeenCalledWith("inventoryUpdated");
  });

  it("defaults inventory to empty array if no inventory field in firestore", async () => {
    jest.mocked(firestore.getDocFromServer).mockResolvedValue({
      exists: () => true,
      data: () => ({ 
        balance: 50, 
        name: "test" 
      }),
    } as any);

    jest.mocked(firestore.getDocs).mockResolvedValue({ docs: [] } as any);

    const { result } = renderHook(() => usePurchaseItem());

    await waitFor(() => {
      expect(result.current.inventory).toEqual([]);
    });
  });
});