// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
//import '@testing-library/jest-dom';


// setupTests.js
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

// Suprimir advertencias específicas
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (
    !args[0].includes('onAfterSetupMiddleware') && 
    !args[0].includes('onBeforeSetupMiddleware')
  ) {
    originalConsoleWarn(...args);
  }
};