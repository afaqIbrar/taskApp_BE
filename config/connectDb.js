const dbConfig = require('./dbConfig');
const { Sequelize, DataTypes } = require("sequelize");

let sequelize;
sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: 'mysql'
    }
);
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(error => {
        console.error("Unable to connect to the database: ", error);
    });
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//User Model
db.User = require('../models/userModel')(sequelize, Sequelize);
db.Task = require('../models/taskModel')(sequelize, Sequelize);
// Apply associations
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize.sync({ force: false });


module.exports = db;
