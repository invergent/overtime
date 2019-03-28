const settings = (sequelize, DataTypes) => {
  const Settings = sequelize.define('Settings', {
    tenantRef: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailSchedule: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { freezeTableName: true });

  Settings.associate = (models) => {
    Settings.belongsTo(models.Tenants, { as: 'tenant', foreignKey: 'tenantRef' });
  };
  return Settings;
};

export default settings;
