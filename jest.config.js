module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(expo|@expo(?!/vector-icons)|react-native|@react-native|nativewind|expo-modules-core|expo-font|expo-asset|expo-constants|@rn-primitives|react-native-css-interop|expo-image-picker|firebase|@firebase)/)'
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
    '^firebase/auth$': '<rootDir>/__mocks__/firebase.js',
    '^firebase/app$': '<rootDir>/__mocks__/firebase.js',
    '^firebase/firestore$': '<rootDir>/__mocks__/firebase.js',
    '^firebase/storage$': '<rootDir>/__mocks__/firebase.js',
    '^firebase$': '<rootDir>/__mocks__/firebase.js',
    '^./firebaseConfig$': '<rootDir>/__mocks__/firebase.js',
    '^../firebaseConfig$': '<rootDir>/__mocks__/firebase.js',
    '^@react-native-async-storage/async-storage$': '<rootDir>/__mocks__/@react-native-async-storage.js',
    '^@expo/vector-icons$': '<rootDir>/__mocks__/@expo/vector-icons.js',
    '^@expo/vector-icons/(.*)$': '<rootDir>/__mocks__/@expo/vector-icons.js',
    '^(.*/)?appprovider$': '<rootDir>/__mocks__/appprovider.js',
    '^\\./appprovider$': '<rootDir>/__mocks__/appprovider.js',
    '^../../../app/appprovider$': '<rootDir>/__mocks__/appprovider.js',
    '^expo-haptics$': '<rootDir>/__mocks__/expo-haptics.js',
    '^expo-image-picker$': '<rootDir>/__mocks__/expo-image-picker.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '__tests__',
    '__mocks__'
  ],
  coverageReporters: [
    'json-summary',
    'text-summary',
    'text',
  ]
};
