const branch = (sequelize, DataTypes) => {
  const Branch = sequelize.define('Branch', {
    solId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, { freezeTableName: true });

  Branch.associate = (models) => {
    Branch.hasMany(models.Staff, { foreignKey: 'branchId' });
  };
  return Branch;
};

export default branch;
