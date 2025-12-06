import { fireEvent, render, act, waitFor } from "@testing-library/react-native";
import { getDocs } from 'firebase/firestore';
import { FB_AUTH } from "../firebaseConfig";
import { DeviceEventEmitter } from 'react-native';

import Map from "../app/(tabs)/map";

const mockPush = jest.fn();

// Mock the useUser hook
const mockUser = {
    balance: 150,
    uid: 'test-user-uid',
    email: 'test@example.com'
};

jest.mock("../app/appprovider", () => ({
    useUser: () => ({ user: mockUser })
}));

const mockedGetDocs = getDocs as jest.MockedFunction<typeof getDocs>;


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
        jest.clearAllMocks();
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
    test("Sign out button signs out user", () => {
        const { getByTestId } = render(<Map />);
        const signOutButton = getByTestId("sign-out");

        fireEvent.press(signOutButton);
        expect(FB_AUTH.currentUser).toBeNull();

    });
    test("User coin balance is displayed correctly", () => {
        const { getByText } = render(<Map />);
        
        expect(getByText("150")).toBeTruthy();
    });
    test('calls Google geocode API when review contains restaurantFullAddress', async () => {
      // mock getDocs to return one review that contains restaurantFullAddress
      mockedGetDocs.mockResolvedValueOnce({
        docs: [
          {
            id: 'r1',
            data: () => ({
              userId: 'test-user-uid',
              restaurantFullAddress: 'Place, Los Angeles, CA',
            }),
          },
        ],
      } as any);
    
      // Mock fetch response for Google Geocode API
      (global as any).fetch = jest.fn().mockResolvedValueOnce({
        json: async () => ({
          results: [
            {
              formatted_address: 'Los Angeles, CA, USA',
              address_components: [
                { long_name: 'Los Angeles County', types: ['area1'] },
                { long_name: 'California', short_name: 'CA', types: ['area2'] },
              ],
            },
          ],
        }),
      });
    
      render(<Map />);
    
      await waitFor(() => {
        expect(mockedGetDocs).toHaveBeenCalled();
        expect((global as any).fetch).toHaveBeenCalled();
      });
    });
    
    test('refetch reviews when reviewsUpdated', async () => {
      mockedGetDocs.mockResolvedValue({ docs: [] } as any);
    
      render(<Map />);
    
      // initial call
      await waitFor(() => expect(mockedGetDocs).toHaveBeenCalledTimes(1));
    
      // trigger fetchReviews again
      act(() => {
        DeviceEventEmitter.emit('reviewsUpdated');
      });
    
      await waitFor(() => expect(mockedGetDocs).toHaveBeenCalledTimes(2));
    });
});
