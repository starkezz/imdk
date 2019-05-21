const Service = require('egg').Service;
module.exports = class Common extends Service {
    // 获取model
    getModel(ctx) {
        var s = ctx.params.key.substr(0, 1).toUpperCase() + ctx.params.key.substr(1);
        return serodel[s];
    }
    // 添加记录
    async post_add(model, query, body) {
        const { ctx } = this;
        var ser = ctx.service[model.name];
        if (ser && ser.beforeAdd instanceof Function) {
            body = (await ser.beforeAdd.apply(ser, [query, body])) || body
        }
        if (body instanceof Array) {
            d = await model.bulkCreate(body);
        } else {
            d = await model.create(body);
        }
        if (ser && ser.afterAdd instanceof Function) {
            d = (await ser.afterAdd.apply(this, [query, d])) || d;
        }
        return d;
    }
    // 删除记录
    async delete_del(model, query, body) {
        const { ctx } = this;
        var ser = ctx.service[model.name];
        let condition = { where: { "id": body.id } }
        if (ser && ser.delCondition instanceof Function) {
            condition = (await ser.delCondition.apply(ser, [query, condition])) || condition;
        }
        let d = await model.destroy(condition);
        if (ser && ser.afterDel instanceof Function) {
            d = (await ser.afterDel.apply(this, [query, d])) || d;
        }
    }
    // 更新记录
    async put_edit(model, query, body) {
        const { ctx } = this;
        var ser = ctx.service[model.name];
        // 删除编辑传入数据的 默认时间 
        if (ser && ser.beforeEdit instanceof Function) {
            body = (await ser.beforeEdit.apply(this, [query, body])) || body
        }
        // 插入更新前数据
        var d = await model.update(body, { where: { "id": body.id } });
        // 插入更新后数据
        if (ser && ser.afterEdit instanceof Function) {
            d = (await ser.afterEdit.apply(this, [query, d])) || d;
        }
        return d;
    }
    // 获取列表
    async get_list(model, query, body) {
        // 判断model里是否有条件
        var ser = ctx.service[model.name];
        var condition = { order: [['created_at']] };
        if (ser && ser.listCondition instanceof Function) {
            condition = (await ser.listCondition.apply(ser, [query, condition])) || condition;
        }
        // 处理pages
        // if (ctx.pages) {
        //     for (let a in ctx.pages) {
        //         condition[a] = ctx.pages[a];
        //     }
        // }
        let data = await model.findAndCountAll(condition);
        //返回前数据处理
        if (ser && ser.afterList instanceof Function) {
            data = (await ser.afterList.apply(ser, [query, JSON.parse(JSON.stringify(data))])) || data;
        }
        return { total: data.count, data: data.rows };
    }
    // 获取详情
    async get_detail(model, query, body) {
        const { ctx } = this;
        var ser = ctx.service[model.name];
        let condition = { where: { "id": ctx.query.id } };
        if (ser && ser.detailCondition instanceof Function) {
            condition = (await ser.detailCondition.apply(ser, [condition])) || condition;
        }
        condition.require = condition.require || false;
        var d = await model.findOne(condition);
        if (ser.afterDetail instanceof Function) {
            d = (await ser.afterDetail.apply(ser, [ctx.helper.clone(d)])) || d;
        }
        return d;
    }
    async s(dat) {
        const { ctx } = this;
        ctx.body = ({ data: dat });
    }
    async e(dat, code) {
        const { ctx } = this;
        ctx.body = ({ err: dat, code: code });
    }
}