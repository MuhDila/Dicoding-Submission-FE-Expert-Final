// Polyfill for structuredClone in Node.js environment
global.structuredClone = (value) => {
  return JSON.parse(JSON.stringify(value));
};
