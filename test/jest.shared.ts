export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '..',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@authModule/(.*)$': '<rootDir>/src/modules/auth/$1',
    '^@expenseModule/(.*)$': '<rootDir>/src/modules/expenses/$1',
    '^@groupModule/(.*)$': '<rootDir>/src/modules/groups/$1',
    '^@userModule/(.*)$': '<rootDir>/src/modules/users/$1',
    '^@sharedLibs/(.*)$': '<rootDir>/src/shared/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@database/(.*)$': '<rootDir>/shared/database/$1',
    '^@testInfra/(.*)$': '<rootDir>/test/$1',
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/test/test.setup.ts'],
  verbose: true,
  resetMocks: true,
};
