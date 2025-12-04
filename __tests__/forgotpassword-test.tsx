import { fireEvent, render } from "@testing-library/react-native";
import Forgotpassword from "../app/forgotpassword";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("<Forgotpassword />", () => {
    beforeEach(() => {
        mockPush.mockClear();
    });
    
    test("Text renders correctly on Forgot Password screen", () => {
        const { getByText } = render(<Forgotpassword />);
        expect(getByText("Forgot Password?")).toBeTruthy();
        expect(getByText("Enter your email below to receive a reset password link to recover your account.")).toBeTruthy();
    });

    test("Email input field is present and functional", () => {
        const { getByPlaceholderText } = render(<Forgotpassword />);
        const emailInput = getByPlaceholderText("Email");
        
        expect(emailInput).toBeTruthy();
        
        fireEvent.changeText(emailInput, "test@example.com");
        expect(emailInput.props.value).toBe("test@example.com");
    });


    test("Can enter and clear email input", () => {
        const { getByPlaceholderText } = render(<Forgotpassword />);
        const emailInput = getByPlaceholderText("Email");
        
        fireEvent.changeText(emailInput, "user@example.com");
        expect(emailInput.props.value).toBe("user@example.com");
        fireEvent.changeText(emailInput, "");
        expect(emailInput.props.value).toBe("");
    });

    test("Continue button responds to press events", () => {
        const { getByText } = render(<Forgotpassword />);
        const continueButton = getByText("Continue");
        
        fireEvent.press(continueButton);

        expect(continueButton).toBeTruthy();
    });
});
