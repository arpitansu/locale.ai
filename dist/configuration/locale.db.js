"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require('sequelize');
var fs = require("fs");
var path = require("path");
var prod = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'locale_ai',
    waitForConnection: true
};
var mysql = prod;
var sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
    host: mysql.host,
    port: 3306,
    dialect: 'mysql',
    // logging : true,
    define: {
        underscored: true,
        freezeTsableName: true,
        timestamps: false // I don't want timestamp fields by default
    },
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        // typeCast: true
        typeCast: function (field, next) {
            if (field.type === 'DATETIME') {
                return field.string();
            }
            return next();
        },
    },
    //India
    timezone: '+05:30'
});
exports.db = {}; //db will contain all the relations and will be used in controllers
exports.db['Sequelize'] = Sequelize;
exports.db['sequelize'] = sequelize;
exports.db['Op'] = Sequelize.Op;
/**
 * Example
 * db.a = require(modelPath+'/a.js')(sequelize,Sequelize)
 * db.b = require(modelPath+'/b.js')(sequelize,Sequelize)
 *
 * Defining Relation
 * db.a.hasMany(db.b, {as : 'b'})
 * db.b.belongsTo(db.a)
 */
var modelPath = "../../models";
function requireModel(Model) {
    return require(modelPath + "/" + Model)(sequelize, Sequelize);
}
/**
 * Import The models here
 * Ex : db.modelName = requireModel('model/file/path')
 */
/**
 * below code will automatically import models from the models folder
 */
var model = path.resolve(__dirname, modelPath);
fs.readdirSync(model).forEach(function (file) {
    file = file.slice(0, -3); // this will remove .js extension
    exports.db[file] = requireModel(file);
});
// module.exports = db
