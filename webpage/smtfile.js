module.exports = {
    server: {
        // 服务端口
        port: 80,
        // 代理
        // proxy: {
        //     '/data': {
        //         target: 'http://localhost:8004',
        //         changeOrigin: true, 
        //         //ws: true // proxy websockets 
        //     },
        // },
    },
    // 编译后的成果目录
    dist: "../publish",
    config: {
        md: {
            style: ""
        }
    },
    // 编译配置，如果dist配置为一个文件，则会合并打包，如果是目录则各自编译拷贝到相应目录下
    build: {
        js: [{
            src: "code/common/**/*.js",
            dist: "common/common.js"
        }, {
            src: "code/view/**/*.js",
            dist: "view",
        }, {
            src: "code/index.js",
            dist: ""
        }, {
            src: ["code/components/**/*.js"],
            dist: "common/components.js"
        }],
        html: [{
            src: "code/**/*.html",
            dist: ""
        }],
        css: [{
            src: "code/common/**/*.css",
            dist: "common/common.css"
        }, {
            src: ["code/index.css", "code/view/**/*.css"],
            dist: "common/web.css"
        }],
        // 直接拷贝
        others: [{
            src: ["code/libs/**/*.*"],
            dist: "libs"
        }, {
            src: "code/favicon.ico",
            dist: ""
        },
        {
            src: ["code/**/*.png", "code/**/*.gif", "code/**/*.ico", "code/**/*.jpg", "code/**/*.svg"],
            dist: "common"
        },
        {
            src: ["code/**/*.ttf", "code/**/*.otf", "code/**/*.eot", "code/**/*.woff", "code/**/*.woff2"],
            dist: ""
        },
        {
            src: "code/**/*.json",
            dist: ""
        }
        ]
    },
    // 编译后事件，可以配置自动拷贝的命令
    scripts: {
        "after-build-all": []
    },
    replace: [{
        src: "${ext-myapp-version}",
        value: "V1.0.0",
    }]
}