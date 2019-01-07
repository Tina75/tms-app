module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    'gtag': true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/html-end-tags': 'error',
    'vue/html-self-closing': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/attributes-order': 'error',
    'vue/order-in-components': 'error',
    "space-before-function-paren": 'off',
    'vue/attribute-hyphenation': [
      'error',
      'always'
    ],
    'vue/html-indent': [
      'error',
      2
    ],
    'vue/html-quotes': [
      'error',
      'double'
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
