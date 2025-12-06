import { render } from "@testing-library/react-native";
import Closet from "../app/(tabs)/closet";
const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("<Closet />", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  test("rug image renders correctly on Closet screen", () => {
    const { getByTestId } = render(<Closet />);
    expect(getByTestId("rug-image")).toBeTruthy();
  });

  test("hair image renders correctly on Closet screen", () => {
    const { getByTestId } = render(<Closet />);
    expect(getByTestId("hair-image")).toBeTruthy();
  });

  test("shirt image renders correctly on Closet screen", () => {
    const { getByTestId } = render(<Closet />);
    expect(getByTestId("shirt-image")).toBeTruthy();
  });

  test("pants image renders correctly on Closet screen", () => {
    const { getByTestId } = render(<Closet />);
    expect(getByTestId("pants-image")).toBeTruthy();
  });
});
