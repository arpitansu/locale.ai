/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('xrides', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    vehicle_model_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    package_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    travel_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    from_area_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    to_area_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    from_city_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    to_city_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    from_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    to_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    online_booking: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    mobile_site_booking: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    booking_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    from_lat: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    from_long: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    to_lat: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    to_long: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    car_cancellation: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    tableName: 'xrides'
  });
};
