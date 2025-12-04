// Minimal mock for expo-router used in tests
module.exports = {
  Link: () => null,
  Stack: () => null,
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
  useSegments: () => [],
};
