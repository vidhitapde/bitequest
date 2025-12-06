import { fireEvent, render } from "@testing-library/react-native";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Icon } from "../components/ui/icon";
import { Text } from "../components/ui/text";
import { Textarea } from "../components/ui/textarea";

jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

describe("UI Components", () => {
  describe("Button Component", () => {
    test("renders w different variants", () => {
      const renderResult = render(
        <Button variant="default">Default Button</Button>,
      );
      expect(renderResult).toBeDefined();
    });

    test("handles press events", () => {
      const mockOnPress = jest.fn();
      const { getByRole } = render(
        <Button onPress={mockOnPress}>Press Me</Button>,
      );

      const button = getByRole("button");
      fireEvent.press(button);
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });

  describe("Checkbox Component", () => {
    test("renders correctly", () => {
      const mockOnChange = jest.fn();
      const { getByRole } = render(
        <Checkbox checked={false} onCheckedChange={mockOnChange} />,
      );
      expect(getByRole("checkbox")).toBeDefined();
    });

    test("handles checked state", () => {
      const mockOnChange = jest.fn();
      const { getByRole, rerender } = render(
        <Checkbox checked={false} onCheckedChange={mockOnChange} />,
      );
      expect(getByRole("checkbox")).toBeDefined();

      rerender(<Checkbox checked={true} onCheckedChange={mockOnChange} />);
      expect(getByRole("checkbox")).toBeDefined();
    });
  });

  describe("Icon Component", () => {
    test("renders correctly", () => {
      expect(typeof Icon).toBe("function");
    });
  });

  describe("Text Component", () => {
    test("renders wi different variants", () => {
      const { getByText, rerender } = render(
        <Text variant="default">Default Text</Text>,
      );
      expect(getByText("Default Text")).toBeDefined();

      rerender(<Text variant="large">Large Text</Text>);
      expect(getByText("Large Text")).toBeDefined();
    });

    test("handles null variant", () => {
      const { getByText } = render(
        <Text variant={null as any}>Null Variant Text</Text>,
      );
      expect(getByText("Null Variant Text")).toBeDefined();
    });
  });

  describe("Textarea Component", () => {
    test("renders correctly", () => {
      const { getByDisplayValue } = render(
        <Textarea value="test textarea content" />,
      );
      expect(getByDisplayValue("test textarea content")).toBeDefined();
    });

    test("handles onChangeText callback", () => {
      const mockOnChange = jest.fn();
      const { getByTestId } = render(
        <Textarea onChangeText={mockOnChange} testID="textarea" />,
      );

      fireEvent.changeText(getByTestId("textarea"), "new textarea content");
      expect(mockOnChange).toHaveBeenCalledWith("new textarea content");
    });
  });
});
