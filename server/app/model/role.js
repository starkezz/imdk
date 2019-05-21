/**
 * 角色
 */
module.exports = app => {
    const { STRING, TEXT, DATE, INTEGER } = app.Sequelize;
    const Role = app.model.define('role', {
        name: {
            type: STRING(64),
            comment: "角色名称",
            defaultValue: ""
        },
        memo: {
            type: TEXT,
            comment: "简介",
            defaultValue: ""
        },
        extra: {
            type: TEXT,
            comment: "扩展",
            defaultValue: ""
        }
    }, {
            // 用于删除里增加删除时间标识
            paranoid: true,
        })

    // }
    /**
     * 处理表的关联关系
     */
    Role.associate = function () {
        Role.belongsTo(app.model.User, {
            foreignKey: "creater_id",
            as: "creater",
            constraints: false
        });
    }
    Role.beforeAdd = async function (ctx, inData) {
        inData.creater_id = ctx.user.id;
        return inData;
    }
    /**
     * 列表查询条件
     * @param {*} query 
     */
    Role.listCondition = async function (ctx) {
        let query = this.ctx.query;
        var obj = {
            attributes: {
                exclude: ['created_at', 'updated_at']
            }
        }
        return obj;
    }

    return Role;
}