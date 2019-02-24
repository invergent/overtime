const lineManagers = (sequelize, DataTypes) => {
  const LineManagers = sequelize.define('LineManagers', {
    lineManagerId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    lineManagerRole: {
      type: DataTypes.ENUM('Supervisor', 'BSM'),
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  LineManagers.associate = (models) => {
    LineManagers.hasMany(models.Staff, { as: 'supervisorStaff', foreignKey: 'supervisorId' });
    LineManagers.hasMany(models.Staff, { as: 'bsmStaff', foreignKey: 'bsmId' });
  };
  return LineManagers;
};

export default lineManagers;
