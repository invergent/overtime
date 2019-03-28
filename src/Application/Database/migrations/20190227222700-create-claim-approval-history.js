module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ClaimApprovalHistory', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    claimId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Claims',
        key: 'id',
        as: 'claim'
      }
    },
    lineManagerId: {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'LineManagers',
        key: 'id',
        as: 'lineManager'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, { freezeTableName: true }),
  down: queryInterface => queryInterface.dropTable('ClaimApprovalHistory')
};
