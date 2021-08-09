module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    semi: [2, 'never'], // 不使用分号
    'no-console': 0, // 允许使用console
    'no-unused-vars': 1, // 未使用的变量 警告
    'global-require': 0,
    'consistent-return': 0,
    'prefer-promise-reject-errors': 0,
    'no-restricted-syntax': 1,
    'no-await-in-loop': 0,
    'no-underscore-dangle': 0,
  },
}
