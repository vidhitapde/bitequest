module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(expo|@expo|react-native|@react-native|nativewind|expo-modules-core|expo-font|expo-asset|expo-constants)/)'
  ],
  moduleNameMapper: {
    '^.+\\.(png|jpg|jpeg|svg)$': '<rootDir>/__mocks__/styleMock.ts',
    '^@/(.*)$': '<rootDir>/$1',
    '^expo$': '<rootDir>/__mocks__/expo.js',
    '^expo-router$': '<rootDir>/__mocks__/expo-router.js',
      '^.+\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.ts',
      '^expo/src/winter/.*$': '<rootDir>/__mocks__/expo-winter.js',
    '^expo-font$': '<rootDir>/__mocks__/expo-font.js',
    '^.+\\.(ttf|otf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
    '^\\./Themed$': '<rootDir>/__mocks__/@/components/Themed.tsx',
  },
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
};
