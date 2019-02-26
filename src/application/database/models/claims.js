const claims = (sequelize, DataTypes) => {
  const Claims = sequelize.define('Claims', {
    monthOfClaim: {
      type: DataTypes.STRING
    },
    weekday: {
      type: DataTypes.INTEGER
    },
    weekend: {
      type: DataTypes.INTEGER
    },
    shift: {
      type: DataTypes.INTEGER
    },
    requester: {
      type: DataTypes.STRING,
      allowNull: false
    },
    approvedBySupervisor: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Declined'),
      defaultValue: 'Pending'
    },
    approvedByBSM: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Declined'),
      defaultValue: 'Pending'
    }
  }, { freezeTableName: true });

  Claims.associate = (models) => {
    Claims.belongsTo(models.Staff, { foreignKey: 'requester' });
  };

  return Claims;
};

export default claims;
