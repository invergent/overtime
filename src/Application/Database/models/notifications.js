const notifications = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    activity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    claimId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    viewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, { freezeTableName: true });

  Notifications.associate = (models) => {
    Notifications.belongsTo(models.Staff, { foreignKey: 'userId' });
  };

  return Notifications;
};

export default notifications;
