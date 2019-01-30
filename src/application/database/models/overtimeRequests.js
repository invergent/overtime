const overtimeRequests = (sequelize, DataTypes) => {
  const OvertimeRequests = sequelize.define('OvertimeRequests', {
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

  OvertimeRequests.associate = (models) => {
    OvertimeRequests.belongsTo(models.Staff, { foreignKey: 'id' });
  };

  return OvertimeRequests;
};

export default overtimeRequests;
