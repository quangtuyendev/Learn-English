module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      semi: 1,
      qoutes: ['single', 1]
    },
    env: {
      es6: true,
      browser: true,
      node: true,
    },
  };
  