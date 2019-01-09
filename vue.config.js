module.exports = {
  productionSourceMap: process.env.VUE_APP_SOURCE_MAP !== 'off',
  css: {
    loaderOptions: {
      // nib document http://stylus.github.io/nib/
      stylus: {
        use: [require('nib')()],
        import: ['~nib/lib/nib/index.styl']
      }
    }
  }
}
