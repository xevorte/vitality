module.exports = {
  root: true,
  extends: ['universe/native', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  globals: {
    __dirname: 'readonly',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'import/order': 'off',
    // 'no-console': 'warn',
    'no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-sort-props': 'error',
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Custom grouping: https://github.com/lydell/eslint-plugin-simple-import-sort#custom-grouping
          // Side effect imports.
          ['^\\u0000'],
          // Node.js builtins prefixed with `node:`.
          ['^node:'],
          // `react` related packages.
          ['^react', '^expo', '^@expo'],
          // Packages
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Path alias internal dependencies.
          ['^@/?\\w'],
          // Anything not matched in another group.
          ['^'],
          // Relative imports. Anything that starts with a dot.
          ['^\\.'],
        ],
      },
    ],
    'no-console': ['error', {allow: ['tron']}],
    'simple-import-sort/exports': 'error',
  },
};
