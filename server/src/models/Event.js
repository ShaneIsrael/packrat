module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    category: DataTypes.STRING,
    group: DataTypes.STRING,
    dataFields: DataTypes.JSON,
  })
  return Event
}
