module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'max-len': ['error', 150],
    'indent': ['error', 2],
    'valid-jsdoc': ['off'],
    'require-jsdoc': ['off'],
    'object-curly-spacing': ['error', 'always'],
    'no-unused-vars': ['off'],
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};
