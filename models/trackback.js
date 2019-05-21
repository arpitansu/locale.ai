/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trackback', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date_added: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    msg: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'trackback'
  });
};
