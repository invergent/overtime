const bsms = (sequelize, DataTypes) => {
  const BSMs = sequelize.define('BSMs', {
    bsmId: {
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

  BSMs.associate = (models) => {
    BSMs.hasMany(models.Staff, { foreignKey: 'id' });
  };
  return BSMs;
};

export default bsms;
