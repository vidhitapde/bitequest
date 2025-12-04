// Mock for @expo/vector-icons
const React = require('react');

// Simple mock icon component
const MockIcon = (props) => {
  return React.createElement('Text', { 
    ...props, 
    testID: props.testID || 'mock-icon' 
  }, props.name || 'icon');
};

// Export the same mock for all icon sets
module.exports = new Proxy({}, {
  get: function(target, prop) {
    return MockIcon;
  }
});
