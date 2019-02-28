const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  devServer: {
    publicPath: process.env.VUE_APP_API || '/',
  },
  productionSourceMap: process.env.VUE_APP_SOURCE_MAP !== 'off',
  css: {
    loaderOptions: {
      // nib document http://stylus.github.io/nib/
      stylus: {
        use: [require('nib')()],
        import: ['~nib/lib/nib/index.styl']
      }
    }
  },
  chainWebpack: config => {
    // Set svg & icon
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // Image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude.add(resolve('src/assets/svg-icons/icons'))
      .end()

    // Allow use __dirname, __filename etc.
    config.node.set('__dirname', true).set('__filename', true)
  }
}
