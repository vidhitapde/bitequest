import { useColorScheme } from "../components/useColorScheme.web";

describe("useColorScheme (web)", () => {
  test("always returns light theme", () => {
    const colorScheme = useColorScheme();
    expect(colorScheme).toBe("light");
  });

  test("returns consistent value on multiple calls", () => {
    const firstCall = useColorScheme();
    const secondCall = useColorScheme();

    expect(firstCall).toBe(secondCall);
    expect(firstCall).toBe("light");
    expect(secondCall).toBe("light");
  });

  test("function is defined and callable", () => {
    expect(typeof useColorScheme).toBe("function");
    expect(() => useColorScheme()).not.toThrow();
  });
});
