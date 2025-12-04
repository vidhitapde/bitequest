// Mock of expo-font's useFonts and Font
const Font = {
  isLoaded: jest.fn(() => true),
  isLoading: jest.fn(() => false),
  loadAsync: jest.fn(() => Promise.resolve()),
  processFontFamily: jest.fn((name) => name),
};

module.exports = {
  useFonts: (fonts) => {
    // Return [loaded, error]
    return [true, null];
  },
  Font,
};
