import { render } from "@testing-library/react-native";
import Index from "../app/(tabs)/index";

// Mock de expo-router
jest.mock("expo-router", () => ({
  Stack: { Screen: () => null },
  Tabs: { Screen: () => null },
  useRouter: () => ({ push: jest.fn() }),
  useLocalSearchParams: () => ({}),
}));

// Mock de expo-font
jest.mock("expo-font", () => ({
  useFonts: () => [true],
}));

describe("Calculadora", () => {
  test("renderiza sin errores", () => {
    const { toJSON } = render(<Index />);
    expect(toJSON()).toBeTruthy();
  });
});
