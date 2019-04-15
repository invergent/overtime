const tenants = (sequelize, DataTypes) => {
  const Tenants = sequelize.define('Tenants', {
    ref: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Tenants.associate = (models) => {
    Tenants.hasMany(models.Staff, { as: 'companyStaff', foreignKey: 'tenantRef', sourceKey: 'ref' });
    Tenants.hasMany(models.Claims, { as: 'companyClaims', foreignKey: 'tenantRef' });
    Tenants.hasMany(models.Settings, { as: 'settings', foreignKey: 'tenantRef', sourceKey: 'ref' });
  };
  return Tenants;
};

export default tenants;
