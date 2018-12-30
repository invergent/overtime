const branch = (sequelize, DataTypes) => {
  const Branch = sequelize.define('Branch', {
    solId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Branch.associate = (models) => {
    Branch.hasMany(models.Staff, { foreignKey: 'id' });
  };
  return Branch;
};

export default branch;
