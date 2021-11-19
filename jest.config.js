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
