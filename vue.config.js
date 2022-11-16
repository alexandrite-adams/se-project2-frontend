module.exports = {
  devServer: {
    host: 'localhost',
  },
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/project2/2022/t2',
  transpileDependencies: ['vuetify'],
};