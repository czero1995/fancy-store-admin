module.exports = {
  presets: [['@vue/app', { decoratorsLegacy: true }]],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
}
