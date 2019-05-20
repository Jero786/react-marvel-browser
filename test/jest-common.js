// common project configuration used by the other configs
const path = require('path')

module.exports = {
  rootDir: path.join(__dirname, '..'),
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, '../src'),
    'shared',
    __dirname,
  ],
  testPathIgnorePatterns: [],
  moduleNameMapper: {
    // module must come first
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.module\\.scss$': 'identity-obj-proxy',
    '\\.(scss|css)$': require.resolve('./style-mock.js'),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve('./fileMock.js'),
    // can also map files that are loaded by webpack with the file-loader
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects',
  ],
}
