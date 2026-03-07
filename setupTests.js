import "@testing-library/jest-dom";
import { vi } from "vitest";

globalThis.vi = vi;

vi.mock("expo-font", () => ({
  useFonts: () => [true, null],
  isLoaded: () => true,
}));

vi.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
