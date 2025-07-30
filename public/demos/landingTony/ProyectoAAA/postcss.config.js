module.exports = {
    plugins: [
      require('postcss-import')(),
      require('postcss-nesting'),
      require('postcss-custom-properties'),
      require('cssnano')({
        preset: 'default',
      }),
    ],
  };