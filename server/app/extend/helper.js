const tools = require('./inner/sufm')
module.exports = {
    tools:tools,
    async findAndCount(ctx,sql){
        var c = await ctx.model.query(`select count(*) as c from (${sql}) findAndCounttabtmp `);
        var d = await ctx.model.query(`select * from (${sql}) ${ctx.query.pageSize ? ` findAndCounttabtmp limit ${parseInt(ctx.query.pageIndex * ctx.query.pageSize)},${parseInt(ctx.query.pageSize)}` : ""}`);
        return {total:c[0][0].c,data:d[0]}
    },
    // 移除指定属性
    remove(dat, keys) {
        if (!(keys instanceof Array)) {
            keys = [keys];
        }
        if (dat instanceof Array) {
            dat.map(function (it) {
                this.remove(it, keys);
            })
        } else if (dat instanceof Object) {
            for (let a in dat) {
                if (keys.indexOf(a) != -1) {
                    delete dat[a];
                    continue;
                }
                this.remove(dat[a], keys);
            }
        }
        return dat;
    },
    // 克隆对象
    clone(obj) {
        try {
            return JSON.parse(JSON.stringify(obj));
        } catch (error) {
            console.log(error)
            return obj;
        }
    }
}