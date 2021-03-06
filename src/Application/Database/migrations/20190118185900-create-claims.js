module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Claims', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    tenantRef: {
      type: Sequelize.STRING,
      allowNull: false
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
    atm: {
      type: Sequelize.INTEGER
    },
    shift: {
      type: Sequelize.INTEGER
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false
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
    status: {
      type: Sequelize.ENUM(
        'Awaiting supervisor', 'Awaiting BSM', 'Declined', 'Cancelled', 'Processing', 'Completed'
      ),
      allowNull: false
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
