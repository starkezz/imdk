// 2019 1.21 用户表做逻辑删除，考滤人员不是很我，直接增加删除时间字段，查询时查删除时间为空的数据
module.exports = app => {
    const {
        STRING,
        DATE,
        TEXT,
        INTEGER,
        ENUM
    } = app.Sequelize;
    const User = app.model.define('user', {
        name: {
            type: STRING(256),
            comment: "名称"
        },
        phone: {
            type: STRING(32),
            comment: "电话"
        },
        email: {
            type: STRING(32),
            comment: "邮箱"
        },
        password: {
            type: STRING(32),
            commen: "密码",
            defaultValue: "e10adc3949ba59abbe56e057f20f883e"
        },
        memo: {
            type: TEXT,
            comment: "备注"
        }
    }, {
        // 用于删除里增加删除时间标识
        paranoid: true,
    })
    /**
     * 关联关系
     */
    User.associate = function () {
        // 性别
        User.belongsTo(app.model.Dict, {
            foreignKey: "sex_id",
            targetKey: "key",
            as: "sex",
            constraints: false,
            scope: {
                type: "sex"
            }
        });
    }
    User.add = async function (ctx) {
        let body = ctx.request.body;
        if (!body.phone) {
            ctx.e("请写手机号！")
            return;
        }
        // 判断是否重复
        let d = await app.model.User.findOne({
            where: {
                phone: body.phone
            }
        })
        if (d) {
            ctx.e("手机号重复！");
            return;
        }
        try {
            let d = await app.model.User.create(body);
            ctx.s(d);
        } catch (e) {
            ctx.e('创建失败！', e);
        }
    }
    User.listCondition = async function (ctx) {
        let query = ctx.query;
        let condition = {
            order: app.Sequelize.literal('convert(user.name using gbk)  asc'),
            where: {
                name: {
                    $ne: 'admin'
                }
            },
            attributes: {
                exclude: ['password','created_at','updated_at']
            },
            include: [{
                    attributes:['label'],
                    model: app.model.Dict,
                    as: "adminname",
                    required: false
                },
                {
                    attributes:['label'],
                    model: app.model.Dict,
                    as: "statename",
                    required: false
                },
                {
                    model: app.model.Dict,
                    as: "sale_type",
                    required: false
                },
                {
                    attributes:['label'],
                    model: app.model.Dict,
                    as: "sale_area",
                    required: false
                },
                {
                    attributes:['name'],
                    model: app.model.Company,
                    as: "company",
                    required: false
                },
                {
                    attributes:['name'],
                    model: app.model.Dept,
                    as: "dept",
                    required: false
                }
            ]
        }
        if (query.project_id) {
            condition.where.$or = [
                app.Sequelize.where(app.Sequelize.fn("FIND_IN_SET", app.Sequelize.col("user.id"), app.Sequelize.literal(`(SELECT members from projects where id = ${query.project_id})`)), ">", 0),
                app.Sequelize.where(app.Sequelize.fn("FIND_IN_SET", app.Sequelize.col("user.id"), app.Sequelize.literal(`(SELECT charger from projects where id = ${query.project_id})`)), ">", 0),
                app.Sequelize.where(app.Sequelize.fn("FIND_IN_SET", app.Sequelize.col("user.id"), app.Sequelize.literal(`(SELECT creater_id from projects where id = ${query.project_id})`)), ">", 0)
            ];
        }
        if (query.state != 'all') {
            condition.where.state = query.state || 1
        }
        condition.where.$and = condition.where.$and || [];
        condition.where.$and.push(app.Sequelize.where(app.Sequelize.fn("FIND_IN_SET", app.Sequelize.col("user.type_id"), query.type_id || 0), ">", 0))
        return condition;
    }
    return User;
}