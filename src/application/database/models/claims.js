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
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    approvedByBSM: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, { freezeTableName: true });

  Claims.associate = (models) => {
    Claims.belongsTo(models.Staff, { foreignKey: 'id' });
  };

  return Claims;
};

export default claims;
