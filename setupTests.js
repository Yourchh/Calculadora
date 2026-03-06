import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Cambiamos global por globalThis para cumplir con SonarQube
globalThis.vi = vi;

// Mock de fuentes de Expo para evitar errores de carga
vi.mock('expo-font', () => ({
  useFonts: () => [true, null],
  isLoaded: () => true,
}));