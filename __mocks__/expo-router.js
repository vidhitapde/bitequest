// Mock for expo-router used in tests
let mockPush = jest.fn();
let mockReplace = jest.fn();
let mockBack = jest.fn();

const mockRouter = {
  push: mockPush,
  replace: mockReplace,
  back: mockBack,
  canGoBack: jest.fn(() => true),
};

// Allow tests to access and override the mock functions
const setMockPush = (fn) => {
  mockPush = fn;
  mockRouter.push = fn;
};

module.exports = {
  useRouter: () => mockRouter,
  router: mockRouter,
  Link: ({ children }) => children,
  Stack: () => null,
  useLocalSearchParams: () => ({}),
  useGlobalSearchParams: () => ({}),
  usePathname: () => '/review',
  useSegments: () => ['review'],
  mockPush,
  mockReplace,
  mockBack,
  setMockPush,
};
