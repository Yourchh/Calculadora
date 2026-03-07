import { render } from "@testing-library/react-native";
import { expect, test, vi } from "vitest";
import Index from "../app/(tabs)/index";

// Mock de expo-router para evitar errores de navegación
vi.mock("expo-router", () => ({
  Stack: { Screen: () => null },
  Tabs: { Screen: () => null },
  useRouter: () => ({ push: vi.fn() }),
  useLocalSearchParams: () => ({}),
}));

// Mock de expo-font para evitar errores de carga de fuentes
vi.mock("expo-font", () => ({
  useFonts: () => [true, null],
  isLoaded: () => true,
}));

test("verifica que la calculadora renderiza sin errores", () => {
  // Renderizamos el componente principal
  const { toJSON } = render(<Index />);

  // Una prueba básica de que el componente no es nulo
  expect(toJSON).toBeDefined();
});
