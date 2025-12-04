import { fireEvent, render } from "@testing-library/react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
    test("Sign out button signs out user", () => {
        const { getByTestId } = render(<Map />);
        const signOutButton = getByTestId("sign-out");

        fireEvent.press(signOutButton);
        expect(FB_AUTH.currentUser).toBeNull();

    });
}); 
