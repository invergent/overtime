module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Tenants', {
    ref: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    businessName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('Tenants')
};
