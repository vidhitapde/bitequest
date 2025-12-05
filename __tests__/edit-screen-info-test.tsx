import { render } from "@testing-library/react-native";
import EditScreenInfo from "../components/EditScreenInfo";


describe("<EditScreenInfo />", () => {
  const testPath = "app/test.tsx";

  test("renders correctly with provided path", () => {
    const renderResult = render(<EditScreenInfo path={testPath} />);
    expect(renderResult).toBeDefined();
  });
  
});
