module.exports = {
  testEnvironment: 'node',
  transform: {
    '\\.[jt].s?$': '@swc/jest'
  },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
};