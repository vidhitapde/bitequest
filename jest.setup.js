// Silence Expo Router "winter" runtime errors during tests
jest.mock('expo-router', () => ({
  Link: () => null,
  Stack: () => null,
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
  useSegments: () => [],
}));

// Mock internal Expo Router modules causing Jest import issues
jest.mock('expo/src/winter/runtime.native', () => ({}));
jest.mock('expo/src/winter/installGlobal', () => ({
  __ExpoImportMetaRegistry: {},
}));
