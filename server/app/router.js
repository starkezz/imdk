'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 通用接口
  router.post('/data/:key/:active', controller.common.actives);
  router.get('/data/:key/:active', controller.common.actives);
  router.put('/data/:key/:active', controller.common.actives);
  router.delete('/data/:key/:active', controller.common.actives);
};
