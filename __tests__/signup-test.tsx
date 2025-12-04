import { fireEvent, render } from "@testing-library/react-native";
import SignUp from "../app/signup";
const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("<SignUp />", () => {
    beforeEach(() => {
        mockPush.mockClear();
    });

    test("Text renders correctly on Sign Up screen", () => {
        const { getByText } = render(<SignUp />);
        expect(getByText("Sign Up")).toBeTruthy();
        expect(getByText("Create Account")).toBeTruthy();
        expect(getByText("Create an account to explore BiteQuest.")).toBeTruthy();
    });
     test("Email input field is present and functional", () => {
            const { getByPlaceholderText } = render(<SignUp />);
            const emailInput = getByPlaceholderText("Email");
            
            expect(emailInput).toBeTruthy();
            
            fireEvent.changeText(emailInput, "test@example.com");
            expect(emailInput.props.value).toBe("test@example.com");
        });

    test("Name input field is present and functional", () => {
            const { getByPlaceholderText } = render(<SignUp />);
            const nameInput = getByPlaceholderText("Name");

            expect(nameInput).toBeTruthy();

            fireEvent.changeText(nameInput, "Test User");
            expect(nameInput.props.value).toBe("Test User");
        });
        test("Password input field is present and functional", () => {
            const { getByPlaceholderText } = render(<SignUp />);
            const passwordInput = getByPlaceholderText("Enter your password");
            
            expect(passwordInput).toBeTruthy();
            
            fireEvent.changeText(passwordInput, "password123");
            expect(passwordInput.props.value).toBe("password123");
        });
        test("Password and confirm password fields match", () => {
            const { getByPlaceholderText } = render(<SignUp />);
            const passwordInput = getByPlaceholderText("Enter your password");
            const confirmPasswordInput = getByPlaceholderText("Confirm password");
            
            fireEvent.changeText(passwordInput, "password123");
            fireEvent.changeText(confirmPasswordInput, "password123");
            
            expect(passwordInput.props.value).toBe(confirmPasswordInput.props.value);
        });
         test("Password and confirm password fields don't match", async () => {
            (global.alert as jest.Mock).mockClear();
            const { getByPlaceholderText, getByText } = render(<SignUp />);
            const passwordInput = getByPlaceholderText("Enter your password");
            const confirmPasswordInput = getByPlaceholderText("Confirm password");
            const createAccountButton = getByText("Create Account");

            fireEvent.changeText(passwordInput, "password123");
            fireEvent.changeText(confirmPasswordInput, "password124");
            fireEvent.press(createAccountButton);
            
            await new Promise(resolve => setTimeout(resolve, 100));
            expect(global.alert).toHaveBeenCalledWith(
                expect.stringContaining("Passwords do not match. Please try again.")
            );
            expect(passwordInput.props.value).not.toBe(confirmPasswordInput.props.value);
        });
        test("Password checks for length", () => {
            const { getByPlaceholderText, getByText } = render(<SignUp />);
            const passwordInput = getByPlaceholderText("Enter your password");
            
            fireEvent.changeText(passwordInput, "pass");
            expect(passwordInput.props.value.length).toBeLessThan(6);
            
            fireEvent.changeText(passwordInput, "password123");
            expect(passwordInput.props.value.length).toBeGreaterThanOrEqual(6);
        });

        test("Shows alert when password is less than 6 characters", async () => {
            (global.alert as jest.Mock).mockClear();
            
            const { getByPlaceholderText, getByText } = render(<SignUp />);
            const nameInput = getByPlaceholderText("Name");
            const emailInput = getByPlaceholderText("Email");
            const passwordInput = getByPlaceholderText("Enter your password");
            const confirmPasswordInput = getByPlaceholderText("Confirm password");
            const createAccountButton = getByText("Create Account");
            
            fireEvent.changeText(nameInput, "Test User");
            fireEvent.changeText(emailInput, "test@example.com");
            fireEvent.changeText(passwordInput, "123"); // Less than 6 characters
            fireEvent.changeText(confirmPasswordInput, "123");
            
            fireEvent.press(createAccountButton);
            
            await new Promise(resolve => setTimeout(resolve, 100));
                        expect(global.alert).toHaveBeenCalledWith(
                expect.stringContaining("Failed to sign in. Please check your credentials and try again.") 
            );
        });
    test("Create Account button is clicked without any information", async () => {
            (global.alert as jest.Mock).mockClear();
            
            const { getByText } = render(<SignUp />);
            const createAccountButton = getByText("Create Account");
            
            fireEvent.press(createAccountButton);
            
            await new Promise(resolve => setTimeout(resolve, 100));
                        expect(global.alert).toHaveBeenCalledWith(
                expect.stringContaining("Failed to sign in. Please check your credentials and try again.") 
            );
        });
   
    test("Navigates to login screen on link press", () => {
        const { getByText } = render(<SignUp />);
        const loginLink = getByText("here");

        fireEvent.press(loginLink);

        expect(mockPush).toHaveBeenCalledWith("/login");
    });


});