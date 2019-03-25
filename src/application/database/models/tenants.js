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
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Tenants.associate = (models) => {
    Tenants.hasMany(models.Staff, { as: 'companyStaff', foreignKey: 'tenantRef' });
    Tenants.hasMany(models.Claims, { as: 'companyClaims', foreignKey: 'tenantRef' });
  };
  return Tenants;
};

export default tenants;
