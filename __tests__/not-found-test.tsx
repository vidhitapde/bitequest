import { render } from "@testing-library/react-native";
import NotFoundScreen from "../app/+not-found";

jest.mock("expo-router", () => ({
  Link: ({ children, ...props }: any) => children,
  Stack: {
    Screen: ({ options }: any) => null,
  },
}));

describe("<NotFoundScreen />", () => {
  test("renders correctly", () => {
    const renderResult = render(<NotFoundScreen />);
    expect(renderResult).toBeDefined();
  });

  test("renders without errors", () => {
    const renderResult = render(<NotFoundScreen />);
    expect(renderResult).toBeDefined();
  });
});
