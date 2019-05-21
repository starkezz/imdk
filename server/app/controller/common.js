const Controller = require('egg').Controller;

class CommonController extends Controller {
  async actives() {
    const { ctx } = this;
    try {
      var {key,active} = ctx.params;
      // active如：list，加上方法前缀变为 get_list
      active = `${ctx.request.method.toLocaleLowerCase()}_${active}`;
      // 判断service中是否有符合规范的函数
      if ( ctx.service[key] && ctx.service[key][active] ){
        var dat = await ctx.service[key][active](ctx.query,ctx.body);
        await ctx.service.common.s(dat);
        return;
      }
      // 调用通用的函数
      if ( !ctx.service.common[active] ){
        return;
      }
      // 取model
      var m = ctx.service.common.getModel(ctx);
      if ( !m ){
        return;
      }
      // 调用service
      var dat = await ctx.service.common[active](m, ctx.query, ctx.request.body);
      await ctx.service.common.s(dat);
    } catch (error) {
      ctx.service.common.e(error.toString());
    }
  }
}

module.exports = CommonController;
