const roles = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Roles.associate = (models) => {
    Roles.hasMany(models.Staff, { foreignKey: 'id' });
  };
  return Roles;
};

export default roles;
