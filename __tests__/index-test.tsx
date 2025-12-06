import { render } from "@testing-library/react-native";

import Loading /*, { screenOptions }*/ from "../app/index";

describe("<Loading />", () => {
  test("text renders correctly on HomeScreen", () => {
    const { getByText } = render(<Loading />);
  });
});
