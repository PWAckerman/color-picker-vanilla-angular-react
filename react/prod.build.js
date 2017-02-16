const webpack = require('webpack');
const webpackConfig = require('./webpack.production.config.js');
const colors = require('colors');

process.env.NODE_ENV = 'production';

const compiler = webpack(webpackConfig)

compiler.run((err,stats) => {
  if(err){
    console.log(err.bold.red)
    return 1
  }

  const jsonStats = stats.toJson();

  if(jsonStats.hasErrors){
    return jsonStats.errors.map(error => console.log(error.red))
  }

  if(jsonStats.hasWarnings){
    console.log('webpack generated the following warnings: '.bold.yellow)
    jsonStats.warnings.map(warning => console.log(warning.yellow))
  }

  console.log(`webpack stats: ${stats}`);

  console.log('Compiled'.green)

  return 0;

})
