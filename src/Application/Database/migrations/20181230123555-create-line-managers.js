module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('LineManagers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    lineManagerId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    lineManagerRole: {
      type: Sequelize.ENUM('Supervisor', 'BSM'),
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    designation: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('LineManagers')
};
