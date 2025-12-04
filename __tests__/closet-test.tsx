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

    test("Rug image renders correctly on Closet screen", () => {
        const { getByTestId } = render(<Closet />);
        expect(getByTestId("rug-image")).toBeTruthy();
    });

    test("Hair image renders correctly on Closet screen", () => {
        const { getByTestId } = render(<Closet />);
        expect(getByTestId("hair-image")).toBeTruthy();
    });
    test("Shirt image renders correctly on Closet screen", () => {
        const { getByTestId } = render(<Closet />);
        expect(getByTestId("shirt-image")).toBeTruthy();
    });
    test("Pants image renders correctly on Closet screen", () => {
        const { getByTestId } = render(<Closet />);
        expect(getByTestId("pants-image")).toBeTruthy();
    });
   
    
});
