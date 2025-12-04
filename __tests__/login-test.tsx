import { fireEvent, render } from "@testing-library/react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Login from "../app/login";
import { FB_AUTH } from "../firebaseConfig";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Helper function to create a test user
const createTestUser = async (email: string, password: string, displayName: string) => {
    try {
        await createUserWithEmailAndPassword(FB_AUTH, email, password);
    } catch (error) {
        // User might already exist, which is fine for testing
        console.log("User creation error (expected in tests):", error);
    }
};

describe("<Login />", () => {
    beforeEach(() => {
        mockPush.mockClear();
        (global.alert as jest.Mock).mockClear();
    });

    test("Text renders correctly on Login screen", () => {
        const { getByText } = render(<Login />);
        expect(getByText("Log In")).toBeTruthy();
        expect(getByText("Enter your email and password to access BiteQuest.")).toBeTruthy();
    });

    test("Navigates to signup screen on link press", () => {
        const { getByText } = render(<Login />);
        const signupLink = getByText("here");

        fireEvent.press(signupLink);

        expect(mockPush).toHaveBeenCalledWith("/signup");
    });
    test("Navigates to forgot password screen on link press", () => {
        const { getByText } = render(<Login />);
        const forgotPasswordLink = getByText("Forgot password?");

        fireEvent.press(forgotPasswordLink);

        expect(mockPush).toHaveBeenCalledWith("/forgotpassword");
    });
    test("Login button exists and can be pressed", () => {
        const { getByText } = render(<Login />);
        const loginButton = getByText("Login");

        fireEvent.press(loginButton);
        expect(loginButton).toBeTruthy();
    });
    test("Email input field is present and functional", () => {
        const { getByPlaceholderText } = render(<Login />);
        const emailInput = getByPlaceholderText("Email");
        
        expect(emailInput).toBeTruthy();

        fireEvent.changeText(emailInput, "test@example.com");
        expect(emailInput.props.value).toBe("test@example.com");
    });
    test("Password input field is present and functional", () => {
        const { getByPlaceholderText } = render(<Login />);
        const passwordInput = getByPlaceholderText("Enter your password");
        
        expect(passwordInput).toBeTruthy();
        
        fireEvent.changeText(passwordInput, "password123");
        expect(passwordInput.props.value).toBe("password123");
    });
    test("Login button with valid email and password", async () => {
        // First create a test user
        await createTestUser("test@example.com", "password123", "Test User");
        
        // Clear any alerts from the signup process
        (global.alert as jest.Mock).mockClear();
        
        const { getByPlaceholderText, getByText } = render(<Login />);
        const emailInput = getByPlaceholderText("Email");
        const passwordInput = getByPlaceholderText("Enter your password");
        const loginButton = getByText("Login");

        fireEvent.changeText(emailInput, "test@example.com");
        fireEvent.changeText(passwordInput, "password123");
        fireEvent.press(loginButton);

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(global.alert).toHaveBeenCalledWith(
            expect.stringContaining("Welcome back")
        );
    });
    test("Login button with valid email and incorrect password", async () => {
        // First create a test user with correct password
        await createTestUser("test2@example.com", "correctpassword", "Test User 2");
        
        // Clear any alerts from the signup process
        (global.alert as jest.Mock).mockClear();
        
        const { getByPlaceholderText, getByText } = render(<Login />);
        const emailInput = getByPlaceholderText("Email");
        const passwordInput = getByPlaceholderText("Enter your password");
        const loginButton = getByText("Login");

        fireEvent.changeText(emailInput, "test2@example.com");
        fireEvent.changeText(passwordInput, "wrongpassword");
        fireEvent.press(loginButton);

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(global.alert).toHaveBeenCalledWith(
            expect.stringContaining("Failed to sign in. Please check your credentials and try again.")
        );
    });
    test("Login button with invalid email format shows alert", async () => {
        (global.alert as jest.Mock).mockClear();
        const { getByPlaceholderText, getByText } = render(<Login />);
        const emailInput = getByPlaceholderText("Email");
        const passwordInput = getByPlaceholderText("Enter your password");
        const loginButton = getByText("Login");

        fireEvent.changeText(emailInput, "invalid-email-format");
        fireEvent.changeText(passwordInput, "somepassword");
        fireEvent.press(loginButton);

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(global.alert).toHaveBeenCalledWith(
            expect.stringContaining("Failed to sign in. Please check your credentials and try again.")
        );  
    });
   test("Pressing eye icon shows your password", () => {
        const { getByPlaceholderText, getByTestId } = render(<Login />);
        const passwordInput = getByPlaceholderText("Enter your password");
        const eyeIcon = getByTestId("togglePasswordVisibility");
        expect(passwordInput.props.secureTextEntry).toBe(true);
        fireEvent.press(eyeIcon);
        expect(passwordInput.props.secureTextEntry).toBe(false);
        fireEvent.press(eyeIcon);
        expect(passwordInput.props.secureTextEntry).toBe(true);
    });
   
    test("Login button without email and password shows alert", async () => {
        (global.alert as jest.Mock).mockClear();
        const { getByText } = render(<Login />);
        const loginButton = getByText("Login");

        fireEvent.press(loginButton);

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(global.alert).toHaveBeenCalledWith(
            expect.stringContaining("Failed to sign in. Please check your credentials and try again.")
        );  
    });
});
