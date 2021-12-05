module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true,
      diagnostics: false,
    },
  },
  moduleNameMapper: {
    '^(src)/(.*)$': '<rootDir>/$1/$2',
    '^@decorator/(.*)$': '<rootDir>/src/decorator/$1',
    '^@logger/(.*)$': '<rootDir>/src/logger/$1',
    '^@script/(.*)$': '<rootDir>/src/script/$1',
    '^@orm/(.*)$': '<rootDir>/src/orm/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
  },
  roots: [
    '<rootDir>/src',
  ],
  testEnvironment: 'node',
  collectCoverage: false,
  coverageThreshold: {
    global: { lines: 90 },
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  transform: {
    '.js$': 'babel-jest',
    '.ts$': 'ts-jest',
  },
};
