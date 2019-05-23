const claimsStatistics = (sequelize, DataTypes) => {
  const ClaimsStatistics = sequelize.define('ClaimsStatistics', {
    tenantRef: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Jan: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    Feb: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    Mar: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    Apr: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    May: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    Jun: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    Jul: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    Aug: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    Sep: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    Oct: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    Nov: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    Dec: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  });

  ClaimsStatistics.associate = (models) => {
    ClaimsStatistics.belongsTo(models.Tenants, { as: 'companyStats', foreignKey: 'tenantRef', targetKey: 'ref' });
  };
  return ClaimsStatistics;
};

export default claimsStatistics;
