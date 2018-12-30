module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Branch', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    solId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    branchName: {
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
  down: queryInterface => queryInterface.dropTable('Branch')
};
