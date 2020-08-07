module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 0
    }),
    require('autoprefixer')({
      'flexbox': 'no-2009'
    }),
    require('postcss-media-minmax')()
  ]
}