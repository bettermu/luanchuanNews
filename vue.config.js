// vue.config.js

const IP = [
  '10.4.185.239', // 吴露   0
  '10.4.185.15',    // 易川   1
  '10.4.185.9',   // 李明   2
  '10.4.185.241', // 李伟庆 3
  '10.4.185.14',  // 姜鹏   4
  'localhost',    // 本机   5
  '10.4.186.162'  // 测试   6
  
];

module.exports = {

  devServer: {
    proxy: {
      '/vr-rest': {
        target: `http://${IP[6]}:8079`,
        //target:'http://10.4.186.162:8078'
        //target: `http://${IP[0]}:8889`
        //target:'http://10.4.185.11:8888'
      }
    }
  },

  configureWebpack: {
    resolve: {
      //路径别名
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'styles': '@/styles'
      }
    }
  }

}