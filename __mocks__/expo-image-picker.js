// Mock for expo-image-picker
const mockImagePicker = {
  MediaTypeOptions: {
    All: 'All',
    Videos: 'Videos',
    Images: 'Images'
  },
  
  launchImageLibraryAsync: jest.fn(() => 
    Promise.resolve({
      cancelled: false,
      assets: [{
        uri: 'mock-image-uri',
        width: 100,
        height: 100,
        type: 'image'
      }]
    })
  ),
  
  launchCameraAsync: jest.fn(() => 
    Promise.resolve({
      cancelled: false,
      assets: [{
        uri: 'mock-camera-uri',
        width: 100,
        height: 100,
        type: 'image'
      }]
    })
  ),
  
  requestMediaLibraryPermissionsAsync: jest.fn(() => 
    Promise.resolve({ status: 'granted' })
  ),
  
  requestCameraPermissionsAsync: jest.fn(() => 
    Promise.resolve({ status: 'granted' })
  )
};

export const MediaTypeOptions = mockImagePicker.MediaTypeOptions;
export const launchImageLibraryAsync = mockImagePicker.launchImageLibraryAsync;
export const launchCameraAsync = mockImagePicker.launchCameraAsync;
export const requestMediaLibraryPermissionsAsync = mockImagePicker.requestMediaLibraryPermissionsAsync;
export const requestCameraPermissionsAsync = mockImagePicker.requestCameraPermissionsAsync;

export default mockImagePicker;
