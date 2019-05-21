const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.body = 'add';
  }
  async logout() {
    const { ctx } = this;
    ctx.body = 'del';
  }
}

module.exports = UserController;
