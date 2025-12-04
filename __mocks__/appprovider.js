// Mock for appprovider used in tests
const mockUser = {
  uid: 'test-user-uid',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: null,
  emailVerified: false
};

const mockSetUser = jest.fn();

module.exports = {
  useUser: jest.fn(() => ({
    user: mockUser,
    setUser: mockSetUser,
  })),
  mockUser,
  mockSetUser,
};
