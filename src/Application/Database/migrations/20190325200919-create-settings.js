module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Settings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    tenantRef: {
      type: Sequelize.STRING,
      references: {
        model: 'Tenants',
        key: 'ref',
        as: 'tenant'
      }
    },
    emailSchedule: {
      type: Sequelize.STRING
    },
    overtimeWindowStart: {
      type: Sequelize.STRING
    },
    overtimeWindowEnd: {
      type: Sequelize.STRING
    },
    overtimeWindow: {
      type: Sequelize.STRING
    },
    overtimeWindowIsActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
  down: queryInterface => queryInterface.dropTable('Settings')
};
