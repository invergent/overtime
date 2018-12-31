const supervisor = (sequelize, DataTypes) => {
  const Supervisor = sequelize.define('Supervisor', {
    supervisorId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middleName: {
      type: DataTypes.STRING
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
  }, { freezeTableName: true });

  Supervisor.associate = (models) => {
    Supervisor.hasMany(models.Staff, { foreignKey: 'id' });
  };
  return Supervisor;
};

export default supervisor;
