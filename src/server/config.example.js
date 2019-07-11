module.exports = {
    debug: process.env.NODE_ENV !== "production",
    website: {
        port: 8080,
        name: "SERN Boilerplate",
        url: "http://localhost:8080"
    },
    db: {
        hostname: "localhost",
        dialect: "mysql",
        username: "root",
        password: null,
        database: "sern-boilerplate",
        logging: false
    },
};