var Sequelize = require('sequelize')
var fs        = require("fs")
var path      = require("path")

// var dev  = {
// 	connectionLimit : 10,
// 	host            : 'localhost',
// 	user            : 'root',
// 	password        : '',
// 	database        : 'locale_ai',
// 	waitForConnection: true
// }


var prod  = {
	connectionLimit : 10,
	host            : 'arpit-db-instance.cjowjb4iaroa.us-east-1.rds.amazonaws.com',
	user            : 'arpitansu',
	password        : 'arpit1995',
	database        : 'locale_ai',
	waitForConnection: true
}

var mysql = prod

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password,{
	host: mysql.host,
	port:3306,
	dialect:'mysql',
	// logging : true,
	pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
	
	define: {
		underscored: true,
		freezeTsableName: true, //use singular table name
    	timestamps: false  // I don't want timestamp fields by default
	  },
	dialectOptions: {
		useUTC: false, //for reading from database
		dateStrings: true,
		// typeCast: true

		typeCast: function (field, next) { // for reading from database
			if (field.type === 'DATETIME') {
			return field.string()
			}
			return next()
		},
	},
	//India
	timezone: '+05:30'
})



export const db = {}//db will contain all the relations and will be used in controllers

db['Sequelize'] = Sequelize
db['sequelize'] = sequelize
db['Op'] = Sequelize.Op
/**
 * Example
 * db.a = require(modelPath+'/a.js')(sequelize,Sequelize)
 * db.b = require(modelPath+'/b.js')(sequelize,Sequelize)
 *
 * Defining Relation
 * db.a.hasMany(db.b, {as : 'b'})
 * db.b.belongsTo(db.a)
 */

let modelPath = "../../models"

function requireModel(Model){
    return require(modelPath+"/"+Model)(sequelize,Sequelize)
}

/**
 * Import The models here
 * Ex : db.modelName = requireModel('model/file/path')
 */

/**
 * below code will automatically import models from the models folder
 */
const model = path.resolve(__dirname, modelPath);

fs.readdirSync(model).forEach(file => {
	file = file.slice(0, -3) // this will remove .js extension
  	db[file] = requireModel(file)
})


// module.exports = db
