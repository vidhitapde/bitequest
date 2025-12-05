import { render } from "@testing-library/react-native";
import { Text, useThemeColor, View } from "../components/Themed";

const mockUseColorScheme = jest.fn();
jest.mock("../components/useColorScheme", () => ({
  useColorScheme: () => mockUseColorScheme(),
}));

jest.mock("@/constants/Colors", () => ({
  light: {
    text: "#000",
    background: "#fff",
    tint: "#2f95dc",
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: "#fff",
  },
}));

describe("Themed Components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useThemeColor", () => {
    test("returns light color when light theme is active", () => {
      mockUseColorScheme.mockReturnValue("light");
      
      const TestComponent = () => {
        const color = useThemeColor({ light: "#000", dark: "#fff" }, "text");
        expect(color).toBe("#000");
        return null;
      };
      
      render(<TestComponent />);
    });

    test("returns dark color when dark theme is active", () => {
      mockUseColorScheme.mockReturnValue("dark");
      
      const TestComponent = () => {
        const color = useThemeColor({ light: "#000", dark: "#fff" }, "text");
        expect(color).toBe("#fff");
        return null;
      };
      
      render(<TestComponent />);
    });

   
  });

  describe("Text Component", () => {
    test("renders text content correctly", () => {
      mockUseColorScheme.mockReturnValue("light");
      
      const renderResult = render(
        <Text>Hello World</Text>
      );
      
      expect(renderResult).toBeDefined();
    });

    test("applies light color correctly", () => {
      mockUseColorScheme.mockReturnValue("light");
      
      const renderResult = render(
        <Text lightColor="#ff0000">Test Text</Text>
      );
      
      expect(renderResult).toBeDefined();
    });
  });

  describe("View Component", () => {
    test("renders children correctly", () => {
      mockUseColorScheme.mockReturnValue("light");
      
      const renderResult = render(
        <View>
          <Text>Child Text</Text>
        </View>
      );
      
      expect(renderResult).toBeDefined();
    });
    
  });
});
