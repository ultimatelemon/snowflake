/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/tests/**/*.[jt]s?(x)']
};
