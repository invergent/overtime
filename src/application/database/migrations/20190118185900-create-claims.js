module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Claims', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    monthOfClaim: {
      type: Sequelize.STRING
    },
    weekday: {
      type: Sequelize.INTEGER
    },
    weekend: {
      type: Sequelize.INTEGER
    },
    shift: {
      type: Sequelize.INTEGER
    },
    requester: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Staff',
        key: 'id',
        as: 'requester'
      }
    },
    approvedBySupervisor: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    approvedByBSM: {
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
  down: queryInterface => queryInterface.dropTable('Claims')
};
