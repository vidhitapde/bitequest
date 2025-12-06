import { fireEvent, render } from "@testing-library/react-native";
import Welcome from "../app/welcome";
const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("<Welcome />", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  test("text renders correctly on Welcome screen", () => {
    const { getByText } = render(<Welcome />);
    expect(getByText("Welcome!")).toBeTruthy();
  });

  test("navigates to Sign Up screen on button press", () => {
    const { getByText } = render(<Welcome />);
    const signUpButton = getByText("Sign Up");

    fireEvent.press(signUpButton);

    expect(mockPush).toHaveBeenCalledWith("/signup");
  });

  test("navigates to Login screen on button press", () => {
    const { getByText } = render(<Welcome />);
    const loginButton = getByText("Login");

    fireEvent.press(loginButton);

    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
