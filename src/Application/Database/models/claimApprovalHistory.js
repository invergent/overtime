const claimHistory = (sequelize, DataTypes) => {
  const ClaimApprovalHistory = sequelize.define('ClaimApprovalHistory', {
    approvalType: {
      type: DataTypes.STRING
    },
    claimId: {
      type: DataTypes.STRING
    },
    lineManagerId: {
      type: DataTypes.INTEGER
    }
  }, { freezeTableName: true });

  ClaimApprovalHistory.associate = (models) => {
    ClaimApprovalHistory.belongsTo(models.Claims, { as: 'claim', foreignKey: 'claimId' });
    ClaimApprovalHistory.belongsTo(models.LineManagers, {
      as: 'lineManager', foreignKey: 'lineManagerId'
    });
  };

  return ClaimApprovalHistory;
};

export default claimHistory;
