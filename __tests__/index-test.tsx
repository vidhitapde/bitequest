import { render } from "@testing-library/react-native";

import Loading /*, { screenOptions }*/ from "../app/index.tsx";

describe("<Loading />", () => {
    test("Text renders correctly on HomeScreen", () => {
        const { getByText } = render(<Loading />);
    });
});