const React = require('react');

const MockIcon = (props) => {
  return React.createElement('Text', { 
    ...props, 
    testID: props.testID || 'mock-icon' 
  }, props.name || 'icon');
};

module.exports = new Proxy({}, {
  get: function(target, prop) {
    return MockIcon;
  }
});
