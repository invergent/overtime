const settings = (sequelize, DataTypes) => {
  const Settings = sequelize.define('Settings', {
    tenantRef: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailSchedule: {
      type: DataTypes.STRING
    },
    overtimeWindowStart: {
      type: DataTypes.STRING
    },
    overtimeWindowEnd: {
      type: DataTypes.STRING
    },
    overtimeWindow: {
      type: DataTypes.STRING
    },
    overtimeWindowIsActive: {
      type: DataTypes.BOOLEAN
    }
  }, { freezeTableName: true });

  Settings.associate = (models) => {
    Settings.belongsTo(models.Tenants, { as: 'tenant', foreignKey: 'tenantRef', targetKey: 'ref' });
  };
  return Settings;
};

export default settings;
