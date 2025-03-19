module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
  },
  overrides: [
    {
      files: [
        '*.js',
        '*.jsx',
        '*.mjs',
        'vite.config.js',
        'vite.config.mjs',
        'tailwind.config.js',
        'postcss.config.js',
      ],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
};
