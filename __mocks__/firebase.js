// In-memory store for created users
const userStore = new Map();

// Mock Firebase Auth with realistic behavior
const createMockUser = (email, displayName = null) => ({
  uid: `uid-${Math.random().toString(36).substr(2, 9)}`,
  email,
  displayName,
  photoURL: null,
  emailVerified: false,
});

const mockAuth = {
  _currentUser: null,
  get currentUser() {
    return this._currentUser;
  },
  set currentUser(user) {
    this._currentUser = user;
  },
  signInWithEmailAndPassword: jest.fn((auth, email, password) => {
    const userKey = `${email}:${password}`;
    if (userStore.has(userKey)) {
      const userData = userStore.get(userKey);
      return Promise.resolve({ user: userData.user });
    }
    const error = new Error('Firebase: Error (auth/user-not-found).');
    error.code = 'auth/user-not-found';
    return Promise.reject(error);
  }),
  createUserWithEmailAndPassword: jest.fn((auth, email, password) => {
        if (!email || email.trim() === '') {
      const error = new Error('Firebase: Error (auth/missing-email).');
      error.code = 'auth/missing-email';
      return Promise.reject(error);
    }
    
    // Check for missing password
    if (!password || password.trim() === '') {
      const error = new Error('Firebase: Error (auth/missing-password).');
      error.code = 'auth/missing-password';
      return Promise.reject(error);
    }
    
    // Check for  password less than 6 characters
    if (password.length < 6) {
      const error = new Error('Firebase: Password should be at least 6 characters (auth/weak-password).');
      error.code = 'auth/weak-password';
      return Promise.reject(error);
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      const error = new Error('Firebase: The email address is badly formatted (auth/invalid-email).');
      error.code = 'auth/invalid-email';
      return Promise.reject(error);
    }
    
    const user = createMockUser(email);
    const userKey = `${email}:${password}`;
    userStore.set(userKey, { user, password });
    return Promise.resolve({ user });
  }),
  signOut: jest.fn(() => {
    mockAuth._currentUser = null;
    return Promise.resolve();
  }),
  onAuthStateChanged: jest.fn((callback) => {
    callback(null);
    return jest.fn(); // unsubscribe function
  }),
  updateProfile: jest.fn(() => Promise.resolve()),
};

// Mock Firestore
const mockFirestore = {
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      set: jest.fn(() => Promise.resolve()),
      get: jest.fn(() => Promise.resolve({ exists: true, data: () => ({}) })),
      update: jest.fn(() => Promise.resolve()),
      delete: jest.fn(() => Promise.resolve()),
    })),
    add: jest.fn(() => Promise.resolve({ id: 'mock-doc-id' })),
    where: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({ docs: [] })),
    })),
  })),
};

// Firebase Auth exports
export const createUserWithEmailAndPassword = mockAuth.createUserWithEmailAndPassword;
export const signInWithEmailAndPassword = mockAuth.signInWithEmailAndPassword;
export const signOut = mockAuth.signOut;
export const onAuthStateChanged = mockAuth.onAuthStateChanged;
export const updateProfile = mockAuth.updateProfile;
export const sendPasswordResetEmail = jest.fn(() => Promise.resolve());

// Firebase App exports
export const initializeApp = jest.fn(() => ({ name: 'mock-app' }));
export const getAuth = jest.fn(() => mockAuth);

// Firebase Firestore exports
export const getFirestore = jest.fn(() => mockFirestore);
export const getReactNativePersistence = jest.fn();
export const initializeAuth = jest.fn(() => mockAuth);
export const doc = jest.fn(() => ({
  id: 'mock-doc-id',
  set: jest.fn(() => Promise.resolve()),
  get: jest.fn(() => Promise.resolve({ exists: true, data: () => ({}) })),
  update: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),
}));
export const collection = jest.fn(() => ({
  doc: doc,
  add: jest.fn(() => Promise.resolve({ id: 'mock-doc-id' })),
  where: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({ docs: [] })),
  })),
}));
export const getDoc = jest.fn(() => Promise.resolve({ 
  exists: () => true, 
  data: () => ({ 
    name: 'Test User',
    profile: { displayName: 'Test User' },
    inventory: ['default-hair', 'default-shirt', 'default-pants', 'default-rug']
  }) 
}));

export const setDoc = jest.fn(() => Promise.resolve());
export const addDoc = jest.fn(() => Promise.resolve({ id: 'mock-review-id' }));
export const getDocs = jest.fn(() => Promise.resolve({
  docs: []
}));
export const where = jest.fn(() => ({}));
export const query = jest.fn(() => ({}));

// Firebase Storage mock
export const getStorage = jest.fn(() => ({
  ref: jest.fn(() => ({
    put: jest.fn(() => Promise.resolve({
      ref: {
        getDownloadURL: jest.fn(() => Promise.resolve('https://example.com/test-image.jpg'))
      }
    })),
    getDownloadURL: jest.fn(() => Promise.resolve('https://example.com/test-image.jpg'))
  }))
}));

// Firebase exports
export const FB_AUTH = mockAuth;
export const FB_DB = mockFirestore;
export const FB_APP = { name: 'mock-app' };
export const GOOGLE = 'mock-google-api-key';
export const FB_STORAGE = {
  ref: jest.fn(() => ({
    put: jest.fn(() => Promise.resolve({
      ref: {
        getDownloadURL: jest.fn(() => Promise.resolve('https://example.com/test-image.jpg'))
      }
    })),
    getDownloadURL: jest.fn(() => Promise.resolve('https://example.com/test-image.jpg'))
  }))
};

// Default export
export default {
  auth: () => mockAuth,
  firestore: () => mockFirestore,
  initializeApp,
};
