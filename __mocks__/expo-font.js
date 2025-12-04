// Mock of expo-font's useFonts
module.exports = {
  useFonts: (fonts) => {
    // Return [loaded, error]
    return [true, null];
  },
};
