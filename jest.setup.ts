jest.mock('expo/src/winter/runtime.native', () => ({}));
jest.mock('expo/src/winter/installGlobal', () => ({}));


jest.mock('expo-router', () => ({
 Link: () => null,
 Stack: () => null,
 useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));
