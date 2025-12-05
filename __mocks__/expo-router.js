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

const setMockPush = (fn) => {
  mockPush = fn;
  mockRouter.push = fn;
};

const Tabs = ({ children }) => children;
Tabs.Screen = ({ children }) => children;
Tabs.Screen.displayName = "Tabs.Screen";
Tabs.displayName = "Tabs";

const Stack = ({ children }) => children;
Stack.Screen = ({ children }) => children;
Stack.Screen.displayName = "Stack.Screen";
Stack.displayName = "Stack";

module.exports = {
  Tabs,
  Stack,
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