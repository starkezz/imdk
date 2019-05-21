module.exports = app => {
    app.beforeStart(async function () {
        await app.model.sync({ alter: false });
        // await app.model.sync({ alter: true});
        if (1) { return; }
        for (var a in app.model.models) {
            var table = app.model.models[a];
            var cols = (await app.model.query(`select COLUMN_NAME as cols from information_schema.COLUMNS where table_name = '${table.tableName}' `))[0];
            var miss = []; var arr = []; cols.map(function (it) { arr.push(it.cols.toLowerCase()) });
            for (var f in table.attributes) {
                var field = table.attributes[f];
                if (arr.indexOf(field.fieldName.toLowerCase()) == -1) {
                    miss.push(field);
                }
            }
            if (miss.length > 0) {
                table.sync({ alter: true })
                console.log(JSON.stringify(miss), "=====")
            }
        }
    });
    // app.sessionStore = {
    //     async get(key) {
    //         const res = await app.model.Ini.findOne({ where: { key: key } });
    //         if (!res) return null;
    //         return JSON.parse(res.value);
    //     },

    //     async set(key, value, maxAge) {
    //         // maxAge not present means session cookies
    //         // we can't exactly know the maxAge and just set an appropriate value like one day
    //         if (!maxAge) { maxAge = 3 * 60 * 60 * 1000 };
    //         value = JSON.stringify(value);
    //         return await app.model.Ini.createOrUpdate({ key: key, value: value, maxage: maxAge });
    //     },

    //     async destroy(key) {
    //         return await app.model.Ini.destroy({ where: { key: key } });
    //     },
    // };
};