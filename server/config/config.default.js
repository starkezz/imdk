/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config =exports= {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555650330107_4638';

  // add your middleware config here
  config.middleware = [];
  exports.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'sx_dev',
    host: '39.96.91.191',
    port: '3306',
    username: 'mysql',
    password: 'HHwy2012',
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
