module.exports = {
    debug: process.env.NODE_ENV !== "production",
    website: {
        port: 3000,
        name: "Turnajovka",
        url: "http://localhost:3000"
    },
    db: {
        hostname: "localhost",
        dialect: "mysql",
        username: "root",
        password: null,
        database: "",
        logging: false
    },
};