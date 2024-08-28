module.exports = {
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.js$': 'babel-jest'
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    testMatch: [
      '**/tests/unit/**/*.spec.[jt]s?(x)',
      '**/__tests__/*.[jt]s?(x)'
    ],
    testEnvironment: 'jsdom'
  }