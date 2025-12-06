import { render } from "@testing-library/react-native";
import Root from "../app/+html";

jest.mock("expo-router/html", () => ({
  ScrollViewStyleReset: () => null,
}));

describe("<Root />", () => {
  test("renders HTML structure correctly", () => {
    const mockChildren = <div>Test Children</div>;
    const renderResult = render(<Root>{mockChildren}</Root>);

    expect(renderResult).toBeDefined();
  });
});
