const supervisors = (sequelize, DataTypes) => {
  const Supervisors = sequelize.define('Supervisors', {
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
  });

  Supervisors.associate = (models) => {
    Supervisors.hasMany(models.Staff, { foreignKey: 'id' });
  };
  return Supervisors;
};

export default supervisors;
