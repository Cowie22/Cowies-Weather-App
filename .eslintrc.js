module.exports = {
  extends: '@gonimbly',
  "env": {
    "browser": true,
    "node": true,
  },
  "plugins": [
    "react",
  ],
  "rules": {
    "react/prop-types": 0,
    "react/destructuring-assignment": 0,
    "no-console": "off",
  }
};