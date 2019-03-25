const claims = (sequelize, DataTypes) => {
  const Claims = sequelize.define('Claims', {
    tenantRef: {
      type: DataTypes.STRING,
      references: {
        model: 'Tenants',
        key: 'ref',
        as: 'claimsCompany'
      }
    },
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
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    requester: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(
        'Awaiting supervisor', 'Awaiting BSM', 'Declined', 'Cancelled', 'Processing', 'Completed'
      ),
      allowNull: false
    }
  }, { freezeTableName: true });

  Claims.associate = (models) => {
    Claims.belongsTo(models.Tenants, { as: 'claimsCompany', foreignKey: 'tenantRef' });
    Claims.belongsTo(models.Staff, { foreignKey: 'requester' });
    Claims.hasMany(models.ClaimApprovalHistory, { as: 'approvalHistory', foreignKey: 'claimId' });
  };

  return Claims;
};

export default claims;
