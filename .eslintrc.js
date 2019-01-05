module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV !== 'production' ? 'off' : 'error',
    'no-debugger': process.env.NODE_ENV !== 'production' ? 'off' : 'error',
    'vue/multiline-html-element-content-newline': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': 'warning',
    'vue/script-indent': 'error',
    'vue/attributes-order': 'error',
    'vue/html-indent': 'error',
    'vue/attribute-hyphenation': 'error',
    'vue/html-closing-bracket-spacing': 'error',
    'vue/max-attributes-per-line': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
