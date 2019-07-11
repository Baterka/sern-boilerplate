const fs = require("fs-extra");
const path = require("path");
const Sequelize = require("sequelize");

const config = global.config.db;
const db = {};

// New instance of database controller
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.hostname,
        dialect: config.dialect,
        logging: config.logging,
        define: {
            underscored: true
        }
    });

// Import models from same directory
fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf(".") !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === ".js");
    })
    .forEach(file => {
        const model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

// Create all defined associations
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Include instances to database object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Include operators to database object
db.Op = Sequelize.Op;

module.exports = db;