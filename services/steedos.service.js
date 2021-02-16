const SteedosService = require("@steedos/service-steedos-server");
const path = require('path');

module.exports = {
    name: "steedos-server",
    mixins: [SteedosService],
    settings: {
        // Change port setting
		port: process.env.PORT,
        rootUrl: process.env.ROOT_URL,
		mongoUrl: process.env.MONGO_URL,
        mongoServer: {
			enabled: !process.env.MONGO_URL,
            port: process.env.MONGO_PORT || 27018,
            dbPath: process.env.MONGO_DBPATH || path.join(process.cwd(), 'db'),
        },
        nodeRedServer: {
			enabled: true,
            userDir: path.join(process.cwd(), "node-red-app"),
        },
        apiServer: {
			enabled: true,
            routes: [
                {
                    path: "/services/",
                    whitelist: [
                        "greeter.*",
                    ],
                    aliases: {
                        "GET /hi": "greeter.hello"
                    },
                    autoAliases: true
                }
            ]
        }
    }
}