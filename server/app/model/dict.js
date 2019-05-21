module.exports = app => {
    const { STRING, DATE, TEXT, INTEGER } = app.Sequelize;
    const Dict = app.model.define('dict', {
        type: STRING(64),
        key: STRING(256),
        value: STRING(1024),
        memo: STRING(1024),
        sort: INTEGER
    });
    Dict.listCondition = function (ctx, condition) {
        if (ctx.query.type) {
            condition.where = {
                type: {
                    $in: ctx.query.type.split(','),
                }
            }
        }
        condition.order = [
            ['type'],
            ['sort', 'ASC'],
            ['created_at', 'DESC']
        ];
        return condition;
    }
    Dict.afterList = async function (ctx, data) {
        let obj = {};
        let { type } = ctx.query;
        if (!type) {
            return {
                count: data.count,
                rows: data.rows
            }
        }
        let arr = type.split(',')
        arr.map(it => {
            obj[it] = [];
            data.rows.map(item => {
                if (item.type == it) {
                    obj[it].push(item);
                }
            })
        })
        return {
            count: data.count,
            rows: obj
        }
    }
    return Dict;
}